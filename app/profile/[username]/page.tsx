'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useTheme } from '@/contexts/ThemeContext'

// This is a placeholder for the user data. In a real app, you'd fetch this from your API.
const getUserData = (username: string) => {
  // Mock data - replace with actual API call
  return {
    name: 'John Doe',
    username: username,
    image: 'https://github.com/github.png',
    bio: 'Full-stack developer passionate about React and Node.js.',
    githubData: {
      public_repos: 30,
      followers: 100,
      following: 50,
      total_commits: 1500,
      top_language: "JavaScript",
      account_age: 3
    }
  }
}

export default function UserProfilePage() {
  const params = useParams()
  const username = params.username as string
  const [userData, setUserData] = useState<any>(null)
  const { isLightMode } = useTheme()

  useEffect(() => {
    const data = getUserData(username)
    setUserData(data)
  }, [username])

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-green-400'} font-mono p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <img src={userData.image} alt={userData.name} className="w-32 h-32 rounded-full mb-4" />
          <h1 className="text-2xl font-bold text-green-300">{userData.name}</h1>
          <p className="text-green-400">@{userData.username}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl mb-2 text-green-300">Bio</h2>
          <p>{userData.bio}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
            <h3 className="text-lg mb-2 text-green-300">GitHub Stats</h3>
            <p>Repos: {userData.githubData.public_repos}</p>
            <p>Followers: {userData.githubData.followers}</p>
            <p>Following: {userData.githubData.following}</p>
          </div>
          <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800'}`}>
            <h3 className="text-lg mb-2 text-green-300">Coding Info</h3>
            <p>Total Commits: {userData.githubData.total_commits}</p>
            <p>Top Language: {userData.githubData.top_language}</p>
            <p>Account Age: {userData.githubData.account_age} years</p>
          </div>
        </div>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
          Message
        </Button>
      </div>
    </div>
  )
}