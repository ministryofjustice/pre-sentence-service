import React from 'react'
import { SummaryPage } from './_components/summary-page'

export default function Page({ params }: { params: { id: string } }) {
    return <SummaryPage id={params.id} />
}