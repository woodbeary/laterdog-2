'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function LoginPage() {
  const handleXLogin = async () => {
    console.log('Login button clicked') // Add this line
    try {
      console.log('Attempting to sign in with Twitter') // Add this line
      const result = await signIn('twitter', { callbackUrl: '/profile-setup', redirect: false })
      console.log('Sign in result:', result) // Add this line
      if (result?.error) {
        console.error('Login error:', result.error)
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Welcome to later.dog</h1>
      
      <Button 
        className="w-full max-w-xs py-4 text-lg bg-black hover:bg-gray-900 text-white rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center"
        onClick={handleXLogin}
      >
        <Image src="/images/logo-white.png" alt="X logo" width={24} height={24} className="mr-2" />
        Continue with X
      </Button>
    </div>
  )
}