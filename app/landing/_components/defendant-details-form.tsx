"use client"

import { Heading, Table, Button } from 'govuk-react'
import Link from 'next/link'
import React from 'react'

export default function DefendantDetailsForm() {
    return <>
        <Heading size="LARGE" >Defendant details</Heading>
        <Table>
            <Table.Row>
                <Table.CellHeader>
                    Full name
                </Table.CellHeader>
                <Table.Cell>
                    Dylan Adam Armstrong
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.CellHeader>
                    Date of birth
                </Table.CellHeader>
                <Table.Cell>
                    15/03/1996
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.CellHeader>
                    Current address
                </Table.CellHeader>
                <Table.Cell>
                    <p>19 Penn Streer<br />
                        Oakworth<br />
                        Bothshire<br />
                        OA17</p>
                </Table.Cell>
            </Table.Row>
        </Table>
        <Link href="/report/1234/defendant-details">
            <Button>Continue</Button>
        </Link>
    </>
}