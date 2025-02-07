'use client'

import React, { useEffect } from 'react'
import { TextAreaInput } from '../../../_components/text-area'
import { Button, Caption, Heading, Table } from 'govuk-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useReportStore } from '../../../../_providers/report-store-provider'
import { getRoutePath, getNextPageKey } from '../../../_lib/util/routes'

export const OffenceAnalysis = (props: { id: string, offences?: any[] }) => {
  const pathname = usePathname()
  const { updateQuestion, questions, updatePageSaveState } = useReportStore((state) => state)

  useEffect(() => {
    if (props.offences && props.offences.length > 0) {
      props.offences.forEach((offence: any, index: number) => {
        updateQuestion(`offence-${index}-name`, pathname, offence.name)
        updateQuestion(`offence-${index}-date`, pathname, offence.date)
      })
    }
  }, [props.offences])

  const savePage = () => {
    updatePageSaveState(pathname, 'saved')
  }

  const getTextQuestion = (questionId: string, defaultValue: string) => {
    return questions?.[questionId] || defaultValue
  }

  const getDateQuestion = (questionId: string, defaultValue: string) => {
    return questions?.[questionId] || defaultValue
  }

  const offences = props.offences || [
    { name: "Criminal damage", date: "12/04/2024" },
    { name: "Wounding or grievous bodily harm with intent to cause grievous bodily harm", date: "12/04/2024" },
    { name: "Assault on emergency worker", date: "12/04/2024" },
    { name: "Possession of class A drugs", date: "12/04/2024" }
  ]

  return (
    <div className="govuk-grid-column-full">
      <Caption>Dylan Adam Armstrong | CRN: E23516</Caption>
      <Heading size="LARGE">Offence analysis</Heading>

      <Heading size="MEDIUM">Review offences from NDelius</Heading>
      <p>If any of this information is incorrect you will need to go to NDelius to update it. Any changes you make in NDelius will be updated after you refresh the page in this PSR.</p>

      <Table>
        <Table.Row>
          <Table.CellHeader>Offence</Table.CellHeader>
          <Table.CellHeader>Date of Offence</Table.CellHeader>
        </Table.Row>
        <Table.Row className="govuk-table__row--grey-background">
          <Table.Cell><strong>{getTextQuestion('offence-0-name', offences[0].name)}</strong></Table.Cell>
          <Table.Cell><strong>{getDateQuestion('offence-0-date', offences[0].date)}</strong></Table.Cell>
        </Table.Row>
        <Table.Row className="govuk-table__row--grey-background">
          <Table.Cell colSpan={2} className="govuk-table__cell">Main offence</Table.Cell>
        </Table.Row>
        {offences.slice(1).map((offence: any, index: number) => (
          <Table.Row key={index}>
            <Table.Cell>{getTextQuestion(`offence-${index + 1}-name`, offence.name)}</Table.Cell>
            <Table.Cell>{getDateQuestion(`offence-${index + 1}-date`, offence.date)}</Table.Cell>
          </Table.Row>
        ))}
      </Table>

      <TextAreaInput
        page={pathname}
        questionId="culpability-and-risk-culpability"
        heading="Analyse offences under consideration"
        subheading={[
          "Give a comprehensive analysis of the offences relevant to this report, considering:",
          "Offence details that provide suitable context rather than repeating the case summary from the CPS pack",
          "Whether the defendant pled guilty or was convicted after trial as a factor in determining their level of responsibility",
          "Victim impact, harm and consequences of an offence and the defendant's understanding of this",
          "The factors relating to the offence including the defendant's lifestyle considerations",
          "Diversity factors, protected characteristics or other factors where they are relevant to explaining elements of your analysis"
        ]}
      />

      <TextAreaInput
        page={pathname}
        questionId="culpability-and-risk-nature-of-reoffending"
        heading="Analyse the pattern of offending and response to supervision"
        subheading={[
          "Analyse previous offending by taking into consideration the type of offences, any patterns in offending and factors linked to this behaviour.",
          "You should also highlight:",
          "Any previous responses to supervision, considering levels of compliance and associated reasons for this.",
          "Interventions that may reduce the chances of offending.",
          "Circumstances that may increase the risk of further offending."
        ]}
      />

      <div className="govuk-button-group">
        <Link onClick={savePage} href={getRoutePath(getNextPageKey('offenceAnalysis'), { id: props.id })}>
          <Button>Save and continue</Button>
        </Link>
      </div>
    </div>
  )
}
