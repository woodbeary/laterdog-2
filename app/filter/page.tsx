'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from "lucide-react"

export default function FilterPage() {
  const router = useRouter()
  const [stage, setStage] = useState<'question' | 'normie' | 'notify'>('question')
  const [twitterHandle, setTwitterHandle] = useState('')

  const handleFilterChoice = (choice: boolean) => {
    if (choice) {
      setStage('normie')
    } else {
      router.push('/profile-setup')  // Changed from '/login' to '/profile-setup'
    }
  }

  const handleNotifyMe = () => {
    setStage('notify')
  }

  const handleSubmitNotification = () => {
    // Here you would typically save the Twitter handle for future notification
    console.log('Notify:', twitterHandle)
    // For now, we'll just go back to the landing page
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <Card className="bg-gray-800 border-green-500 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-300 flex items-center justify-center">
              {stage === 'question' && (
                <>
                  Quick Question
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="ml-2 w-5 h-5 cursor-help text-green-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 text-green-400 border-green-500">
                        <p>This helps us tailor your experience. Choose "No" if you're a developer or tech enthusiast!</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}
              {stage === 'normie' && "Sorry!"}
              {stage === 'notify' && "Stay Updated"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {stage === 'question' && (
              <>
                <p className="text-center text-lg text-green-300">Are you a normie?</p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-2"
                    onClick={() => handleFilterChoice(true)}
                  >
                    Yes
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-2"
                    onClick={() => handleFilterChoice(false)}
                  >
                    No
                  </Button>
                </div>
                <p className="text-center text-sm text-green-400">
                  (Yes: I don't do software | No: Software is life!!)
                </p>
              </>
            )}
            {stage === 'normie' && (
              <>
                <p className="text-center text-lg mb-4 text-green-300">Currently, this is exclusive to software nerds. Please come back later!</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleNotifyMe}
                >
                  Notify me when it's open to everyone
                </Button>
              </>
            )}
            {stage === 'notify' && (
              <>
                <Input
                  type="text"
                  placeholder="Your Twitter handle"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  className="bg-gray-700 text-green-400 border-green-500 text-lg py-2"
                />
                <p className="text-sm italic text-green-400 mt-2">
                  No promises on when we'll notify you... my sleep schedule isn't so great right now.
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-2 mt-4"
                  onClick={handleSubmitNotification}
                >
                  Submit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}