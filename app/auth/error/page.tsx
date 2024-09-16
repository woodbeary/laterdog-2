import { Suspense } from 'react'
import AuthErrorContent from '@/components/AuthErrorContent'
import { useSession } from 'next-auth/react'

export default function AuthErrorPage() {
  const session = useSession()

  if (session.status === 'loading') {
    return <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex items-center justify-center">Loading...</div>
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  )
}