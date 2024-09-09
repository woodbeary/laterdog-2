'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

export default function NotForYouPage() {
  const [showNotifyForm, setShowNotifyForm] = useState(false)
  const [twitterHandle, setTwitterHandle] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this to your backend
    console.log('Submitted Twitter handle:', twitterHandle)
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Sorry, later.dog is not for you... yet!</h1>
      <p className="text-center mb-8">
        later.dog is currently a platform designed specifically for developers and those learning to code. 
        If you're interested in becoming a developer, check out some resources to get started!
      </p>
      <div className="space-y-4 mb-8">
        <Link href="https://www.freecodecamp.org/" passHref>
          <Button className="w-full">Learn to Code</Button>
        </Link>
        {!showNotifyForm && !isSubmitted && (
          <Button className="w-full" onClick={() => setShowNotifyForm(true)}>
            Notify Me When It's Ready
          </Button>
        )}
      </div>
      
      {showNotifyForm && !isSubmitted && (
        <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-center text-green-300">Want to be notified when we open up?</h2>
          <div className="flex items-center mb-2">
            <Input
              type="text"
              placeholder="Your Twitter handle"
              value={twitterHandle}
              onChange={(e) => setTwitterHandle(e.target.value)}
              className="flex-grow mr-2 bg-gray-800 text-green-400 border-green-500"
            />
            <Button type="submit">Submit</Button>
          </div>
          <p className="text-xs text-green-600 italic">
            No promises on when we'll notify you... my sleep schedule isn't so great right now.
          </p>
        </form>
      )}

      {isSubmitted && (
        <div className="text-center mb-8">
          <p className="text-xl font-bold text-green-300">Thanks for your interest!</p>
          <p className="text-green-400">We'll let you know when later.dog opens up for everyone.</p>
        </div>
      )}

      <Link href="/" passHref>
        <Button variant="outline">Back to Home</Button>
      </Link>
    </div>
  )
}