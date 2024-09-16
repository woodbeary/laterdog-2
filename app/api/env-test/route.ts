import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TWITTER_CLIENT_ID_EXISTS: !!process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET_EXISTS: !!process.env.TWITTER_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  })
}