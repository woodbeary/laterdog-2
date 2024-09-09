'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"

export default function ProfileSetupPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleGitHubConnect = () => {
    signIn('github', { callbackUrl: '/profile-setup' })
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Setup</h1>
      {step === 1 && (
        <div>
          <p>Welcome! Let's set up your profile.</p>
          <Button onClick={() => setStep(2)}>Next</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p>Connect your GitHub account to continue.</p>
          <Button onClick={handleGitHubConnect}>Connect GitHub</Button>
        </div>
      )}
      {/* Add more steps as needed */}
    </div>
  )
}