import React from 'react'
import { VictimImpactAssessment } from './_components/victim-impact-assessment'

export default function Page({ params }: { params: { id: string } }) {
    return <VictimImpactAssessment id={params.id} />
}
