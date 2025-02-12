'use client'

import { Heading, Table, Button, ButtonArrow } from 'govuk-react'
import Link from 'next/link'
import React from 'react'
import { DoAndDont } from '@/app/_components/do-and-dont'
import { getRoutePath } from '@/app/report/_lib/util/routes'

export default function LandingPage(props: { id: string, dangerousnessAssessmentLink: string }) {
  return (
    <>
      <Heading size="LARGE">Write a pre-sentence report (PSR)</Heading>
      <p className="govuk-body">
        PSRs help the judiciary determine appropriate sentences in line with their assessment of the seriousness of the
        offence and the sentencing range set out in Sentencing Council Guidelines.
      </p>
      <p className="govuk-body">Use this service to write a PSR by:</p>

      <ul className="govuk-list govuk-list--bullet">
        <li>collating your notes from the pre-sentence report interview and any other sources of information</li>
        <li>following a guided experience through the steps to write this report</li>
        <li>generating the final report as a PDF to share with the judiciary</li>
      </ul>

      <DoAndDont
        dos={[
          'provide an evidence based assessment using critical analysis',
          'use professional curiosity to look beyond the information disclosed at interview and the CPS pack',
          'use sentencing guidelines as a basis for your proposal',
          'consider issues related to diversity and inclusion so that the PSR is tailored to the needs of the person',
          'adhere to child safeguarding and domestic abuse policy expectations',
        ]}
        donts={[
          'do not provide a solely descriptive account',
          'do not accept information disclosed at face value',
          'do not be unrealistic in your proposal or deviate from sentencing guidelines without explaining your rationale',
          'do not disregard diversity and inclusion issues that may present',
        ]}
      />

      <Heading size="LARGE">Before you finish a PSR</Heading>
      <p className="govuk-body">You can start the report at any time to enter information.</p>
      <p className="govuk-body font-bold">
        You will need to finish all relevant risk assessment tools before you complete and share your report.
      </p>
      <p className="govuk-body">You must complete both an:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>EPF 1 form</li>
        <li>OASys LEVEL 1 risk assessment</li>
      </ul>
      <p className="govuk-body">
        Depending on the complexity and nature of the case, you may need to complete other relevant risk assessment
        tools.
      </p>
      <p className="govuk-body">
        If requested by court you may also need to provide additional detail through a{' '}
        <a
          className="govuk-link"
          href={props.dangerousnessAssessmentLink}
        >
          dangerousness assessment.
        </a>
      </p>
      <p className="govuk-body">
        The gatekeeping process should be applied to all PSRs before they are shared with the court.
      </p>

      <Link href={getRoutePath('defendantDetails', { id: props.id })}>
        <Button icon={<ButtonArrow />} start={true}>
          Start now
        </Button>
      </Link>
    </>
  )
}
