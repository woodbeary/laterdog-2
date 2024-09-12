import { Suspense } from 'react'
import AuthErrorContent from '@/components/AuthErrorContent'

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex items-center justify-center">Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  )
}