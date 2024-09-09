'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Image, X, MapPin, Calendar } from "lucide-react"
import { useRouter } from 'next/navigation'

// Dummy user data (simulating data from X)
const dummyUser = {
  name: "John Doe",
  username: "johndoe",
  image: "https://picsum.photos/200",
  location: "",
  age: null as number | null
}

export default function ProfileSetupPage() {
  const [step, setStep] = useState(1)
  const [isGithubLinked, setIsGithubLinked] = useState(false)
  const [selectedProfilePic, setSelectedProfilePic] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState(dummyUser.location)
  const [age, setAge] = useState<number | null>(dummyUser.age)
  const router = useRouter()

  const handleGithubConnect = async () => {
    // Simulate GitHub connection
    setIsGithubLinked(true)
    setStep(2)
  }

  const handleProfilePicSelect = (pic: string) => {
    setSelectedProfilePic(pic)
    setStep(3)
  }

  const handleBioSubmit = () => {
    // Here you would typically save the bio to your backend
    setStep(4)
  }

  const handleFinalSubmit = () => {
    // Here you would save all the profile data
    router.push('/profile')
  }

  const formatName = (name: string) => {
    const names = name.split(' ')
    return names[0] + ' ' + names[names.length - 1][0] + '.'
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4 flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6 text-green-300">Set Up Your Profile</h1>
      
      {/* Display user info from X */}
      <div className="mb-6 text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-2 bg-gray-700 flex items-center justify-center">
          <Image className="w-12 h-12 text-gray-500" />
        </div>
        <h2 className="text-xl font-bold">{formatName(dummyUser.name)}</h2>
        <p className="text-green-400">@{dummyUser.username}</p>
      </div>

      {step === 1 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4 border border-green-500">
            <h3 className="text-xl font-bold mb-4 text-center text-green-300">Link Your GitHub Account</h3>
            <p className="mb-4 text-center">To continue setting up your profile, please link your GitHub account.</p>
            <Button 
              className="w-full bg-gray-600 hover:bg-gray-500 text-white"
              onClick={handleGithubConnect}
            >
              <Github className="mr-2 h-4 w-4" /> Connect GitHub
            </Button>
          </div>
        </div>
      )}

      {isGithubLinked && step === 2 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-center text-green-300">Choose Your Profile Picture</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mb-2 bg-gray-700 flex items-center justify-center mx-auto">
                <X className="w-16 h-16 text-gray-500" />
              </div>
              <Button
                className={`w-full ${selectedProfilePic === 'x' ? 'bg-blue-600' : 'bg-gray-600'}`}
                onClick={() => handleProfilePicSelect('x')}
              >
                X Profile Pic
              </Button>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mb-2 bg-gray-700 flex items-center justify-center mx-auto">
                <Github className="w-16 h-16 text-gray-500" />
              </div>
              <Button
                className={`w-full ${selectedProfilePic === 'github' ? 'bg-gray-600' : 'bg-gray-700'}`}
                onClick={() => handleProfilePicSelect('github')}
              >
                GitHub Profile Pic
              </Button>
            </div>
          </div>
        </div>
      )}

      {isGithubLinked && step === 3 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-center text-green-300">Add Your Bio</h3>
          <textarea
            className="w-full p-2 bg-gray-800 text-green-400 rounded mb-4 border border-green-500"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={handleBioSubmit}
          >
            Continue
          </Button>
        </div>
      )}

      {isGithubLinked && step === 4 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4 text-center text-green-300">Additional Information</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                className="flex-grow bg-gray-800 text-green-400 border-green-500"
              />
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2" />
              <Input
                type="number"
                placeholder="Age"
                value={age || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAge(Number(e.target.value) || null)}
                className="flex-grow bg-gray-800 text-green-400 border-green-500"
              />
            </div>
          </div>
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white mt-4"
            onClick={handleFinalSubmit}
          >
            Complete Profile
          </Button>
        </div>
      )}

      {/* Progress indicator */}
      <div className="mt-auto pt-8 flex justify-center">
        <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-green-500' : 'bg-gray-600'} mx-1`}></div>
        <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-600'} mx-1`}></div>
        <div className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-green-500' : 'bg-gray-600'} mx-1`}></div>
        <div className={`w-3 h-3 rounded-full ${step >= 4 ? 'bg-green-500' : 'bg-gray-600'} mx-1`}></div>
      </div>
    </div>
  )
}