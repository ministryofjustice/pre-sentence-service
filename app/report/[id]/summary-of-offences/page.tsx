import React from 'react'
import { SummaryOfOffencesPage } from './_components/summary-of-offences-page'

export default function Page({ params }: { params: { id: string } }) {
    return <SummaryOfOffencesPage id={params.id} />
}