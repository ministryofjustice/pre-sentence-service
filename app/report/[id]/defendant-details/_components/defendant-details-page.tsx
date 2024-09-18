// src/components/pages/home-page.tsx
'use client'

import React from 'react'

import { useReportStore } from '../../../../_providers/report-store-provider'
import { Button, Caption, Heading } from 'govuk-react'
import { TextInput } from '../../../_components/text-input'
import { DateInput } from '../../../_components/date-input'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DefendantDetailsPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updateQuestion, questions, updatePageSaveState, pageSaveState } = useReportStore((state) => state)

    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }


    return (<>
        <div className="govuk-grid-column-two-thirds">
            <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
            <Heading size="LARGE">Defendant details</Heading>
            <TextInput page={pathname} questionId='defendant-full-name' heading="Full name" />
            <DateInput page={pathname} questionId='defendant-date-of-birth' hintText="For example, 27 3 2004" heading="Date of birth" />

            <Link onClick={savePage} href={`/report/${props.id}/summary-of-offences`}>
                <Button>Save and continue</Button>
            </Link>
        </div>
    </>
    )
}
