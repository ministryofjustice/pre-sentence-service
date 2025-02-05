"use client"

import React from 'react'
import { BaseComponentProps } from "../../_lib/base-components-props";


type SummaryListInputProps = {
    questions: {
        displayName: string;
        data: string | React.ReactElement;
    }[]
    changeLink?: string
} & BaseComponentProps

export function SummaryList(props: SummaryListInputProps) {

    return (
        <>
            <dl className="govuk-summary-list">
                {props.questions.map(question => {
                    return (<>
                        <div className="govuk-summary-list__row">
                            <dt className="govuk-summary-list__key">
                                {question.displayName}
                            </dt>
                            <dd className="govuk-summary-list__value">
                                {question.data}
                            </dd>
                            {props.changeLink ? (<dd className="govuk-summary-list__actions">
                                <a className="govuk-link" href={props.changeLink}>Change<span className="govuk-visually-hidden"> name</span></a>
                            </dd>) : null}
                        </div>
                    </>)
                })}

            </dl>
        </>
    )
}