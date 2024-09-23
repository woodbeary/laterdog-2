'use client'

import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import { Github } from 'lucide-react'

export default function ProfileSetupPage() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [bio, setBio] = useState('')
  const [codingInterests, setCodingInterests] = useState('')
  const [setupProgress, setSetupProgress] = useState(0)
  const [isGithubLinked, setIsGithubLinked] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session?.user?.id) {
      checkUserSetup()
    }
  }, [status, session, router])

  const checkUserSetup = async () => {
    if (session?.user?.id) {
      try {
        const userDoc = await getDoc(doc(db, 'users', session.user.id))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setBio(userData.bio || '')
          setCodingInterests(userData.codingInterests || '')
          setIsGithubLinked(userData.githubLinked || false)
          updateProgress(userData.bio, userData.codingInterests, userData.githubLinked)
        }
      } catch (error) {
        console.error("Error checking user setup:", error)
        setError("An error occurred while fetching user data.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleLinkGithub = async () => {
    try {
      const result = await signIn('github', { 
        redirect: false, 
        callbackUrl: '/profile-setup',
      });
      if (result?.error) {
        console.error("Failed to link GitHub account", result.error);
        setError("Failed to link GitHub account. Please ensure you're logged in with Twitter first.");
      } else {
        console.log("GitHub linked successfully");
        await update(); // Update the session
        await checkUserSetup();
      }
    } catch (error) {
      console.error("Error during GitHub linking:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  }

  const updateProgress = (bio: string, interests: string, githubLinked: boolean) => {
    let progress = 0;
    if (bio) progress += 33;
    if (interests) progress += 33;
    if (githubLinked) progress += 34;
    setSetupProgress(progress);
  }

  const handleContinueToProfile = async () => {
    if (session?.user?.id) {
      try {
        await updateDoc(doc(db, 'users', session.user.id), {
          bio,
          codingInterests,
          setupComplete: true,
        });
        router.push('/profile');
      } catch (error) {
        console.error("Error updating user profile:", error);
        setError("Failed to update profile. Please try again.");
      }
    }
  }

  if (status === 'loading' || isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!session || !session.user) {
    return <div>No session or user data available. Please try logging in again.</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Set Up Your Profile</h1>
      
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full mx-auto mb-4"
        />
      )}
      <p className="mb-4">Welcome, {session?.user?.name || 'User'}!</p>
      
      <div className="w-full max-w-md space-y-6">
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea 
            id="bio" 
            placeholder="Tell us about yourself..." 
            value={bio} 
            onChange={(e) => { setBio(e.target.value); updateProgress(e.target.value, codingInterests, isGithubLinked); }}
          />
        </div>
        
        <div>
          <Label htmlFor="codingInterests">Coding Interests</Label>
          <Input 
            id="codingInterests" 
            placeholder="e.g., React, Python, Machine Learning" 
            value={codingInterests} 
            onChange={(e) => { setCodingInterests(e.target.value); updateProgress(bio, e.target.value, isGithubLinked); }}
          />
        </div>
        
        <div>
          <Button 
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center"
            onClick={handleLinkGithub}
            disabled={isGithubLinked}
          >
            <Github className="mr-2" />
            {isGithubLinked ? 'GitHub Linked' : 'Link GitHub Account'}
          </Button>
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