'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()

  const handleXLogin = () => {
    // This will be replaced with actual X (Twitter) OAuth logic
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

      {/* Remove the image carousel for now */}
    </div>
  )
}