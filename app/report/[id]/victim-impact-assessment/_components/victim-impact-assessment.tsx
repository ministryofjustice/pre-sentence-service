'use client'

import React from 'react'
import { TextInput } from '../../../_components/text-input'
import { TextAreaInput } from '../../../_components/text-area'
import { SelectInput } from '../../../_components/select-input'
import { Button, Caption, Heading } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'

export const VictimImpactAssessment = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)


    const savePage = () => {
        // do client side zustand state update, then do actual server side save to persist page to database
        updatePageSaveState(pathname, 'saved')
    }

    return (

      <div className="govuk-grid-column-full">
        <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
        <Heading size="LARGE">Victim impact assessment</Heading>

        <p id="victim-impact-assessment-hint-p1" className="govuk-body">
          The victim impact assessment is used to inform sentencing options such as exclusion zones. You will be able to
          review this later as you are writing your sentencing proposal.
        </p>

        <span className="govuk-details__summary-text govuk-!-margin-bottom-3 govuk-!-margin-top-2">
          <Link href="#">View CPS pack</Link>
        </span>

        <details className="govuk-details govuk-!-margin-bottom-0"
                 data-module="govuk-details">
          <summary className="govuk-details__summary govuk-!-margin-bottom-0 govuk-!-margin-top-2">
            <span className="govuk-details__summary-text">Help with victim impact assessment</span>
          </summary>
          <div className="govuk-details__text govuk-!-padding-bottom-0">
            <label className="govuk-label" htmlFor="note-box-{{ params.assessment.victimId }}">
              The CPS pack usually includes a statement from the victim. Use this alongside the account provided in the
              pre-sentence report interview to write the victim impact assessment. This should consider the defendant's:
              <ul className="govuk-list govuk-list--bullet">
                <li>attitudes</li>
                <li>responsibility</li>
                <li>circumstances</li>
                <li>motivations</li>
                <li>the defendant's interpretation of the offence</li>
              </ul>
            </label>
          </div>
        </details>

        <TextAreaInput
          page={pathname}
          questionId="victim-impact-assessment-hint-p2" />

        <Link onClick={savePage} href={`/report/${props.id}/culpability-and-risk`}>
          <Button>Save and continue</Button>
        </Link>
      </div>
    )
}
