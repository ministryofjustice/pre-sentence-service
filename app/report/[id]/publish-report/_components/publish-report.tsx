"use client";

import React from "react"
import { Caption, Heading, Panel } from 'govuk-react'
import Link from "next/link"
import { usePathname } from "next/navigation";
import { ParagraphText } from "../../../_components/paragraph"

export const PublishReport = (props: { id: string }) => {
  const pathname = usePathname();

  return (
    <div className="govuk-grid-column-full">

      <Panel title="Pre-sentence report published">
        Dylan Adam Armstrong
        <br />
        <strong>
          CRN:E234516
        </strong>
      </Panel>

      <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
      <Heading size="LARGE">Victim impact assessment</Heading>

      <ParagraphText text="The victim impact assessment is used to inform sentencing options such as exclusion zones. You will be able to review this later as you are writing your sentencing proposal." />

      <span className="govuk-details__summary-text govuk-!-margin-bottom-3 govuk-!-margin-top-2">
        <Link href="#">View CPS pack</Link>
      </span>

    </div>
  );
};
