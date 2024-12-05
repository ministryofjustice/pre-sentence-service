"use client";

import React from "react";
import { Paragraph as GovukParagraph } from "govuk-react";
import { ItemList, ItemListProps } from "./list-item";

export type ParagraphProps = {
  text?: string;
  itemList?: ItemListProps;
}

function ParagraphText({text, itemList} : ParagraphProps) {
  return (
    <>
      {text && <GovukParagraph>{text}</GovukParagraph>}
      {itemList && <ItemList {...itemList} />}
    </>
  );
}

export { ParagraphText };
