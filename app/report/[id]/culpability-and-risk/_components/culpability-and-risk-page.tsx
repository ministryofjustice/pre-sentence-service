'use client'

import React from 'react'
import { TextInput } from '../../../_components/text-input'
import { TextAreaInput } from '../../../_components/text-area'
import { SelectInput } from '../../../_components/select-input'
import { Button, Caption, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'

export const CulpabilityAndRiskPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)


    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }

    return (

        <div className="govuk-grid-column-two-thirds">
            <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
            <Heading size="LARGE">Culpability and risk</Heading>
            <TextAreaInput
                page={pathname}
                questionId='culpability-and-risk-culpability'
                heading="Culpability"
                subheading='Are there any exenuating circumstances that might make the defendant less accountable for their action or inaction?' />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-harm-to-others'
                heading='What is the risk of serious harm to others?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-harm-to-known-individuals'
                heading='What is the risk of serious harm to known individuals?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-domestic abuse'
                heading='What is the risk of domestic abuse?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-harm-to-children'
                heading='What is the risk of serious harm to children?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-reconviction'
                heading='What is the risk of serious harm to reconviction?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-recidivism'
                heading='What is the risk of serious recidivism?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />

            <SelectInput page={pathname}
                questionId='culpability-and-risk-risk-of-harm-to-self'
                heading='What is the risk of serious harm to themselves?'
                items={[{ key: '1', value: '1' }, { key: '2', value: '2' }, { key: '3', value: '3' }]} />


            <TextAreaInput
                page={pathname}
                questionId='culpability-and-risk-nature-of-reoffending'
                heading="Nature and imminence of reoffending"
                subheading='Describe what the nature of reoffending is and how it may be managed. If other factors contradict OGRS scores, then explain why the OGRS score is wrong, what factor is affecting it, and what the risk actually is.' />

            <TextAreaInput
                page={pathname}
                questionId='culpability-and-risk-risk-of-serious-harm'
                heading="Risk of serious harm"
                subheading='Summarise the risk of serious harm' />

            <Link onClick={savePage} href={`/report/${props.id}/summary`}>
                <Button>Save and continue</Button>
            </Link>
        </div>
    )
}
