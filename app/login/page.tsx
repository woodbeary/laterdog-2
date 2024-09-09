'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const [showNormieQuestion, setShowNormieQuestion] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = ['/images/image1.jpg', '/images/image2.jpg']

  const handleNormieAnswer = (answer: boolean) => {
    if (answer) {
      setShowNormieQuestion(false)
    } else {
      router.push('/not-for-you')
    }
  }

  const handleXLogin = () => {
    router.push('/profile-setup')
  }

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    const intervalId = setInterval(nextImage, 5000) // Change image every 5 seconds
    return () => clearInterval(intervalId)
  }, [nextImage])

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-300">Welcome to later.dog</h1>
      
      {showNormieQuestion ? (
        <div className="text-center w-full max-w-xs">
          <p className="mb-6 text-lg">Are you a developer or actively learning to code?</p>
          <div className="space-y-4">
            <Button 
              onClick={() => handleNormieAnswer(true)}
              className="w-full py-4 text-lg bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-200 ease-in-out"
            >
              Yes
            </Button>
            <Button 
              onClick={() => handleNormieAnswer(false)}
              className="w-full py-4 text-lg bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full shadow-md transition-all duration-200 ease-in-out"
            >
              No
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          className="w-full max-w-xs py-4 text-lg bg-black hover:bg-gray-900 text-white rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center"
          onClick={handleXLogin}
        >
          <Image src="/images/logo-white.png" alt="X logo" width={24} height={24} className="mr-2" />
          Continue with X
        </Button>
      )}

      {/* Image carousel */}
      <div className="mt-8 w-full max-w-md">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Feature ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className={`absolute top-0 left-0 transition-opacity duration-500 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}