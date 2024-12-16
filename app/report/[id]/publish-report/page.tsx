import React from 'react'
import { PublishReport } from './_components/publish-report'

export default function Page({ params }: { params: { id: string } }) {
    return <PublishReport id={params.id} />
}
