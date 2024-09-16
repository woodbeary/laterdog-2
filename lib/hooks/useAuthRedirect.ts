import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuthRedirect(redirectTo: string = '/login') {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(redirectTo)
    } else if (status === 'loading') {
      setTimeout(() => {
        if (status === 'loading') {
          router.push(redirectTo)
        }
      }, 3000)
    }
  }, [status, router, redirectTo])

  return { session, status }
}