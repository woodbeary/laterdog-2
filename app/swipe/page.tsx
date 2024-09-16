'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { X, Heart, Code, Users, GitFork, ChevronLeft, ChevronRight, Info, Flag, Calendar, Globe, Zap, MessageCircle, Menu, Settings, GitPullRequest, AlertCircle } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useTheme } from '@/contexts/ThemeContext'
import confetti from 'canvas-confetti'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import GithubContributionGraph from '@/components/GithubContributionGraph'
import Link from 'next/link'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import SettingsPage from '@/components/SettingsPage'
import { useRouter } from 'next/navigation'
import { MatchData, mockMatches } from '@/lib/mockData'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateWingmanMessage } from '@/lib/messageGenerator'
import { useLocalStorage } from '@/hooks/useLocalStorage'

const isDevelopment = process.env.NODE_ENV === 'development'

const generateMatchRoast = (user2: string) => {
  const roasts = [
    `You and ${user2} are 85% compatible because you both spent too much time fixing merge conflicts!`,
    `It's a match made in Stack Overflow! You and ${user2} have a 92% chance of debugging each other's code.`,
    `You and ${user2} are 78% likely to argue about tabs vs. spaces. Let the coding battles begin!`,
    `A perfect pair! You and ${user2} have a 95% chance of staying up all night to squash that one last bug.`,
    `You and ${user2} are 88% compatible. You both think sleep is for the weak and coffee is a food group.`
  ]
  return roasts[Math.floor(Math.random() * roasts.length)]
}

