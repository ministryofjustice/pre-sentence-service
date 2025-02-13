import { Caption, Heading } from 'govuk-react'
import { TextInput } from '../../_components/text-input'
import { DefendantDetailsPage } from './_components/defendant-details-page'

import React from 'react'
import NdeliusService from '../../_lib/services/ndelius-service'
import { getDBConnection } from '../../_lib/services/database-service'

export default async function Page({ params }: { params: { id: string } }) {
    const ndelius = NdeliusService.getInstance()
    const databaseConnection = getDBConnection();
    // console.log("🚀 ~ Page ~ databaseConnection:", databaseConnection)
    
    const context = await ndelius.getContext(params.id);

    return <>
        <DefendantDetailsPage id={params.id} ndeliusContext={context} />
    </>
}