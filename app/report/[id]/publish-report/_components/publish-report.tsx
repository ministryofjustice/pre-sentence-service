"use client";

import React from "react"
import { Caption, Heading, ListItem, OrderedList, Panel } from 'govuk-react'
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
        CRN:E234516
      </Panel>

      <span className="govuk-details govuk-!-margin-bottom-3 govuk-!-margin-top-2">
        The report is now locked and cannot be edited.<br />
        It is published to NDelius.
      </span>

      <Heading size="MEDIUM">Next steps</Heading>

      <OrderedList>
        <ListItem>
          <Link href="#">
            Download the report
          </Link>
        </ListItem>

        <ListItem>
          Share the report with the court

          <ListItem>
            <Link href="#">
              Upload to common platform (opens in new tab)
            </Link>
          </ListItem>

          <ListItem>
            <Link href="#">
              Upload to court store (opens in new tab)
            </Link>
          </ListItem>

        </ListItem>

      </OrderedList>

      <span className="govuk-details__summary-text govuk-!-margin-bottom-3 govuk-!-margin-top-2">
        <Link href="#">What do you think of this service ?</Link>
      </span>
      (takes 30 seconds)
    </div>
  );
};
