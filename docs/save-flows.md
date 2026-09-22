# Save Flows

## Save Flow Operations

This guide covers how to verify and troubleshoot report saving in a running environment.

### Expected behaviour

- Edited fields are autosaved after approximately 15 seconds of inactivity.
- Fields over their character limit are not autosaved until corrected.
- Save and Continue validates the form before moving to the next page.
- Invalid forms retain their partial values and display validation errors.
- Signing out persists pending changes before navigating to the sign-out page.
- Side-navigation links submit pending changes before navigating to another report page.

---

```mermaid
flowchart TB
  %% Entry Trigger
  U[User types in field or CKEditor] --> C[CKEditor change:data syncs HTML to textarea and dispatches input]
  C --> P{Which save path?}

  %% Path 1: Idle Autosave
  subgraph Path1["Path 1: Idle Autosave"]
    direction TB
    A1[Autosave debounce starts or resets 15s] --> A2{Any over-limit fields?}
    A2 -->|Yes| A3[Skip autosave]
    A2 -->|No| A4[POST /psr/:reportId/autosave]
    A4 --> A5[AutosaveController.post]
    A5 --> A6[reportService.persistPartialFieldValues]
    A6 --> A7[200 JSON success]
    A7 --> A8[Client marks changes saved]
  end

  %% Path 2: Save and Continue
  subgraph Path2["Path 2: Save and Continue"]
    direction TB
    S1[Browser submits form] --> S2[SharedController.post]
    S2 --> S3{validateForm}
    S3 -->|Valid| S4[updateReportActions]
    S4 --> S5[updateFields and report update]
    S5 --> S6[Redirect to next page]
    S3 -->|Invalid| S7[persistOnInvalid]
    S7 --> S8[persistPartialFieldValues]
    S8 --> S9[Re-render page with validation errors]
  end

  %% Path 3: Sign Out
  subgraph Path3["Path 3: Sign Out Auto-Persist"]
    direction TB
    L1{Unsaved changes and autosave form present?} -->|No| L2[Navigate to /sign-out]
    L1 -->|Yes| L3[Intercept navigation - prevent default]
    L3 --> L4[persistForm]
    L4 --> L5[POST /psr/:reportId/autosave]
    L5 --> L6[AutosaveController.post]
    L6 --> L7[Log success or error]
    L7 --> L8[Finally navigate to /sign-out]
  end

  %% Path 4: Side Nav Navigation
  subgraph Path4["Path 4: Side Navigation Click"]
    direction TB
    N1{href exists + form with data-autosave=true present + not sign-your-report page?} -->|No| N2[Normal link navigation]
    N1 -->|Yes| N3[Intercept navigation - prevent default]
    N3 --> N4[Set form action with redirectPath from clicked side-nav link]
    N4 --> N5[Submit form]
    N5 --> N6[SharedController.post]
    N6 --> N7{Validate form - isValid OR redirectPath?}
    N7 -->|Yes| N8[updateReportActions then redirectPath page]
    N7 -->|No - Edge case| N9[persistOnInvalid then re-render with errors]
  end

  %% Main Path Connections
  P -->|Idle after edit| A1
  P -->|Click Save and Continue| S1
  P -->|Click Sign out| L1
  P -->|Click side nav link| N1

  %% Styling / Themes
  classDef decision fill:#e7f5ff,stroke:#1864ab,stroke-width:2px,color:#0b7285;
  classDef action fill:#ffffff,stroke:#343a40,stroke-width:1px,color:#212529;
  classDef container fill:#f8f9fa,stroke:#adb5bd,stroke-width:1px,color:#343a40;

  class P,A2,S3,L1,N1,N7 decision;
  class U,C,A1,A3,A4,A5,A6,A7,A8,S1,S2,S4,S5,S6,S7,S8,S9,L2,L3,L4,L5,L6,L7,L8,N2,N3,N4,N5,N6,N8,N9 action;
  class Path1,Path2,Path3,Path4 container;
```
