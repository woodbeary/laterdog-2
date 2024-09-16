'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const announcements = [
  "GitHub-Powered Dating",
  "AI Wingman: Grok 2.0",
  "Code, Swipe, Connect",
  "Where Commits Lead to Dates",
  "Debug Your Love Life with later.dog"
]

export default function AnnouncementPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length)
    }, 2000) // Change announcement every 2 seconds for faster pacing

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }} // Faster transition for snappier feel
          className="text-green-400 font-mono text-5xl text-center max-w-4xl px-4 font-bold"
        >
          {announcements[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}