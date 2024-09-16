'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import Image from 'next/image'

export default function ProfileSetupPage() {
  const session = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [bio, setBio] = useState('')
  const [codingInterests, setCodingInterests] = useState('')
  const [setupProgress, setSetupProgress] = useState(0)

  useEffect(() => {
    if (session.status !== 'loading') {
      setIsLoading(false)
    }
    if (session.status === 'unauthenticated') {
      router.push('/login')
    }
  }, [session.status, router])

  const checkUserSetup = async () => {
    if (session.data?.user?.id) {
      try {
        const userDoc = await getDoc(doc(db, 'users', session.data.user.id))
        if (userDoc.exists() && userDoc.data().setupComplete) {
          router.push('/profile')
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error checking user setup:", error)
        setIsLoading(false)
      }
    }
  }

  const updateProgress = () => {
    let progress = 0
    if (bio) progress += 50
    if (codingInterests) progress += 50
    setSetupProgress(progress)
  }

  const handleContinueToProfile = async () => {
    if (session.data?.user?.id) {
      try {
        await setDoc(doc(db, 'users', session.data.user.id), {
          bio,
          codingInterests,
          setupComplete: true,
        }, { merge: true })
        router.push('/profile')
      } catch (error) {
        console.error("Error updating user setup:", error)
      }
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen bg-gray-900 text-green-400">Loading...</div>
  }

  if (!session.data) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Set Up Your Profile</h1>
      
      {session.data.user?.image && (
        <Image
          src={session.data.user.image}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
      )}
      <p className="mb-4">Welcome, {session.data.user?.name || session.data.user?.username || 'User'}!</p>
      
      <div className="w-full max-w-md space-y-6">
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us about yourself..." 
            value={bio} 
            onChange={(e) => { setBio(e.target.value); updateProgress(); }}
          />
        </div>
        
        <div>
          <Label htmlFor="codingInterests">Coding Interests</Label>
          <Input 
            id="codingInterests" 
            placeholder="e.g., React, Python, Machine Learning" 
            value={codingInterests} 
            onChange={(e) => { setCodingInterests(e.target.value); updateProgress(); }}
          />
        </div>
        
        <div>
          <Label>Profile Completion</Label>
          <Progress value={setupProgress} className="mt-2" />
        </div>

        <Button 
          className="w-full mt-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-all duration-200 ease-in-out"
          onClick={handleContinueToProfile}
          disabled={setupProgress < 100}
        >
          Continue to Profile
        </Button>
      </div>
    </div>
  )
}