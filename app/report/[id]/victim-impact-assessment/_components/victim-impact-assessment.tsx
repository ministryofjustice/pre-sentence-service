"use client";

import React from "react"
import { Button, Caption, Heading } from "govuk-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useReportStore } from "../../../../_providers/report-store-provider"
import { DetailsComponent } from "../../../_components/details"
import { ParagraphText } from "../../../_components/paragraph"
import { TextAreaInput } from "../../../_components/text-area"
import { PageHeading } from "../../../_components/page-heading";
import { getRoutePath, getNextPageKey } from "../../../_lib/util/routes";

export const VictimImpactAssessment = (props: { id: string }) => {
  const pathname = usePathname();
  const { updatePageSaveState } = useReportStore((state) => state);

  const savePage = () => {
    updatePageSaveState(pathname, "saved");
  };

  const itemListProps = {
    items: [
      "attitudes",
      "responsibility",
      "circumstances",
      "motivations",
      "the defendant's interpretation of the offence",
    ],
  };

  return (
    <div className="govuk-grid-column-full">
      <PageHeading title='Victim impact assessment' crnDataQuestionId='defendant-crn'  nameDataQuestionId='defendant-full-name' />


      <ParagraphText text="The victim impact assessment is used to inform sentencing options such as exclusion zones. You will be able to review this later as you are writing your sentencing proposal." />

      <span className="govuk-details__summary-text govuk-!-margin-bottom-3 govuk-!-margin-top-2">
        <Link href="#">View CPS pack</Link>
      </span>

      <DetailsComponent
        summary="Help with victim impact assessment"
        itemList={itemListProps}
      />

      <TextAreaInput
        page={pathname}
        questionId="victim-impact-assessment-hint-p2"
      />

      <Link onClick={savePage} href={getRoutePath(getNextPageKey('victimImpactAssessment'), {id: props.id})}>
        <Button>Save and continue</Button>
      </Link>
    </div>
  );
};
