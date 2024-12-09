import Link from "next/link";
import { PropsWithChildren } from "react";
import { ReportStoreProvider } from '../_providers/report-store-provider'
import { headers } from 'next/headers'
import { Sidebar } from './_components/sidebar'
import React from "react";

export default function ReportLayout({ children }: PropsWithChildren) {
    const requestUrl = headers().get('x-url')

    return (
        <main className="govuk-main-wrapper" id="main-content">
            <div className="govuk-width-container">
                <div className="grid grid-cols-6 gap-4">

                    <ReportStoreProvider>
                        <Sidebar />
                        <div className="col-span-5">{children}</div>
                    </ReportStoreProvider>
                </div>
            </div>

        </main>

    )
}