export default function SwipePage() {
  const { data: session, status } = useSession()
  const [currentProfile, setCurrentProfile] = useState(mockMatches[0])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const controls = useAnimation()
  const constraintsRef = useRef(null)
  const [showBio, setShowBio] = useState(false)
  const { isLightMode } = useTheme()
  const [isMatched, setIsMatched] = useState(false)
  const [matchRoast, setMatchRoast] = useState('')
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const router = useRouter()
  const [isPullRequestModalOpen, setIsPullRequestModalOpen] = useState(false)
  const [isPullRequestSending, setIsPullRequestSending] = useState(false)
  const [pullRequestMessage, setPullRequestMessage] = useState('')
  const [currentUser, setCurrentUser] = useState<MatchData>({
    ...mockMatches[0],
    profile: {
      ...mockMatches[0].profile,
      bio: ''
    }
  })
  const [pullRequestFeedback, setPullRequestFeedback] = useState<{ type: 'success' | 'info', message: string } | null>(null)
  const [remainingPullRequests, setRemainingPullRequests] = useState(5)
  const [pullRequestSent, setPullRequestSent] = useState(false)
  const [swipesRemaining, setSwipesRemaining] = useLocalStorage('swipesRemaining', 20)
  const [lastSwipeTime, setLastSwipeTime] = useLocalStorage<string | null>('lastSwipeTime', null)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [timeUntilReset, setTimeUntilReset] = useState<string | null>(null)
  const [allProfilesSwiped, setAllProfilesSwiped] = useState(false)

  useEffect(() => {
    console.log('SwipePage - Session status:', status)
    console.log('SwipePage - Session data:', session)
  }, [session, status])

  useEffect(() => {
    const now = new Date()
    const lastSwipe = lastSwipeTime ? new Date(lastSwipeTime) : null
    if (lastSwipe && now.getTime() - lastSwipe.getTime() >= 12 * 60 * 60 * 1000) {
      setSwipesRemaining(20)
      setLastSwipeTime(null)
    }
    setIsLimitReached(swipesRemaining <= 0)
  }, [swipesRemaining, lastSwipeTime])

  const calculateTimeUntilReset = useCallback(() => {
    if (!lastSwipeTime) return null
    const now = new Date()
    const lastSwipe = new Date(lastSwipeTime)
    const resetTime = new Date(lastSwipe.getTime() + 12 * 60 * 60 * 1000)
    const diff = resetTime.getTime() - now.getTime()
    
    if (diff <= 0) return null

    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }, [lastSwipeTime])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilReset(calculateTimeUntilReset())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [calculateTimeUntilReset])

  useEffect(() => {
    setTimeUntilReset(calculateTimeUntilReset())
  }, [lastSwipeTime, calculateTimeUntilReset])

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (swipesRemaining <= 0) {
      setIsLimitReached(true)
      return
    }

    const xMove = direction === 'left' ? -500 : 500;
    const rotation = direction === 'left' ? -15 : 15;
    
    await controls.start({ 
      x: xMove, 
      opacity: 0, 
      rotate: rotation,
      transition: { duration: 0.3 }
    });
    
    const currentIndex = mockMatches.findIndex(profile => profile.id === currentProfile.id);
    const nextIndex = (currentIndex + 1) % mockMatches.length;
    if (nextIndex === 0) {
      setAllProfilesSwiped(true)
    } else {
      setCurrentProfile(mockMatches[nextIndex])
    }
    setCurrentPhotoIndex(0);
    
    controls.set({ x: 0, opacity: 1, rotate: 0 });

    // Add a flash effect
    const flashColor = direction === 'left' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)';
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.right = '0';
    flash.style.bottom = '0';
    flash.style.backgroundColor = flashColor;
    flash.style.zIndex = '9999';
    flash.style.opacity = '0';
    flash.style.transition = 'opacity 0.3s ease-out';
    document.body.appendChild(flash);
    
    setTimeout(() => {
      flash.style.opacity = '1';
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(flash);
        }, 300);
      }, 100);
    }, 0);

    if (direction === 'right') {
      // Simulate a match with 50% probability
      if (Math.random() > 0.5) {
        setIsMatched(true)
        setMatchRoast(generateMatchRoast(currentProfile.name))
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }

    setSwipesRemaining(prev => prev - 1)
    setLastSwipeTime(new Date().toISOString())
  };

  const handleDrag = (event: any, info: any) => {
    if (info.offset.x < -50) {
      setSwipeDirection('left')
    } else if (info.offset.x > 50) {
      setSwipeDirection('right')
    } else {
      setSwipeDirection(null)
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x < -100) {
      handleSwipe('left')
    } else if (info.offset.x > 100) {
      handleSwipe('right')
    } else {
      controls.start({ x: 0, opacity: 1 })
    }
    setSwipeDirection(null)
  }

  const handlePhotoClick = () => {
    setCurrentPhotoIndex((currentPhotoIndex + 1) % currentProfile.photos.length)
  }

  const toggleBio = () => {
    setShowBio(!showBio)
  }

  const maskUsername = (username: string) => {
    return '*'.repeat(username.length);
  };

  const handleReport = () => {
    if (!reportReason) {
      alert("Please select a reason for reporting.")
      return
    }
    console.log('Reporting profile:', currentProfile.id, 'Reason:', reportReason)
    setIsReportDialogOpen(false)
    setReportReason('')
  }

  const renderBadges = (badges: string[]) => {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {badges.map((badge) => (
          <Badge key={badge} variant="secondary" className="text-xs">
            {badge === '30-day-streak' && <Zap className="w-3 h-3 mr-1" />}
            {badge === 'open-source-contributor' && <Globe className="w-3 h-3 mr-1" />}
            {badge === 'frequent-committer' && <Calendar className="w-3 h-3 mr-1" />}
            {badge.replace(/-/g, ' ')}
          </Badge>
        ))}
      </div>
    )
  }

  const handleContactMatch = () => {
    const twitterHandle = currentProfile.username
    window.open(`https://twitter.com/messages/compose?recipient_id=${twitterHandle}`, '_blank')
  }

  const handleContinueSwiping = () => {
    setIsMatched(false)
    setMatchRoast('')
    // Move to the next profile
    const currentIndex = mockMatches.findIndex(profile => profile.id === currentProfile.id)
    const nextIndex = (currentIndex + 1) % mockMatches.length
    setCurrentProfile(mockMatches[nextIndex])
    setCurrentPhotoIndex(0)
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handlePullRequest = () => {
    if (remainingPullRequests > 0) {
      setIsPullRequestModalOpen(true)
    }
  }

  const sendPullRequest = () => {
    setIsPullRequestSending(true)
    setPullRequestFeedback({ type: 'info', message: 'Generating pull request message...' })
    // Simulate API call and message generation
    setTimeout(() => {
      const message = generateWingmanMessage(currentProfile as MatchData, currentUser as MatchData)
      typeMessage(message)
      setPullRequestFeedback(null)
    }, 1000)
  }

  const typeMessage = (message: string) => {
    let i = 0
    const interval = setInterval(() => {
      setPullRequestMessage(message.substring(0, i))
      i++
      if (i > message.length) {
        clearInterval(interval)
        setIsPullRequestSending(false)
      }
    }, 20) // Faster typing speed
  }

  const handleSendPullRequest = () => {
    console.log('Pull request sent:', pullRequestMessage)
    setPullRequestFeedback({ type: 'success', message: 'Pull request sent successfully!' })
    setRemainingPullRequests(prev => prev - 1)
    setPullRequestSent(true)
    setTimeout(() => {
      setIsPullRequestModalOpen(false)
      setPullRequestMessage('')
      setPullRequestFeedback(null)
      setPullRequestSent(false)
    }, 2000)
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className={`flex flex-col min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-green-400'} font-mono p-4`} ref={constraintsRef}>
      {isLimitReached ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-6 rounded-lg max-w-md w-full mx-4 border border-green-500`}>
            <h2 className="text-2xl font-bold text-center text-green-300 mb-4">Swipe Limit Reached</h2>
            <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>
              To ensure that developers have a good experience on this platform, you are limited to sending 20 invites per week. Community trust is very important to us.
            </p>
            {timeUntilReset && (
              <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'} font-bold`}>
                Time until reset: {timeUntilReset}
              </p>
            )}
            <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>
              If anyone harasses you, uses the matching platform to sell services or do anything other than find a partner, or contacts you without consent outside of later.dog please report it to us.
            </p>
            <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>
              We're always trying to improve your experience. If you have any feedback, let us know!
            </p>
            <div className="text-center">
              <Button 
                className="mt-4"
                onClick={() => router.push('/profile')}
              >
                Return to Profile
              </Button>
            </div>
          </div>
        </div>
      ) : allProfilesSwiped ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-6 rounded-lg max-w-md w-full mx-4 border border-green-500`}>
            <h2 className="text-2xl font-bold text-center text-green-300 mb-4">No More Profiles</h2>
            <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>
              You've swiped through all available profiles. Check back later for new matches!
            </p>
            <div className="text-center">
              <Button 
                className="mt-4"
                onClick={() => router.push('/profile')}
              >
                Return to Profile
              </Button>
            </div>
          </div>
        </div>
      ) : isMatched ? (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-6 rounded-lg max-w-sm w-full mx-4 border border-green-500`}>
            <h2 className="text-2xl font-bold text-center text-green-300 mb-4">It's a Match!</h2>
            <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
              <img 
                src={currentProfile.photos[0]} 
                alt={currentProfile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <p className={`text-center mb-2 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>@{currentProfile.username}</p>
            <p className={`text-center mb-4 ${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>{matchRoast}</p>
            <div className="space-y-2">
              <Button className="w-full" onClick={handleContactMatch}>
                <MessageCircle className="mr-2 h-4 w-4" /> Contact
              </Button>
              <Button className="w-full" variant="outline" onClick={handleContinueSwiping}>
                Continue Swiping
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Navigation and action buttons */}
          <div className="flex justify-between items-center mb-4 z-10">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/profile')}
              className="text-green-400 hover:text-green-300"
            >
              <ChevronLeft size={24} />
            </Button>
            <Button 
              variant="ghost"
              onClick={() => setIsReportDialogOpen(true)}
              className="text-red-500 hover:text-red-400"
            >
              <Flag size={20} />
            </Button>
          </div>

          <motion.div 
            className="flex-1 flex flex-col relative mb-6"
            drag="x"
            dragConstraints={constraintsRef}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
            whileTap={{ scale: 0.95 }}
          >
            {/* Profile image and info */}
            <div className="relative mb-4 aspect-square">
              <img 
                src={currentProfile.photos[currentPhotoIndex]} 
                alt={`${currentProfile.name}'s photo`} 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-${isLightMode ? 'gray-100' : 'gray-900'} to-transparent p-4`}>
                <h2 className="text-xl font-bold text-white">{currentProfile.name}</h2>
                <p className={`text-sm ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>@{maskUsername(currentProfile.username)}</p>
                <p className={`text-xs italic ${isLightMode ? 'text-gray-700' : 'text-green-300'} mt-1`}>{currentProfile.grokRoast}</p>
                {renderBadges(currentProfile.badges)}
              </div>
            </div>

            {/* GitHub contribution graph */}
            <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-3 rounded mb-4`}>
              <h2 className="text-lg mb-2">Contribution Graph</h2>
              <GithubContributionGraph />
            </div>

            {/* Grok's Detailed Roast section */}
            <div className={`bg-${isLightMode ? 'gray-200' : 'gray-800'} p-3 rounded mb-4`}>
              <h3 className="text-lg mb-2 flex items-center">
                <Zap className="mr-2" size={18} />
                Grok's Roast
              </h3>
              <p className={`text-sm italic ${isLightMode ? 'text-gray-700' : 'text-green-300'}`}>
                "{currentProfile.grokDetailedRoast}"
              </p>
            </div>

            {showBio && (
              <div className={`bg-${isLightMode ? 'gray-200' : 'gray-800'} p-3 rounded mb-4`}>
                <h3 className="text-lg mb-2">Bio</h3>
                <p className={`text-sm ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>{currentProfile.profile.bio}</p>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className={`flex flex-col items-center p-2 bg-${isLightMode ? 'gray-200' : 'gray-800'} rounded`}>
                <Code className="mb-1" size={16} />
                <p className={`text-xs ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>Repos</p>
                <p className={`text-sm font-bold ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>{currentProfile.githubData.public_repos}</p>
              </div>
              <div className={`flex flex-col items-center p-2 bg-${isLightMode ? 'gray-200' : 'gray-800'} rounded`}>
                <Users className="mb-1" size={16} />
                <p className={`text-xs ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>Followers</p>
                <p className={`text-sm font-bold ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>{currentProfile.githubData.followers}</p>
              </div>
              <div className={`flex flex-col items-center p-2 bg-${isLightMode ? 'gray-200' : 'gray-800'} rounded`}>
                <GitFork className="mb-1" size={16} />
                <p className={`text-xs ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>Following</p>
                <p className={`text-sm font-bold ${isLightMode ? 'text-gray-900' : 'text-green-400'}`}>{currentProfile.githubData.following}</p>
              </div>
            </div>

            {currentProfile.photos.length > 1 && (
              <div className="mb-4">
                <h3 className="text-lg mb-2">More Photos</h3>
                <div className="flex overflow-x-auto space-x-2">
                  {currentProfile.photos.map((photo, index) => (
                    <img 
                      key={index}
                      src={photo}
                      alt={`${currentProfile.name}'s photo ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      onClick={() => setCurrentPhotoIndex(index)}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Action buttons */}
      <div className="flex justify-center items-center space-x-6 mt-4 pb-4">
        <Button 
          className={`w-16 h-16 rounded-full ${isLightMode ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-600 text-white hover:bg-red-700'} transition-transform transform hover:scale-110 shadow-lg ${swipesRemaining <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleSwipe('left')}
          disabled={swipesRemaining <= 0}
        >
          <X size={28} />
        </Button>
        <div className="relative">
          <Button 
            className={`w-20 h-20 rounded-full ${isLightMode ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition-transform transform hover:scale-110 shadow-lg ${remainingPullRequests === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handlePullRequest}
            disabled={remainingPullRequests === 0}
          >
            <GitPullRequest size={32} />
          </Button>
          <Badge 
            className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
            variant="secondary"
          >
            {remainingPullRequests}
          </Badge>
        </div>
        <Button 
          className={`w-16 h-16 rounded-full ${isLightMode ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-green-600 hover:bg-green-700 text-white'} transition-transform transform hover:scale-110 shadow-lg ${swipesRemaining <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => handleSwipe('right')}
          disabled={swipesRemaining <= 0}
        >
          <Heart size={28} />
        </Button>
      </div>

      {/* Pull Request Modal */}
      <Dialog open={isPullRequestModalOpen} onOpenChange={setIsPullRequestModalOpen}>
        <DialogContent className={`${isLightMode ? 'bg-white text-gray-900' : 'bg-gray-800 text-green-400'} border-2 border-green-500 max-h-[80vh] overflow-hidden flex flex-col`}>
          <DialogHeader>
            <DialogTitle className={`${isLightMode ? 'text-gray-900' : 'text-green-300'}`}>Send a Pull Request</DialogTitle>
            <DialogDescription className={`${isLightMode ? 'text-gray-700' : 'text-green-400'}`}>
              Increase your chances of matching by sending a personalized message to {currentProfile.name}. Our AI wingman will craft the perfect message to catch their attention!
            </DialogDescription>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto">
            {pullRequestFeedback && (
              <Alert variant={pullRequestFeedback.type === 'success' ? 'default' : 'destructive'}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{pullRequestFeedback.type === 'success' ? 'Success' : 'Info'}</AlertTitle>
                <AlertDescription>{pullRequestFeedback.message}</AlertDescription>
              </Alert>
            )}
            {!isPullRequestSending && !pullRequestMessage && !pullRequestSent && (
              <div className="flex justify-center space-x-4 mt-6">
                <Button 
                  onClick={() => setIsPullRequestModalOpen(false)}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={sendPullRequest}
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Generate Pull Request
                </Button>
              </div>
            )}
            {isPullRequestSending && (
              <div className="text-center mt-6">
                <p>Generating message...</p>
              </div>
            )}
            {pullRequestMessage && !pullRequestSent && (
              <div>
                <p className={`mb-4 ${isLightMode ? 'text-gray-800' : 'text-green-300'} whitespace-pre-wrap`}>{pullRequestMessage}</p>
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={handleSendPullRequest} 
                    disabled={isPullRequestSending}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all duration-200 ease-in-out transform hover:scale-105"
                  >
                    Send Pull Request
                  </Button>
                </div>
              </div>
            )}
            {pullRequestSent && (
              <div className="text-center mt-6">
                <p className={`text-lg font-bold ${isLightMode ? 'text-green-600' : 'text-green-400'}`}>Pull Request Sent Successfully!</p>
                <p className="mt-2">You have {remainingPullRequests} pull requests remaining.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Report dialog */}
      <AlertDialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border border-green-500">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-300">Report Profile</AlertDialogTitle>
            <AlertDialogDescription className="text-green-400">
              Please select a reason for reporting this profile. False reports may result in permanent suspension.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-4">
            <Select onValueChange={setReportReason} value={reportReason}>
              <SelectTrigger className="w-full bg-gray-700 text-green-400 border-green-500">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-green-400 border-green-500">
                <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="fake_profile">Fake Profile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-600 text-green-400 hover:bg-gray-700 hover:text-green-300">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-green-600 text-white hover:bg-green-700" onClick={handleReport}>Report</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}