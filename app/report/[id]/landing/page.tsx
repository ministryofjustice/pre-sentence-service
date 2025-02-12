import React from 'react'

import LandingPage from './_components/landing-page'
import NdeliusService from '../../_lib/services/ndelius-service'

export default async function Page({ params }: { params: { id: string } }) {
  const dangerousnessAssessmentLink = process.env.DANGEROUSNESS_ASSESSMENT_LINK ?? '#'

  return (
    <>
      <LandingPage dangerousnessAssessmentLink={dangerousnessAssessmentLink} id={params.id} />
    </>
  )
}