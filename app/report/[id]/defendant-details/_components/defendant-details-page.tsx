// src/components/pages/home-page.tsx
'use client'

import React, {useEffect} from 'react'

import { useReportStore } from '../../../../_providers/report-store-provider'
import { Button, Caption, Heading } from 'govuk-react'
import { SummaryList } from '../../../_components/summary-list'
import { TextInput } from '../../../_components/text-input'
import { DateInput } from '../../../_components/date-input'
import { PageHeading } from '../../../_components/page-heading'
import { ErrorSummaryState } from '../../../_components/error-summary-state'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IContext } from '../../../../../server/services/preSentenceToDeliusService'
import { ParagraphText } from '../../../_components/paragraph'
import { getRoutePath, getNextPageKey } from '../../../_lib/util/routes'

enum DateFieldProp {
    DateFieldDay = 'DateFieldDay',
    DateFieldMonth = 'DateFieldMonth',
    DateFieldYear = 'DateFieldYear'
}

export const DefendantDetailsPage = (props: { id: string, ndeliusContext: IContext  }) => {
    const pathname = usePathname()
    const { updateQuestion, questions, updatePageSaveState, pageSaveState } = useReportStore((state) => state)

    useEffect(() => {
        updateQuestion('defendant-full-name', pathname, `${props.ndeliusContext.name.forename} ${props.ndeliusContext.name.surname}`)
        updateQuestion('defendant-crn', pathname, props.ndeliusContext.crn)

        const dob = new Date(props.ndeliusContext.dateOfBirth);
        updateQuestion('defendant-date-of-birth-DateFieldDay', pathname, dob.getDay())
        updateQuestion('defendant-date-of-birth-DateFieldMonth', pathname, dob.getMonth() + 1)
        updateQuestion('defendant-date-of-birth-DateFieldYear', pathname, dob.getFullYear())

        updateQuestion('defendant-current-address-line1', pathname, `${props.ndeliusContext.address.addressNumber} ${props.ndeliusContext.address.buildingName} ${props.ndeliusContext.address.streetName}`)
        updateQuestion('defendant-current-address-town', pathname, props.ndeliusContext.address.town)
        updateQuestion('defendant-current-address-county', pathname, props.ndeliusContext.address.county)
        updateQuestion('defendant-current-address-postcode', pathname, props.ndeliusContext.address.postcode)
    }, [])

    const savePage = () => {
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

    const getAddressDataBlock = (questionId: string) => {
        return (
            <>
            <span>{getTextQuestion(`${questionId}-line1`)}</span>
            <br/>
            <span>{getTextQuestion(`${questionId}-town`)}</span>
            <br/>
            <span>{getTextQuestion(`${questionId}-county`)}</span>
            <br/>
            <span>{getTextQuestion(`${questionId}-postcode`)}</span>
            </>
        )
    }


    return (<>
        <div className="govuk-grid-column-two-thirds">
            <PageHeading title='Defendant details' crnDataQuestionId='defendant-crn'  nameDataQuestionId='defendant-full-name' />

            <ParagraphText text="If any of this information is incorrect you will need to go to NDelius to update it.  Any changes you make to the defendant’s details in NDelius will be updated after you refresh a page in this PSR." />


            {/* <SummaryList questions={[
                {
                    displayName: 'Full name',
                    data: getTextQuestion('defendant-full-name')
                },
                {
                    displayName: 'Date of birth',
                    data: getDateQuestion('defendant-date-of-birth')
                },
                {
                    displayName: 'Current address',
                    data: getAddressDataBlock('defendant-current-address')
                },

            ]} questionId='defendant-details' page={pathname} />
 */}

            <Link className="mr-2" onClick={savePage} href={`/report/${props.id}/offence-analysis`}>
                <Button className="!mt-2">Save and continue</Button>
            </Link>

            <Link onClick={savePage} href={getRoutePath(getNextPageKey('defendantDetails'), {id: props.id})}>
                <Button className="!mt-2" buttonColour="#f3f2f1" buttonTextColour="#0b0c0c">Save draft</Button>
            </Link>
        </div>
    </>
    )
}
