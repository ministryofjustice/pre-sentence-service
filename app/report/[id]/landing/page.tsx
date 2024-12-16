import React from 'react'

import DefendantDetailsForm from './_components/defendant-details-form'
import NdeliusService from '../../_lib/services/ndelius-service';

export default async function Page({ params }: { params: { id: string } }) {    

    const ndelius = NdeliusService.getInstance()
    const context = await ndelius.getContext(params.id);
    
    return <>
        <DefendantDetailsForm ndeliusContext={context} />
    </>
}