"use client";

import { Details } from "govuk-react";
import React from "react";
import { ItemListProps } from "./list-item";
import { ParagraphText } from "./paragraph";

export type DetailsProps = {
    summary: string;
    text?: string;
    itemList?: ItemListProps;
};

function DetailsComponent({ summary, itemList, text }: DetailsProps) {
  return (
    <Details summary={summary} open>
      <ParagraphText text={text} itemList={itemList} />
    </Details>
  );
};

export { DetailsComponent };
