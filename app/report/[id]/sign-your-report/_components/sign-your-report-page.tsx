"use client"

import { Button, Caption, Heading, Link } from "govuk-react";
import { TextInput } from '../../../_components/text-input'
import React from "react";
import { usePathname } from "next/navigation";
import { useReportStore } from "../../../../_providers/report-store-provider";

export const SignYourReportPage = (props: { id: string }) => {
    const pathname = usePathname()
    const { updatePageSaveState } = useReportStore((state) => state)

    const savePage = () => {
        updatePageSaveState(pathname, 'saved')
    }

    return <>
        <div className="govuk-grid-column-two-thirds">
            <Caption>Dylan Adam Armstrong CRN: E234516</Caption>
            <Heading size="LARGE">Sign your report</Heading>
            <TextInput page={pathname} questionId='sign-your-report-signature' heading="Full name" />
            <Link onClick={savePage} href={`/report/${props.id}/publish-report`}>
                <Button className="!mt-2 !mr-2">Save and continue</Button>
            </Link>
            <Link onClick={savePage} href={`/report/${props.id}/publish-report`}>
                <Button className="!mt-2" buttonColour="#f3f2f1" buttonTextColour="#0b0c0c">Save draft</Button>
            </Link>
        </div>
    </>
}