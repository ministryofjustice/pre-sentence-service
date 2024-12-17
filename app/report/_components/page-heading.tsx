"use client";

import { Caption, Heading } from "govuk-react";
import React from "react";
import { useReportStore } from '../../_providers/report-store-provider'

export type PageHeadingProps = {
    title: string;
    nameDataQuestionId: string;
    crnDataQuestionId: string;
};

function PageHeading({ title, nameDataQuestionId, crnDataQuestionId }: PageHeadingProps) {

    const { questions } = useReportStore((state) => state)

  return (
    <>
        <Caption>{questions[nameDataQuestionId]} CRN: {questions[crnDataQuestionId]}</Caption>
        <Heading size="LARGE">{title}</Heading>
    </>
  );
};

export { PageHeading };