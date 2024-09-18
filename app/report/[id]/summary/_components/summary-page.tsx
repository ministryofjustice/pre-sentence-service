'use client'

import React from 'react'
import { SummaryList } from '../../../_components/summary-list'
import { Button, ErrorSummary, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'

enum DateFieldProp {
    DateFieldDay = 'DateFieldDay',
    DateFieldMonth = 'DateFieldMonth',
    DateFieldYear = 'DateFieldYear'
}

export const SummaryPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState, questions, pageSaveState } = useReportStore((state) => state)

    console.log("🚀 ~ SummaryList ~ questions:", pageSaveState)
    const unsavedPages = []

    for (var key in pageSaveState) {
        if (pageSaveState.hasOwnProperty(key)) {
            if (pageSaveState[key] !== 'saved')
                unsavedPages.push(key)
        }
    }

    console.log("🚀 ~ SummaryPage ~ unsavedPages:", unsavedPages)

    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }

    const getTextQuestion = (questionId: string) => {
        return questions[questionId];
    }

    const getDateQuestion = (questionId: string) => {
        const day = questions[`${questionId}-${DateFieldProp.DateFieldDay}`]
        const month = questions[`${questionId}-${DateFieldProp.DateFieldMonth}`]
        const year = questions[`${questionId}-${DateFieldProp.DateFieldYear}`]

        return `${day} ${month} ${year}`
    }

    return (



        <div className="govuk-grid-column-two-thirds">
            <Heading size="LARGE">Check your answers</Heading>

            {unsavedPages.length > 0 ?
                <ErrorSummary
                    description="You have unsaved data, check the navigation bar for unsaved pages"

                    heading="Unsaved data"
                /> : null}

            <SummaryList questions={[
                {
                    displayName: 'Full name',
                    data: getTextQuestion('defendant-full-name')
                },
                {
                    displayName: 'Date of birth',
                    data: getDateQuestion('defendant-date-of-birth')
                },
                {
                    displayName: 'Sample text field',
                    data: getTextQuestion('summary-of-offences-sample-text-field')
                }
            ]} questionId='summary' page={pathname} />
            <br />

            <Link onClick={savePage} href={`/report/${props.id}/summary`}>
                <Button disabled={unsavedPages.length > 0}>Generate Report</Button>
            </Link>
        </div>
    )
}
