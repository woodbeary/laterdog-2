'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false)
    }
  }, [status])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {session ? (
        <p>Authenticated content</p>
      ) : (
        <p>Public content or sign-in button</p>
      )}
    </div>
  )
}
