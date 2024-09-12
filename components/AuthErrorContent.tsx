'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function AuthErrorContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState('There was an error during the authentication process. Please try again.')

  useEffect(() => {
    const error = searchParams.get('error')
    if (error === 'OAuthCallback') {
      setErrorMessage('We\'ve hit Twitter\'s rate limit. Please try again in a few minutes.')
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Authentication Error</h1>
      <p className="mb-8">{errorMessage}</p>
      <Button 
        className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-all duration-200 ease-in-out"
        onClick={() => router.push('/login')}
      >
        Back to Login
      </Button>
    </div>
  )
}