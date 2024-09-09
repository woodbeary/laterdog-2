"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Star, Zap, Brain, Lightbulb, UserX, MessageSquare, Shield, Info, AlertTriangle, Check, Clock } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { useTheme } from '@/contexts/ThemeContext'

interface SettingsPageProps {
  onClose: () => void
}

// Custom Toggle component
const Toggle = ({ checked, onChange, disabled }: { checked: boolean; onChange: (checked: boolean) => void; disabled?: boolean }) => (
  <div
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
      checked ? 'bg-green-500' : 'bg-gray-700'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={() => onChange(!checked)}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
        checked ? 'translate-x-6' : ''
      }`}
    />
  </div>
)

export default function SettingsPage({ onClose }: SettingsPageProps) {
  const { isLightMode, toggleTheme } = useTheme()
  const [radius, setRadius] = useState(50)
  const [languages, setLanguages] = useState<string[]>([])
  const [frequency, setFrequency] = useState(3)
  const [codingYears, setCodingYears] = useState(1)
  const [roastLevel, setRoastLevel] = useState('medium')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSave = () => {
    // Here you would typically save all settings
    // For now, we'll just toggle the theme and close the settings
    toggleTheme()
    onClose()
  }

  const handlePremiumConfirm = () => {
    window.open('https://stripe.com', '_blank')
  }

  const handleModConfirm = () => {
    // Direct Message link for X (Twitter)
    window.open('https://twitter.com/messages/compose?recipient_id=laterdogX', '_blank')
  }

  return (
    <div className="space-y-6 p-4 max-h-[80vh] overflow-y-auto">
      <h2 className="text-2xl font-bold text-center text-green-300">Developer Stats</h2>

      {/* Wrap the content in a scrollable container */}
      <div className="space-y-6 overflow-y-auto pr-2" style={{ maxHeight: 'calc(80vh - 100px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-green-500">
            <h3 className="text-lg mb-2 flex items-center"><Star className="mr-2" /> Premium Status</h3>
            <Progress value={30} className="w-full mb-2" />
            <p className="text-sm mb-2">30/100 lifetime deals claimed</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Get Premium ($5 Lifetime)</Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-green-500 text-green-400">
                <DialogHeader>
                  <DialogTitle className="text-green-300">Upgrade to Premium</DialogTitle>
                  <DialogDescription className="text-green-400">
                    Enjoy exclusive features and support the development of later.dog!
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h4 className="font-bold mb-2 text-green-300">Premium Features:</h4>
                  <ul className="space-y-2 text-green-400">
                    <li className="flex items-center">
                      <Check className="mr-2 text-green-500" size={16} />
                      Unlimited swipes
                    </li>
                    <li className="flex items-center text-gray-500">
                      <Clock className="mr-2" size={16} />
                      Advanced filters (Coming soon)
                    </li>
                    <li className="flex items-center text-gray-500">
                      <Clock className="mr-2" size={16} />
                      Priority matching (Coming soon)
                    </li>
                    <li className="flex items-center text-gray-500">
                      <Clock className="mr-2" size={16} />
                      Ad-free experience (Coming soon)
                    </li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button onClick={handlePremiumConfirm}>Upgrade Now</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-green-500">
            <h3 className="text-lg mb-2 flex items-center"><Shield className="mr-2" /> Mod Powers</h3>
            <p className="text-sm mb-4">Unlock special abilities and help manage the community</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Apply for Mod Badge</Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 border-green-500 text-green-400">
                <DialogHeader>
                  <DialogTitle className="text-green-300">Become a Moderator</DialogTitle>
                  <DialogDescription className="text-green-400">
                    Help us maintain a positive community and gain special privileges!
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <h4 className="font-bold mb-2 text-green-300">Mod Responsibilities:</h4>
                  <ul className="list-disc list-inside space-y-1 text-green-400">
                    <li>Review reported profiles</li>
                    <li>Moderate discussions</li>
                    <li>Provide community support</li>
                    <li>Suggest improvements</li>
                  </ul>
                </div>
                <DialogFooter>
                  <Button onClick={handleModConfirm}>Apply Now</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-green-500">
          <h3 className="text-lg mb-4 flex items-center text-gray-500">
            <Brain className="mr-2" /> Matching Preferences
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Clock className="ml-2 w-4 h-4 text-yellow-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Premium feature coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <div className="space-y-4 opacity-50 pointer-events-none">
            <div>
              <label className="block mb-1 text-sm text-gray-500">Max Distance: {radius} km</label>
              <Slider
                min={1}
                max={100}
                step={1}
                value={[radius]}
                onValueChange={(value) => setRadius(value[0])}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-500">Preferred Languages</label>
              <select 
                multiple 
                className="w-full bg-gray-700 text-gray-500 rounded p-2 text-sm cursor-not-allowed"
                value={languages}
                onChange={(e) => setLanguages(Array.from(e.target.selectedOptions, option => option.value))}
                disabled
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-500">Coding Frequency: {frequency} days/week</label>
              <Slider
                min={1}
                max={7}
                step={1}
                value={[frequency]}
                onValueChange={(value) => setFrequency(value[0])}
                className="w-full"
                disabled
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-500">Coding Experience: {codingYears} years</label>
              <Slider
                min={0}
                max={20}
                step={1}
                value={[codingYears]}
                onValueChange={(value) => setCodingYears(value[0])}
                className="w-full"
                disabled
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Matching preferences will be available in the upcoming premium version.
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-green-500">
          <h3 className="text-lg mb-4 flex items-center">
            <Zap className="mr-2" /> Beta Features
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <AlertTriangle className="ml-2 w-4 h-4 text-yellow-500 cursor-help" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>These features are in beta and may not work as expected.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm flex items-center text-gray-500">
                <MessageSquare className="mr-2" /> Grok Roast Level (Pull Request)
              </label>
              <select 
                className="w-full bg-gray-700 text-gray-500 rounded p-2 text-sm cursor-not-allowed"
                value={roastLevel}
                onChange={(e) => setRoastLevel(e.target.value)}
                disabled
              >
                <option value="soft">Soft Roast</option>
                <option value="medium">Medium Roast</option>
                <option value="hard">Hard Roast</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Premium feature: Pay for pull requests to get crafted wingman roasts.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label className="flex items-center text-sm cursor-help text-gray-500">
                      <UserX className="mr-2" /> Anonymous Mode
                      <Info className="ml-1 w-4 h-4" />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Hide your profile picture and personal info. Only your GitHub data will be visible until you match.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Toggle checked={isAnonymous} onChange={setIsAnonymous} disabled />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Premium feature coming soon: Anonymous Mode will allow you to hide personal information until you match.
            </p>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <Lightbulb className="mr-2" /> Light Mode
              </label>
              <Toggle checked={isLightMode} onChange={toggleTheme} />
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full mt-4" onClick={handleSave}>Save Settings</Button>
    </div>
  )
}