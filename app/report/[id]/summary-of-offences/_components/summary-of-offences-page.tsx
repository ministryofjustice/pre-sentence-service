'use client'

import React from 'react'
import { TextInput } from '../../../_components/text-input'
import { Button, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'
import { PageHeading } from '../../../_components/page-heading'
import { getRoutePath, getNextPageKey } from "../../../_lib/util/routes";


export const SummaryOfOffencesPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)


    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }

    return (

        <div className="govuk-grid-column-two-thirds">
            <PageHeading title='Summary of offences' crnDataQuestionId='defendant-crn'  nameDataQuestionId='defendant-full-name' />

            <TextInput page={pathname} questionId='summary-of-offences-sample-text-field' heading="Sample text field" />

            <Link onClick={savePage} href={getRoutePath(getNextPageKey('summaryOfOffences'), {id: props.id})}>
                <Button>Save and continue</Button>
            </Link>
        </div>
    )
}
