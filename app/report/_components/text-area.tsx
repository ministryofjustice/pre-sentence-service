"use client";

import { Caption, Heading, TextArea } from 'govuk-react';
import React from 'react';
import { BaseComponentProps } from '../../_lib/base-components-props';
import { useReportStore } from '../../_providers/report-store-provider';
import { questionHasErrors } from '../../_lib/store-utils';

type TextInputProps = {
    heading?: string;
    headingSize?: string;
    subheading?: string | string[];
} & BaseComponentProps;

function TextAreaInput(props: TextInputProps) {
    const { updateQuestion, questions } = useReportStore((state) => state);

    const headingSize = props.headingSize ?? 'MEDIUM';

    const validateAndUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateQuestion(props.questionId, props.page, e.target.value);
    };

    return (
      <div className="!mb-8">
          {props.heading && <Heading size={headingSize}>{props.heading}</Heading>}

          <TextArea
            className="!mb-2"
            error={questionHasErrors(props.page, props.questionId)}
            input={{
                rows: 15,
                onChange: validateAndUpdate,
                defaultValue: questions[props.questionId],
            }}
          >
              {Array.isArray(props.subheading) ? (
                <ul className="govuk-list govuk-list--bullet">
                    {props.subheading.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                </ul>
              ) : (
                <Caption className="mb-1" size="MEDIUM">
                    {props.subheading}
                </Caption>
              )}
          </TextArea>
      </div>
    );
}

export { TextAreaInput };
