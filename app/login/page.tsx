'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

export default function LoginPage() {
  const [showExplanation, setShowExplanation] = useState(false)

  const handleXLogin = async () => {
    setShowExplanation(true)
  }

  const proceedWithLogin = async () => {
    setShowExplanation(false)
    try {
      const result = await signIn('twitter', { callbackUrl: '/profile-setup', redirect: false })
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

      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent className="bg-gray-800 text-green-400 border-green-500">
          <DialogHeader>
            <DialogTitle>Before we continue...</DialogTitle>
            <DialogDescription>
              We value your privacy and security. Here's what you need to know:
              <ul className="list-disc list-inside mt-2">
                <li>We only access your public profile information (name, username, profile picture).</li>
                <li>Your data is never shared with third parties.</li>
                <li>We use this information to create your later.dog profile.</li>
                <li>You can revoke access at any time from your X settings.</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={proceedWithLogin}>I understand, continue to X</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}