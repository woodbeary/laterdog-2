import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

export function useCanSwipe() {
  const { data: session } = useSession()
  const [canSwipe, setCanSwipe] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkSwipeEligibility() {
      if (session?.user?.id) {
        try {
          const userDoc = await getDoc(doc(db, 'users', session.user.id))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            setCanSwipe(userData.setupComplete && userData.githubLinked && userData.totalCommits > 0)
          }
        } catch (error) {
          console.error("Error checking swipe eligibility:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    checkSwipeEligibility()
  }, [session])

  return { canSwipe, isLoading }
}