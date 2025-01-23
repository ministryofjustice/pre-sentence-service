import React from 'react'
import { BehaviouralFactors } from './_components/behavioural-factors'

export default function Page({ params }: { params: { id: string } }) {
    return <BehaviouralFactors id={params.id} />
}
