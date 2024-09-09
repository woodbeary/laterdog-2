import { NextResponse } from 'next/server'

export async function GET() {
  console.log('Environment variables in check-env:');
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
  console.log('TWITTER_CLIENT_ID exists:', !!process.env.TWITTER_CLIENT_ID);
  console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET);
  console.log('NODE_ENV:', process.env.NODE_ENV);

  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    TWITTER_CLIENT_ID_EXISTS: !!process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET_EXISTS: !!process.env.TWITTER_CLIENT_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  })
}