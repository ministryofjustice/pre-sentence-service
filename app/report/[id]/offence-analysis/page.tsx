import React from 'react'
import { OffenceAnalysis } from './_components/offence-analysis'

export default function Page({ params }: { params: { id: string } }) {
    return <OffenceAnalysis id={params.id} />
}
