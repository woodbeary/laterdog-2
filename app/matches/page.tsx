'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { X, MessageCircle } from "lucide-react"
import { useTheme } from '@/contexts/ThemeContext'

// Mock data for matches
const mockMatches = [
  { id: '1', name: 'Alice Developer', username: 'alicedev', image: 'https://picsum.photos/200/300?random=1' },
  { id: '2', name: 'Bob Coder', username: 'bobcodes', image: 'https://picsum.photos/200/300?random=2' },
  { id: '3', name: 'Carol Programmer', username: 'carolprog', image: 'https://picsum.photos/200/300?random=3' },
]

export default function MatchesPage() {
  const { data: session } = useSession()
  const { isLightMode } = useTheme()
  const [matches, setMatches] = useState(mockMatches)

  const handleUnmatch = (id: string) => {
    setMatches(matches.filter(match => match.id !== id))
    // In a real app, you'd also update this on the backend
  }

  const handleMessage = (username: string) => {
    window.open(`https://twitter.com/messages/compose?recipient_id=${username}`, '_blank')
  }

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-green-400'} font-mono p-4`}>
      <h1 className="text-2xl font-bold mb-6">Your Matches</h1>
      <div className="space-y-4">
        {matches.map(match => (
          <div key={match.id} className={`flex items-center justify-between p-4 ${isLightMode ? 'bg-white' : 'bg-gray-800'} rounded-lg`}>
            <div className="flex items-center">
              <img src={match.image} alt={match.name} className="w-12 h-12 rounded-full mr-4" />
              <div>
                <h2 className="font-bold">{match.name}</h2>
                <p className="text-sm">@{match.username}</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleMessage(match.username)}>
                <MessageCircle className="w-4 h-4 mr-2" /> Message
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleUnmatch(match.id)}>
                <X className="w-4 h-4 mr-2" /> Unmatch
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}