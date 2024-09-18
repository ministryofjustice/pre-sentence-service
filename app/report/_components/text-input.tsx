"use client"

import { Heading, Table, Button, Input } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'

type TextInputProps = {
    heading: string
} & BaseComponentProps

function TextInput(props: TextInputProps) {
    const { updateQuestion, questions } = useReportStore((state) => state)

    return <>
        <Heading size="MEDIUM">{props.heading}</Heading>
        <Input
            type="text"
            defaultValue={questions[props.questionId]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateQuestion(props.questionId, props.page, e.target.value)}
        />
    </>
}

export { TextInput }