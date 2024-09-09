'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface MockSessionProviderProps {
  children: ReactNode
}

const mockSession = {
  user: {
    name: "Mock User",
    email: "mock@example.com",
    image: "https://github.com/github.png",
  },
  expires: "2099-01-01T00:00:00.000Z"
}

export function MockSessionProvider({ children }: MockSessionProviderProps) {
  return (
    <SessionProvider session={mockSession}>
      {children}
    </SessionProvider>
  )
}