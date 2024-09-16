'use client'

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

interface MockSessionProviderProps {
  children: React.ReactNode
}

export function MockSessionProvider({ children }: MockSessionProviderProps) {
  const mockSession: Session = {
    user: {
      id: "mock-user-id",
      name: "Mock User",
      email: "mock@example.com",
      image: "https://example.com/mock-image.jpg",
      username: "mockuser",
      twitterUsername: "mocktwitteruser",
      twitterId: "mocktwitterid",
      githubUsername: "mockgithubuser",
      githubImage: "https://example.com/mock-github-image.jpg",
    },
    expires: "2099-01-01T00:00:00.000Z"
  }

  return (
    <SessionProvider session={mockSession}>
      {children}
    </SessionProvider>
  )
}