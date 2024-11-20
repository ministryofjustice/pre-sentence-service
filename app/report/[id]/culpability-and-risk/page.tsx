import React from 'react'
import { CulpabilityAndRiskPage } from './_components/culpability-and-risk-page'

export default function Page({ params }: { params: { id: string } }) {
    return <CulpabilityAndRiskPage id={params.id} />
}