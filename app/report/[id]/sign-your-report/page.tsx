import { SignYourReportPage } from './_components/sign-your-report-page'

export default function Page({ params }: { params: { id: string } }) {
    return <SignYourReportPage id={params.id} />
}