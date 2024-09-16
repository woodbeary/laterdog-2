"use client";

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ChevronLeft } from "lucide-react"

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4 sm:p-8">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft size={16} className="mr-2" /> Back to Home
        </Button>
      </Link>
      
      <h1 className="text-3xl font-bold mb-8 text-green-300">Changelog</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-300">v0.2.0 - Exciting New Features!</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Introduced a sleek, Fallout-inspired UI for an immersive experience</li>
            <li>Added GitHub contribution graph to user profiles</li>
            <li>Implemented Grok's witty roasts for each developer</li>
            <li>Enhanced matching algorithm based on coding preferences</li>
            <li>Improved swipe functionality with smooth animations</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-300">v0.1.5 - Performance Boost</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Optimized app performance for faster load times</li>
            <li>Fixed various bugs reported by our awesome community</li>
            <li>Added more programming languages to user preferences</li>
          </ul>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2 text-green-300">v0.1.0 - Initial Release</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Launched later.dog with core matching functionality</li>
            <li>Integrated with GitHub API for developer profiles</li>
            <li>Implemented basic swipe mechanics</li>
            <li>Added user authentication via X (Twitter)</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-green-300">Exciting updates coming soon!</p>
        <p className="text-sm mt-2">Have feedback? Let us know on <a href="https://twitter.com/laterdogX" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">X</a>!</p>
      </div>
    </div>
  )
}