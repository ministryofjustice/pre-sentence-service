"use client";

import { ListItem } from 'govuk-react'

import React from "react";

export type ItemListProps = {
    items?: string[];
    heading?: string;
};

function ItemList({items = [], heading}: ItemListProps) {
    return (
      <div className="list-container">
          {heading && <h2>{heading}</h2>}
          <ul>
              {items.map((item, index) => (
                <ListItem key={index}>{item}</ListItem>
              ))}
          </ul>
      </div>
    );
}

export { ItemList }
