"use client"

import { Heading, Input } from 'govuk-react'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'
import { questionHasErrors } from '../../_lib/store-utils'

type TextInputProps = {
    heading?: string
    headingSize?: string
    subheading?: string;
} & BaseComponentProps

function TextInput(props: TextInputProps) {
    const { updateQuestion, questions, addError, removeError, errors } = useReportStore((state) => state)

    const headingSize = props.headingSize ?? 'MEDIUM';



    const validateAndUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        removeError(props.page, props.questionId);
        updateQuestion(props.questionId, props.page, e.target.value)

        let validators = props.validators;

        if (props.required) {
            if (!validators) {
                validators = [];
            }

            validators.push((e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.value) {
                    return 'Missing required field';
                }

                return null;
            })
        }

        if (validators) {
            for (const validator of validators) {
                const result = validator(e)
                if (result) {
                    addError(props.page, props.questionId, result);
                }
            }
        }
    }



    return <>
        {props.heading ? <Heading size={headingSize}>{props.heading}</Heading> : null}
        {props.subheading ? <p className='govuk-body !mb-0'>{props.subheading}</p> : null}
        <Input
            id={props.questionId}
            type="text"
            className="!mb-2"
            defaultValue={questions[props.questionId]}
            onChange={validateAndUpdate}
            error={questionHasErrors(props.page, props.questionId)}
        />
    </>
}

export { TextInput }