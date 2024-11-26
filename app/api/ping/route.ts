/* eslint-disable import/prefer-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

type StatusResponse = {
  status: string
}

export async function GET(_req: NextApiRequest, res: NextApiResponse<StatusResponse>) {
  return NextResponse.json({ status: 'UP' }, { status: 200 })
}
