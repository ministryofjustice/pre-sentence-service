"use client"

import { Heading, Table, Button, Input, DateField } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'
import { questionHasErrors } from '../../_lib/store-utils'

type DateInputProps = {
    heading: string
    hintText: string
} & BaseComponentProps

enum DateFieldProp {
    DateFieldDay = 'DateFieldDay',
    DateFieldMonth = 'DateFieldMonth',
    DateFieldYear = 'DateFieldYear'
}

function DateInput(props: DateInputProps) {
    const { updateQuestion, questions, removeError, addError } = useReportStore((state) => state)

    const isValidDate = (date: Date): boolean => {
        return date instanceof Date && !isNaN(date.valueOf())
    }

    const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        removeError(props.page, props.questionId);
        updateQuestion(`${props.questionId}-${e.target.name}`, props.page, e.target.value)

        const day = questions[`${props.questionId}-${DateFieldProp.DateFieldDay}`]
        const month = questions[`${props.questionId}-${DateFieldProp.DateFieldMonth}`]
        const year = questions[`${props.questionId}-${DateFieldProp.DateFieldYear}`]

        const convertedDate = new Date(`${month}-${day}-${year}`)

        if (!isValidDate(convertedDate)) {
            addError(props.page, props.questionId, 'You have entered an invalid date')
        }
    }

    const defaultValues = (): { day: string, month: string, year: string } => {
        const day = questions[`${props.questionId}-${DateFieldProp.DateFieldDay}`]
        const month = questions[`${props.questionId}-${DateFieldProp.DateFieldMonth}`]
        const year = questions[`${props.questionId}-${DateFieldProp.DateFieldYear}`]

        return { day, month, year }
    }

    return <>

        <DateField
            defaultValues={defaultValues()}
            hintText={props.hintText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData(e)}
            errorText={questionHasErrors(props.page, props.questionId) ? 'Enter a valid date' : null}
        >
            <Heading size="MEDIUM">{props.heading}</Heading>
        </DateField>
    </>
}

export { DateInput }