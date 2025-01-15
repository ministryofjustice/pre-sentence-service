'use client'

import React from 'react'
import { TextAreaInput } from '../../../_components/text-area'
import { Button, Caption, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'

export const OffenceAnalysis = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)


    const savePage = () => {
        updatePageSaveState(pathname, 'saved')
    }

    return (

        <div className="govuk-grid-column-full">
            <Caption>Dylan Adam Armstrong CRN | E234516</Caption>
            <Heading size="LARGE">Offence analysis</Heading>
          <TextAreaInput
            page={pathname}
            questionId="culpability-and-risk-culpability"
            heading="Analyse offences under consideration"
            subheading={[
              "Offence details that provide suitable context",
              "Whether the defendant pled guilty or was convicted after trial as a factor in determining their level of responsibility",
              "Victim impact, harm and consequences of an offence and the defendant's understanding of this",
              "The factors relating to the offence including the defendant's lifestyle considerations",
              "Diversity factors, protected characteristics or other factors where they are relevant to explaining elements of your analysis"
            ]}
          />


          <hr className='mb-4' />

          <TextAreaInput
            page={pathname}
            questionId="culpability-and-risk-nature-of-reoffending"
            heading="Analyse the pattern of offending and response to supervision"
            subheading={[
              "Analyse previous offending by taking into consideration the type of offences, any patterns in offending and factors linked to this behaviour.",
              "Any previous responses to supervision, considering levels of compliance and associated reasons for this.",
              "Interventions that may reduce the chances of offending.",
              "Circumstances that may increase the risk of further offending."
            ]}
          />


          <Link onClick={savePage} href={`/report/${props.id}/summary`}>
                <Button>Save and continue</Button>
            </Link>
        </div>
    )
}
