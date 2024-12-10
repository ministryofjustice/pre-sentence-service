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
    const { updatePageSaveState, questions, pageSaveState, errors } = useReportStore((state) => state)

    const unsavedPages:any[] = []

    for (var key in pageSaveState) {
        if (pageSaveState.hasOwnProperty(key)) {
            if (pageSaveState[key] !== 'saved')
                unsavedPages.push(key)
        }
    }

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

            {unsavedPages.length > 0 || errors.length > 0 ?
                <ErrorSummary
                    description="You have unsaved data or errors, check the navigation bar for affected pages"

                    heading="Unsaved data"
                /> : null}

            <Heading size="MEDIUM">Defendant details</Heading>
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
                    displayName: 'Address line 1',
                    data: getTextQuestion('defendant-current-address-line1')
                },
                {
                    displayName: 'Address line 2',
                    data: getTextQuestion('defendant-current-address-line2')
                },
                {
                    displayName: 'Town',
                    data: getTextQuestion('defendant-current-address-town')
                },
                {
                    displayName: 'County',
                    data: getTextQuestion('defendant-current-address-county')
                },
                {
                    displayName: 'Postcode',
                    data: getTextQuestion('defendant-current-address-postcode')
                }
            ]} questionId='summary-defendant-details' page={pathname} changeLink={`/report/${props.id}/defendant-details`} />
            <br />


            <Heading size="MEDIUM">Culpability and risk</Heading>
            <SummaryList questions={[
                {
                    displayName: 'Culpability',
                    data: getTextQuestion('culpability-and-risk-culpability')
                },
                {
                    displayName: 'Risk of domestic abuse',
                    data: getTextQuestion('culpability-and-risk-risk-of-domestic-abuse')
                },
                {
                    displayName: 'Risk of harm to children',
                    data: getTextQuestion('culpability-and-risk-risk-of-harm-to-children')
                },
                {
                    displayName: 'Risk of reconviction',
                    data: getTextQuestion('culpability-and-risk-risk-of-reconviction')
                },
                {
                    displayName: 'Risk of recidivism',
                    data: getTextQuestion('culpability-and-risk-risk-of-recidivism')
                },
                {
                    displayName: 'Risk of harm to self',
                    data: getTextQuestion('culpability-and-risk-risk-of-harm-to-self')
                }
            ]} questionId='summary-defendant-details' page={pathname} changeLink={`/report/${props.id}/culpability-and-risk`} />

            <Link onClick={savePage} href={`/report/${props.id}/summary`}>
                <Button disabled={unsavedPages.length > 0}>Generate Report</Button>
            </Link>
        </div>
    )
}
