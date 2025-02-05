import React, { PropsWithChildren } from "react";

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
                <div className="govuk-grid-row">
                        {children}
                 
                </div>
            </main>
        </div>
    )
}