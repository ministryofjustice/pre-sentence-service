
import { Caption, Heading } from 'govuk-react'
import { TextInput } from '../../_components/text-input'
import { DefendantDetailsPage } from './_components/defendant-details-page'

import React from 'react'

export default function Page({ params }: { params: { id: string } }) {
    return <>
        <DefendantDetailsPage id={params.id} />
    </>
}