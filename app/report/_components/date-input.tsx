"use client"

import { Heading, Table, Button, Input, DateField } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'

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
    const { updateQuestion, questions } = useReportStore((state) => state)

    const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateQuestion(`${props.questionId}-${e.target.name}`, props.page, e.target.value)
    }

    const defaultValues = (): { day: string, month: string, year: string } => {
        const day = questions[`${props.questionId}-${DateFieldProp.DateFieldDay}`]
        const month = questions[`${props.questionId}-${DateFieldProp.DateFieldMonth}`]
        const year = questions[`${props.questionId}-${DateFieldProp.DateFieldYear}`]

        return { day, month, year }
    }

    return <>

        <DateField defaultValues={defaultValues()} hintText={props.hintText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateData(e)}>
            <Heading size="MEDIUM">{props.heading}</Heading>
        </DateField>
    </>
}

export { DateInput }