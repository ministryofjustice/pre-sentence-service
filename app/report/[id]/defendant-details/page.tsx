
import { Caption, Heading } from 'govuk-react'
import { TextInput } from '../../_components/text-input'
import { DefendantDetailsPage } from './_components/defendant-details-page'

import React from 'react'
import NdeliusService from '../../_lib/services/ndelius-service'

export default async function Page({ params }: { params: { id: string } }) {
    const ndelius = NdeliusService.getInstance()
    const context = await ndelius.getContext(params.id);

    return <>
        <DefendantDetailsPage id={params.id} ndeliusContext={context} />
    </>
}