'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function UserProfilePage() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.push('/login')
    }
  }, [session.status, router])

  if (session.status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session.data) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p>Welcome, {session.data.user?.name}! This page is under construction.</p>
    </div>
  )
}