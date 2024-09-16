'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Github, Code, Users, GitFork, Image, Plus, Menu, AlertCircle, X, Settings, MessageCircle, GitCommit, Calendar, Zap, Shield, Check, Clock } from "lucide-react"
import { CustomUser, GithubData } from '@/types/user'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { 
  Dialog, 
  DialogContent, 
  DialogTrigger,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import SettingsPage from '@/components/SettingsPage'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'
import { MatchStats } from '@/components/MatchStats'
import { MockSessionProvider } from "../mock-session-provider"
import GithubContributionGraph from '@/components/GithubContributionGraph'
import { ScrollArea } from "@/components/ui/scroll-area"
import { MatchData, mockMatches } from '@/lib/mockData'
import { PullRequestsReceived } from '@/components/PullRequestsReceived'
import { generateWingmanMessage } from '@/lib/messageGenerator'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from 'lucide-react'

const mockGithubData: GithubData = {
  public_repos: 30,
  followers: 100,
  following: 50,
  total_commits: 1500,
  top_language: "JavaScript",
  account_age: 3 // years
}

const isDevelopment = process.env.NODE_ENV === 'development'

function generateMatchStats(match: MatchData) {
  const { githubData, profile } = match

  if (!githubData || !profile) {
    return []
  }

  return [
    { 
      name: 'Top Language',
      shortName: 'TL',
      value: githubData.top_language,
      description: 'Most used programming language'
    },
    { 
      name: 'Daily Commits',
      shortName: 'DC',
      value: Math.round(githubData.total_commits / (githubData.account_age * 365)),
      description: 'Average commits per day'
    },
    { 
      name: 'Repositories',
      shortName: 'RP',
      value: githubData.public_repos,
      description: 'Total number of public repositories'
    },
    { 
      name: 'GitHub Age',
      shortName: 'GA',
      value: githubData.account_age,
      description: 'Years on GitHub'
    },
    { 
      name: 'Location',
      shortName: 'LC',
      value: profile.location,
      description: 'Current location'
    },
    { 
      name: 'Age',
      shortName: 'AG',
      value: profile.age,
      description: 'User\'s age'
    },
  ]
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [githubData, setGithubData] = useState<GithubData | null>(null)
  const [photos, setPhotos] = useState<string[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [matches, setMatches] = useState(mockMatches)
  const router = useRouter()

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { isLightMode } = useTheme()

  const [grokRoast, setGrokRoast] = useState<string>("")
  const [grokDetailedRoast, setGrokDetailedRoast] = useState<string>("")

  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null)
  const [isUnmatchDialogOpen, setIsUnmatchDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
  const [selectedMatchForAction, setSelectedMatchForAction] = useState<MatchData | null>(null)

  const [pullRequests, setPullRequests] = useState([
    {
      from: mockMatches[1],
      message: generateWingmanMessage(mockMatches[1], mockMatches[0]) // Assuming mockMatches[0] is the current user
    },
    // ... you can add more mock pull requests here if needed
  ])

  const handleAcceptPR = (profile: MatchData) => {
    // Logic to handle accepting a pull request
    console.log('Accepted pull request from', profile.name)
    // You might want to add this profile to matches, show a confirmation, etc.
  }

  const handleDeclinePR = (profile: MatchData) => {
    // Logic to handle declining a pull request
    console.log('Declined pull request from', profile.name)
    // You might want to remove this pull request from the list
  }

  useEffect(() => {
    if (status !== 'loading') {
      setIsLoading(false)
    }
  }, [status])

  useEffect(() => {
    if (!session) {
      setGithubData(mockGithubData)
    } else if ((session?.user as CustomUser)?.githubToken) {
      fetchGithubData()
    }
  }, [session])

  useEffect(() => {
    // In a real app, this would be an API call to get the Grok roast
    const mockGrokRoast = "Spends more time optimizing algorithms than social skills. Your commit history is more active than your dating life."
    const mockGrokDetailedRoast = "Your code is clean, but your coffee mug collection is a biohazard. You've got 99 problems, and they're all merge conflicts."
    setGrokRoast(mockGrokRoast)
    setGrokDetailedRoast(mockGrokDetailedRoast)
  }, [])

  const fetchGithubData = async () => {
    try {
      // Fetch GitHub data
      // ...
    } catch (error) {
      // Handle error without logging sensitive information
    }
  }

  const handlePhotoUpload = () => {
    if (photos.length < 6) {
      setPhotos([...photos, `https://picsum.photos/200/300?random=${photos.length + 1}`])
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleReportProblem = () => {
    const tweetText = encodeURIComponent("Hey @laterdogX, I'd like to report a problem or provide feedback: ");
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, '_blank');
    setIsReportDialogOpen(false);
  };

  const handleUnmatch = (id: string) => {
    setMatches(matches.filter(match => match.id !== id))
    // In a real app, you'd also update this on the backend
  }

  const handleMessage = (username: string) => {
    window.open(`https://twitter.com/messages/compose?recipient_id=${username}`, '_blank')
  }

  const handleUnmatchConfirm = () => {
    if (selectedMatchForAction) {
      handleUnmatch(selectedMatchForAction.id)
      setSelectedMatch(null)
      setIsUnmatchDialogOpen(false)
    }
  }

  const handleBlockRedirect = () => {
    if (selectedMatchForAction) {
      window.open(`https://twitter.com/intent/user?screen_name=${selectedMatchForAction.username}`, '_blank')
      setIsBlockDialogOpen(false)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  const user = session?.user as CustomUser || { name: 'Mock User', username: 'mockuser', image: 'https://github.com/github.png' }

  return (
    <div className={`relative min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-green-400'} font-mono`}>
      <Alert className="mb-4 bg-blue-900 border-blue-500">
        <Info className="h-4 w-4" />
        <AlertTitle>Work in Progress</AlertTitle>
        <AlertDescription className="text-sm">
          yo, want in on the action? {' '}
          <Link href="https://twitter.com/messages/compose?recipient_id=laterdogx" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">
            send me a PM
          </Link>
          {' '}for a git invite. Let's code. later, dog!
        </AlertDescription>
      </Alert>

      {/* Off-canvas menu */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}>
        <button onClick={toggleMenu} className="absolute top-4 right-4 text-green-400">
          <X size={24} />
        </button>
        <div className="mt-8">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="w-full justify-start text-green-400">
                <Settings size={24} className="mr-2" /> Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-green-400 border-green-500 max-w-4xl w-full">
              <SettingsPage onClose={() => setIsSettingsOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button variant="ghost" onClick={toggleMenu} className="text-green-400">
            <Menu size={24} />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-yellow-500">
                <AlertCircle size={24} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-gray-800 border-green-500">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-green-300">Report a Problem</AlertDialogTitle>
                <AlertDialogDescription className="text-green-400">
                  Do you want to provide feedback or report a problem?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-700 text-green-400">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleReportProblem} className="bg-blue-600 text-white">
                  Yes, Report
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="flex flex-col items-center mb-6">
          <img src={user.image || 'https://github.com/github.png'} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          <h1 className="text-xl font-bold text-green-300">{user.name}</h1>
          <p className="text-green-400">@{user.username}</p>
          <p className={`text-sm italic ${isLightMode ? 'text-gray-700' : 'text-green-300'} mt-2 text-center`}>
            "{grokRoast}"
          </p>
        </div>

        {/* GitHub contribution graph */}
        <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-4 rounded mb-6 overflow-x-auto`}>
          <h2 className="text-lg mb-2">Contribution Graph</h2>
          <GithubContributionGraph />
        </div>

        {/* GitHub stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          {githubData && (
            <>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <Code className="mb-2" size={20} />
                <p className="text-xs">Repos</p>
                <p className="font-bold">{githubData.public_repos}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <Users className="mb-2" size={20} />
                <p className="text-xs">Followers</p>
                <p className="font-bold">{githubData.followers}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <GitFork className="mb-2" size={20} />
                <p className="text-xs">Following</p>
                <p className="font-bold">{githubData.following}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <GitCommit className="mb-2" size={20} />
                <p className="text-xs">Total Commits</p>
                <p className="font-bold">{githubData.total_commits}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <Code className="mb-2" size={20} />
                <p className="text-xs">Top Language</p>
                <p className="font-bold">{githubData.top_language}</p>
              </div>
              <div className="flex flex-col items-center p-2 bg-gray-800 rounded">
                <Calendar className="mb-2" size={20} />
                <p className="text-xs">Account Age</p>
                <p className="font-bold">{githubData.account_age} years</p>
              </div>
            </>
          )}
        </div>

        {/* Grok's Detailed Roast */}
        <div className={`bg-${isLightMode ? 'white' : 'gray-800'} p-4 rounded mb-6`}>
          <h2 className="text-lg mb-2 flex items-center">
            <Zap className="mr-2" size={20} />
            Grok's Roast
          </h2>
          <p className={`text-sm italic ${isLightMode ? 'text-gray-700' : 'text-green-300'}`}>
            "{grokDetailedRoast}"
          </p>
        </div>

        {/* Photo upload section */}
        <div className="mb-6">
          <h2 className="text-lg mb-2">Your Photos</h2>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <img key={index} src={photo} alt={`User photo ${index + 1}`} className="w-full h-24 object-cover rounded" />
            ))}
            {photos.length < 6 && (
              <Button
                className="w-full h-24 bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                onClick={handlePhotoUpload}
              >
                <Plus className="mr-2" size={20} /> Add Photo
              </Button>
            )}
          </div>
        </div>

        {/* Matches section */}
        <div className="mb-6">
          <h2 className="text-lg mb-4 text-green-300">Your Matches</h2>
          <div className="space-y-4">
            {matches.map(match => (
              <div key={match.id} className={`flex items-center justify-between p-4 ${isLightMode ? 'bg-white' : 'bg-gray-800'} rounded-lg`}>
                <div 
                  className="flex items-center flex-grow cursor-pointer"
                  onClick={() => setSelectedMatch(match)}
                >
                  <img src={match.image} alt={match.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-bold">{match.name}</h3>
                    <p className="text-sm">@{match.username}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match details dialog */}
        <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
          <DialogContent className="bg-black border-2 border-green-500 text-green-400 p-0 sm:max-w-[95vw] md:max-w-[600px] h-[90vh] rounded-lg overflow-hidden flex flex-col">
            {selectedMatch && (
              <>
                <DialogHeader className="bg-green-900 p-4">
                  <DialogTitle className="text-xl font-bold text-green-400 uppercase">Match Details</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-grow p-4 overflow-y-auto overflow-x-auto">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <img src={selectedMatch.image} alt={selectedMatch.name} className="w-20 h-20 rounded-full border-2 border-green-500" />
                      <div>
                        <h2 className="text-lg font-bold">{selectedMatch.name}</h2>
                        <p className="text-sm">@{selectedMatch.username}</p>
                      </div>
                    </div>
                    
                    {selectedMatch.githubData && selectedMatch.profile ? (
                      <>
                        <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                          <h3 className="font-bold text-sm mb-2 uppercase">Bio</h3>
                          <p className="text-sm">{selectedMatch.profile.bio}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-green-900 bg-opacity-30 p-2 rounded">
                            <h3 className="font-bold text-xs uppercase">Repos</h3>
                            <p className="text-lg">{selectedMatch.githubData.public_repos}</p>
                          </div>
                          <div className="bg-green-900 bg-opacity-30 p-2 rounded">
                            <h3 className="font-bold text-xs uppercase">Followers</h3>
                            <p className="text-lg">{selectedMatch.githubData.followers}</p>
                          </div>
                          <div className="bg-green-900 bg-opacity-30 p-2 rounded">
                            <h3 className="font-bold text-xs uppercase">Following</h3>
                            <p className="text-lg">{selectedMatch.githubData.following}</p>
                          </div>
                          <div className="bg-green-900 bg-opacity-30 p-2 rounded">
                            <h3 className="font-bold text-xs uppercase">Commits</h3>
                            <p className="text-lg">{selectedMatch.githubData.total_commits}</p>
                          </div>
                        </div>
                        
                        <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                          <h3 className="font-bold text-sm mb-2 uppercase">Top Language</h3>
                          <p className="text-lg">{selectedMatch.githubData.top_language}</p>
                        </div>
                        
                        <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                          <h3 className="font-bold text-sm mb-2 uppercase">Contribution Graph</h3>
                          <div className="w-full overflow-x-auto">
                            <GithubContributionGraph />
                          </div>
                        </div>
                        
                        <div className="bg-green-900 bg-opacity-30 p-3 rounded">
                          <h3 className="font-bold text-sm mb-2 uppercase">Grok's Roast</h3>
                          <p className="text-sm italic">{selectedMatch.grokRoast}</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-center">Profile information not available for this user.</p>
                    )}
                  </div>
                </ScrollArea>
                <div className="p-4 bg-green-900 bg-opacity-30 flex justify-between mt-auto">
                  <Button variant="outline" size="sm" onClick={() => handleMessage(selectedMatch.username)} className="flex-1 mr-2 bg-green-700 hover:bg-green-600 text-green-100">
                    <MessageCircle className="w-4 h-4 mr-2" /> Message
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    setSelectedMatchForAction(selectedMatch)
                    setIsUnmatchDialogOpen(true)
                  }} className="flex-1 ml-2 bg-red-700 hover:bg-red-600 text-red-100">
                    <X className="w-4 h-4 mr-2" /> Unmatch
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => {
                    setSelectedMatchForAction(selectedMatch)
                    setIsBlockDialogOpen(true)
                  }} className="ml-2 text-yellow-500 hover:text-yellow-400">
                    <Shield className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Unmatch confirmation dialog */}
        <AlertDialog open={isUnmatchDialogOpen} onOpenChange={setIsUnmatchDialogOpen}>
          <AlertDialogContent className="bg-gray-800 border border-green-500">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-green-300">Confirm Unmatch</AlertDialogTitle>
              <AlertDialogDescription className="text-green-400">
                Are you sure you want to unmatch with this user? This action cannot be undone, and you will no longer be able to see or message each other.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-green-400">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUnmatchConfirm} className="bg-red-600 text-white">Unmatch</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Block information dialog */}
        <AlertDialog open={isBlockDialogOpen} onOpenChange={setIsBlockDialogOpen}>
          <AlertDialogContent className="bg-gray-800 border border-green-500">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-green-300">Block User</AlertDialogTitle>
              <AlertDialogDescription className="text-green-400">
                To block this user, you need to do so through X (Twitter). Click the button below to go to their X profile, where you can block them.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-700 text-green-400">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleBlockRedirect} className="bg-blue-600 text-white">Go to X Profile</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <PullRequestsReceived 
          pullRequests={pullRequests}
          onAccept={handleAcceptPR}
          onDecline={handleDeclinePR}
        />

        <Button 
          className="w-full bg-green-600 hover:bg-green-700 text-white mb-4"
          onClick={() => router.push('/swipe')}
        >
          Start Swiping
        </Button>
      </div>
    </div>
  )
}