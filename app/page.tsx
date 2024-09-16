'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const session = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (session.status !== 'loading') {
      setIsLoading(false)
    }
  }, [session.status])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {session.data ? (
        <p>Authenticated content</p>
      ) : (
        <p>Public content or sign-in button</p>
      )}
    </div>
  )
}
