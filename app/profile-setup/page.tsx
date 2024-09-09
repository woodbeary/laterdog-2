'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ProfileSetupPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [bio, setBio] = useState('')
  const [githubConnected, setGithubConnected] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
    if (session?.user?.githubId) {
      setGithubConnected(true)
    }
  }, [status, router, session])

  const handleGitHubConnect = async () => {
    const result = await signIn('github', { redirect: false })
    if (result?.error) {
      console.error('GitHub connection failed:', result.error)
    } else {
      setGithubConnected(true)
      await update() // Update the session to include GitHub data
      await fetchGitHubData() // Fetch and store GitHub data
    }
  }

  const fetchGitHubData = async () => {
    try {
      const response = await fetch('/api/github/user-data')
      if (response.ok) {
        const data = await response.json()
        console.log('GitHub data fetched:', data)
        // TODO: Store this data in Firestore
      } else {
        console.error('Failed to fetch GitHub data')
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio })
      })
      if (response.ok) {
        router.push('/profile')
      } else {
        console.error('Failed to update profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
    }
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
          <p className="mb-4">Welcome! Let's set up your profile.</p>
          <Button onClick={() => setStep(2)}>Next</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <p className="mb-4">Connect your GitHub account to continue.</p>
          {githubConnected ? (
            <p className="text-green-500 mb-4">GitHub connected successfully!</p>
          ) : (
            <Button onClick={handleGitHubConnect}>Connect GitHub</Button>
          )}
          <Button onClick={() => setStep(3)} disabled={!githubConnected} className="ml-4">
            Next
          </Button>
        </div>
      )}
      {step === 3 && (
        <div>
          <p className="mb-4">Tell us a bit about yourself:</p>
          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Your bio"
            className="mb-4"
          />
          <Button onClick={handleSubmit}>Complete Setup</Button>
        </div>
      )}
    </div>
  )
}