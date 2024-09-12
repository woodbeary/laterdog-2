'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Github, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { DeleteAccountModal } from '../components/DeleteAccountModal'

export default function ProfileSetupPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [setupProgress, setSetupProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('setupProgress') || '{}');
    }
    return {};
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated' && session.user) {
      checkUserSetup()
    }
  }, [status, session, router])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('setupProgress', JSON.stringify(setupProgress));
    }
  }, [setupProgress]);

  const checkUserSetup = async () => {
    if (session?.user?.id) {
      try {
        const userDoc = await getDoc(doc(db, 'users', session.user.id))
        if (!userDoc.exists()) {
          // User doesn't exist in Firestore, create the document
          const userData = {
            name: session.user.name || '',
            image: session.user.image || '',
            username: session.user.username || '',
            twitterUsername: session.user.twitterUsername || '',
            twitterId: session.user.twitterId || '',
            provider: 'twitter',
            setupComplete: false,
            githubLinked: false,
            email: session.user.email || '',
          };
          await setDoc(doc(db, 'users', session.user.id), userData)
          console.log("Created new user document in Firestore")
        } else if (userDoc.data()?.setupComplete) {
          router.push('/profile')
          return
        } else {
          console.log("User document exists but setup is not complete")
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Error checking user setup:", error)
        setIsLoading(false)
      }
    }
  }

  const handleGitHubLink = () => {
    signIn('github', { callbackUrl: '/profile-setup' })
  }

  const handleContinueToProfile = async () => {
    if (session?.user?.id) {
      try {
        await setDoc(doc(db, 'users', session.user.id), {
          setupComplete: true,
          githubLinked: !!session.user.githubUsername
        }, { merge: true })
        console.log("Updated user document in Firestore")
        router.push('/profile')
      } catch (error) {
        console.error("Error updating user setup:", error)
      }
    }
  }

  const handleDeleteAccount = async () => {
    if (session?.user?.id) {
      try {
        // Delete user document from Firestore
        await deleteDoc(doc(db, 'users', session.user.id))
        console.log("Deleted user document from Firestore")
        
        // Clear local storage
        localStorage.removeItem('setupProgress')
        
        // Sign out the user
        await signOut({ callbackUrl: '/login' })
      } catch (error) {
        console.error("Error deleting user account:", error)
      }
    }
  }

  const handleDownloadData = async () => {
    if (session?.user?.id) {
      try {
        const userDoc = await getDoc(doc(db, 'users', session.user.id))
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Only include name and usernames
          const downloadableData = {
            name: userData.name,
            twitterUsername: userData.twitterUsername,
            githubUsername: userData.githubUsername,
          };
          
          const dataStr = JSON.stringify(downloadableData, null, 2);
          const dataBlob = new Blob([dataStr], { type: 'application/json' });
          const url = URL.createObjectURL(dataBlob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'my_laterdog_data.json';
          link.click();
          URL.revokeObjectURL(url);
        }
      } catch (error) {
        console.error("Error downloading user data:", error)
      }
    }
  }

  const getProfileImage = () => {
    if (!imageError && session?.user?.image) return session.user.image
    if (!imageError && session?.user?.githubImage) return session.user.githubImage
    return '/default-avatar.png'
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Set Up Your Profile</h1>
      
      <div className="w-full max-w-md space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <Image 
            src={getProfileImage()} 
            alt="Profile" 
            width={128} 
            height={128} 
            className="rounded-full mx-auto mb-4"
            onError={() => setImageError(true)}
          />
          <p className="mb-4">Welcome, {session.user.name || session.user.username || 'User'}!</p>
          {!session.user.githubUsername ? (
            <Button 
              className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center"
              onClick={handleGitHubLink}
            >
              <Github className="mr-2" />
              Link GitHub Account
            </Button>
          ) : (
            <Button 
              className="w-full mt-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-md transition-all duration-200 ease-in-out"
              onClick={handleContinueToProfile}
            >
              Continue to Profile
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 flex space-x-4">
        <Button 
          className="bg-red-600 hover:bg-red-700"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
        <Button 
          className="bg-gray-600 hover:bg-gray-700 flex items-center"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </div>

      <DeleteAccountModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        onDownloadData={handleDownloadData}
      />
    </div>
  )
}