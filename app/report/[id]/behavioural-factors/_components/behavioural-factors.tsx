"use client";

import React from "react"
import { Button, Caption, Heading, ListItem, UnorderedList } from "govuk-react"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useReportStore } from "../../../../_providers/report-store-provider"
import { DetailsComponent } from "../../../_components/details"
import { ParagraphText } from "../../../_components/paragraph"
import { TextAreaInput } from "../../../_components/text-area"
import { PageHeading } from "../../../_components/page-heading";
import { getNextPageKey, getRoutePath } from "../../../_lib/util/routes";

export const BehaviouralFactors = (props: { id: string }) => {
  const pathname = usePathname();
  const { updatePageSaveState } = useReportStore((state) => state);

  const savePage = () => {
    updatePageSaveState(pathname, "saved");
  };

  const itemListProps = {
    items: [
      "circumstances not directly linked to the offences that may impact desistance",
      "barriers to engagement",
      "caring responsibilities for children, dependents and vulnerable adults",
    ],
  };

  return (
    <div className="govuk-grid-column-full">
      <PageHeading title='Behavioural factors and lifestyle considerations' crnDataQuestionId='defendant-crn'  nameDataQuestionId='defendant-full-name' />


      <ParagraphText text="Consider factors not already addressed in detail including:" />
      <UnorderedList>
        <ListItem>
          rehabilitative needs that require intervention
        </ListItem>
        <ListItem>
          the defendant’s capacity and motivation to address offending
        </ListItem>
        <ListItem>
          protective factors
        </ListItem>
      </UnorderedList>
      <ParagraphText text="Provide a considered analysis, do not just describe or list all factors linked to offending." />


      <DetailsComponent
        summary="Help with behavioural factors and lifestyle considerations"
        text="Focus your analysis on factors requiring intervention that are relevant to a sentencing decision, for example:"
        itemList={itemListProps}
      />

      <TextAreaInput
        page={pathname}
        questionId="behavioural-factors-text"
      />

      <Link onClick={savePage} href={getRoutePath(getNextPageKey('behaviouralFactors'), {id: props.id})}>
        <Button>Save and continue</Button>
      </Link>
    </div>
  );
};
