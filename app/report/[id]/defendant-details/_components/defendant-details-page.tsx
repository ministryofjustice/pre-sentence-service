// src/components/pages/home-page.tsx
'use client'

import React from 'react'

import { useReportStore } from '../../../../_providers/report-store-provider'
import { Button, Caption, Heading } from 'govuk-react'
import { TextInput } from '../../../_components/text-input'
import { DateInput } from '../../../_components/date-input'
import { ErrorSummaryState } from '../../../_components/error-summary-state'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const DefendantDetailsPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updateQuestion, questions, updatePageSaveState, pageSaveState } = useReportStore((state) => state)

    const savePage = () => {
        updatePageSaveState(pathname, 'saved')
    }


    const nameValidator = (e: React.ChangeEvent<HTMLInputElement>) => {
        const validationRegex = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/

        if (!e.target.value.match(validationRegex)) {
            return 'You have entered an incorrect name'
        }

        return null
    }

    return (<>
        <div className="govuk-grid-column-two-thirds">
            <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
            <Heading size="LARGE">Defendant details</Heading>

            <ErrorSummaryState page={pathname} />

            {/* <TextInput page={pathname} questionId='defendant-full-name' heading="Full name" /> */}
            <TextInput page={pathname} questionId='defendant-full-name' validators={[nameValidator]} heading="Full name" />

            <hr className='mb-4 mt-4' />

            <DateInput page={pathname} questionId='defendant-date-of-birth' hintText="For example, 27 3 2004" heading="Date of birth" />

            <hr className='mb-4 mt-4' />

            <Heading size="MEDIUM">Current address</Heading>
            <TextInput page={pathname} required={true} questionId='defendant-current-address-line1' subheading="Address line 1" />
            <TextInput page={pathname} questionId='defendant-current-address-line2' subheading="Address line 2 (optional)" />
            <TextInput page={pathname} questionId='defendant-current-address-town' subheading="Town or city" />
            <TextInput page={pathname} questionId='defendant-current-address-county' subheading="County (optional)" />
            <TextInput page={pathname} questionId='defendant-current-address-postcode' subheading="Postcode" />


            <Link onClick={savePage} href={`/report/${props.id}/culpability-and-risk`}>
                <Button className="!mt-2">Save and continue</Button>
            </Link>
        </div>
    </>
    )
}
