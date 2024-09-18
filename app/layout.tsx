import React from 'react';
import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet='utf-8' />
                <link rel="stylesheet" href="/vendor/govuk-frontend-4.4.0.min.css" />
                <link rel="stylesheet" href="/stylesheets/application.css" />
            </head>
            <body>
                <header className="govuk-header govuk-!-display-none-print" role="banner" data-module="govuk-header" >
                    <div id="header-contents" className="govuk-width-container">
                        <a href="/{{ reportPath }}/{{ reportId }}" className="govuk-header__link govuk-header__link--homepage no-underline  govuk-!-padding-top-1 govuk-!-padding-bottom-1">
                            <div id="site-header-block">
                                <div id="logo">
                                    <img src="/images/crest.svg" />
                                </div>
                                <span id="hmpps-title">
                                    HMPPS
                                </span>
                                <span id="main-title">Pre sentence service</span>
                            </div>
                        </a>

                        <div id="user-block" className="govuk-!-padding-top-1 govuk-!-padding-bottom-1">
                            <div id="header-user-name" data-qa="header-user-name">
                                A.C
                            </div>
                            <div className="govuk-!-padding-right-0">
                                <a data-qa="signOut" href="/sign-out">Sign out</a>
                            </div>
                        </div>
                    </div>
                </header>
                <div>{children}</div>
            </body>
        </html>
    )
}