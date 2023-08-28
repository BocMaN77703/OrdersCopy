import Cookies from 'cookies'
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server'

export function GET(req:NextApiRequest,res:NextApiResponse) {
    const cookies = new Cookies(req, res)
//   const accessToken = cookies.get('access_token');
//   console.log(accessToken)
  let hasAccessToken = false

  if (req.cookies)
    hasAccessToken = true

  return NextResponse.json({ hasAccessToken });
}
