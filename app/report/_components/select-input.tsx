"use client"

import { Caption, Heading, Input, Select, TextArea } from 'govuk-react'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'
import { questionHasErrors } from '../../_lib/store-utils'

type SelectInputProps = {
    heading?: string
    headingSize?: string
    label?: string
    items: {
        key: string
        value: string
    }[]
} & BaseComponentProps

function SelectInput(props: SelectInputProps) {
    const { updateQuestion, questions, addError, removeError, errors } = useReportStore((state) => state)

    const headingSize = props.headingSize ?? 'MEDIUM';



    const validateAndUpdate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQuestion(props.questionId, props.page, e.target.value)
    }

    return <div className='!mb-8'>
        {props.heading ? <Heading size={headingSize}>{props.heading}</Heading> : null}

        <Select
            input={{
                name: props.questionId,
                onChange: validateAndUpdate
            }}
            label={props.label ?? ''}
        >
            {props.items?.map(item =>
            (
                <option value={item.value}>
                    {item.key}
                </option>
            ))}
        </Select>
    </div>
}

export { SelectInput }