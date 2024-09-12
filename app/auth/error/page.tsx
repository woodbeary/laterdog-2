'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorMessage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div>
      <h1>Authentication Error</h1>
      <p>An error occurred during authentication: {error}</p>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorMessage />
    </Suspense>
  )
}