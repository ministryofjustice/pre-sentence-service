"use client"

import { Heading, Table, Button } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { DoAndDont } from "../../../../_components/do-and-dont"
import { IContext } from '../../../../../server/services/preSentenceToDeliusService'
import { getRoutePath } from '../../../_lib/util/routes'


export default function LandingPage(props:{ id: string}) {

    return <>
        <Heading size="LARGE" >Writing a pre-sentence report</Heading>
        <p className="govuk-body">Pre-sentence reports help the judiciary determine appropriate sentences in line with their assessment of the seriousness of the offence and the sentencing range set out in Sentencing Council Guidelines.
            Use this service to write a pre-sentence report by:</p>

        <ul className='govuk-list govuk-list--bullet'>
            <li>collating your notes from the pre-sentence report interview and any other sources of information</li>
            <li>following a guided experience through the steps to write this report</li>
            <li>generating the final report as a PDF to share with the judiciary</li>
        </ul>

        <DoAndDont
            dos={
                [
                    'provide an evidence based assessment using critical analysis',
                    'use professional curiosity to look beyond the information disclosed at interview and the CPS pack',
                    'use sentencing guidelines as a basis for your proposal',
                    'consider issues related to diversity and inclusion so that the PSR is tailored to the needs of the person',
                    'adhere to child safeguarding and domestic abuse policy expectations'
                ]
            }
            donts={
                [
                    'do not provide a solely descriptive account',
                    'do not accept information disclosed at face value',
                    'do not be unrealistic in your proposal or deviate from sentencing guidelines without explaining your rationale',
                    'do not disregard diversity and inclusion issues that may present as this will affect the robustness of the proposal'
                ]
            }
        />

        <Heading size="LARGE" >Before you finish your report</Heading>
        <p className='govuk-body'>You can start the report at any time to enter information or collate notes.</p>
        <p className='govuk-body font-bold'>You will need to finish all relevant risk assessment tools before you complete and share your report.</p>
        <p className='govuk-body'>You must complete both an:</p>
        <ul className='govuk-list govuk-list--bullet'>
            <li>EPF 1 form</li>
            <li>OASys LEVEL 1 risk assessment</li>
        </ul>
        <p className='govuk-body'>Depending on the complexity and nature of the case, you may need to complete other relevant risk assessment tools such as a SARA (Spousal Assault Risk Assessment).</p>
        <p className='govuk-body'>If requested by court you may also need to provide additional detail through dangerousness assessments to get a better understanding of risk.</p>

        <Link href={getRoutePath('defendantDetails', {id: props.id})}>
            <Button start={true}>Start</Button>
        </Link>
    </>
}