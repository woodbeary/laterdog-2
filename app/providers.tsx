'use client'

import { SessionProvider } from "next-auth/react"
import { MockSessionProvider } from "./mock-session-provider"

const isDevelopment = process.env.NODE_ENV === 'development'

export function Providers({ children }: { children: React.ReactNode }) {
  console.log('Environment:', process.env.NODE_ENV)
  console.log('Is development:', isDevelopment)
  console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

  const SessionWrapper = isDevelopment ? MockSessionProvider : SessionProvider;

  return (
    <SessionWrapper>
      {children}
    </SessionWrapper>
  );
}