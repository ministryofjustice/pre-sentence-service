'use client'

import React from 'react'
import { TextInput } from '../../../_components/text-input'
import { Button, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'

export const SummaryOfOffencesPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)


    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }

    return (

        <div className="govuk-grid-column-two-thirds">
            <Heading size="LARGE">Summary of offences</Heading>
            <TextInput page={pathname} questionId='summary-of-offences-sample-text-field' heading="Sample text field" />

            <Link onClick={savePage} href={`/report/${props.id}/summary`}>
                <Button>Save and continue</Button>
            </Link>
        </div>
    )
}
