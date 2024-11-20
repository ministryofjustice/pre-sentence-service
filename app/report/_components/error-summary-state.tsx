"use client"

import { Heading, Table, Button, Input, DateField, ErrorSummary } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { BaseComponentProps } from '../../_lib/base-components-props'
import { useReportStore } from '../../_providers/report-store-provider'
import { pageHasErrors } from '../../_lib/store-utils'

type ErrorSummaryStateProps = {
    page: string
}


function ErrorSummaryState(props: ErrorSummaryStateProps) {
    const { errors } = useReportStore((state) => state)

    const pageErrors = errors.filter(error => error.pageId === props.page).map(error => ({ text: error.errorText, targetName: error.questionId }));

    return <>

        {pageHasErrors(props.page) && pageErrors.length > 0 ?
            <ErrorSummary
                errors={pageErrors}
                heading="There are errors on this page"
            /> : null}
    </>
}

export { ErrorSummaryState }