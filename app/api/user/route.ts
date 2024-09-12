import { NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { getServerSession } from 'next-auth/next'
import { authOptions } from "../auth/[...nextauth]/authOptions"
import { UserProfile } from '@/types/user'

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const data: Partial<UserProfile> = await request.json()
  
  try {
    await setDoc(doc(db, 'users', session.user.id), data, { merge: true })
    return NextResponse.json({ message: 'User data saved successfully' })
  } catch (error) {
    console.error('Error saving user data:', error)
    return NextResponse.json({ error: 'Failed to save user data' }, { status: 500 })
  }
}