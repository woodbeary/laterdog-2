"use client";

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { GitPullRequest, X, Check, AlertCircle, ChevronDown } from "lucide-react"
import { MatchData } from '@/lib/mockData'
import { useTheme } from '@/contexts/ThemeContext'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface PullRequestsReceivedProps {
  pullRequests: {
    from: MatchData;
    message: string;
  }[];
  onAccept: (profile: MatchData) => void;
  onDecline: (profile: MatchData) => void;
}

export function PullRequestsReceived({ pullRequests, onAccept, onDecline }: PullRequestsReceivedProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPR, setSelectedPR] = useState<{from: MatchData; message: string} | null>(null)
  const { isLightMode } = useTheme()
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [confirmAction, setConfirmAction] = useState<'accept' | 'deny' | null>(null)

  const handleAccept = () => {
    if (selectedPR) {
      onAccept(selectedPR.from)
      setFeedback({ type: 'success', message: `You've merged the pull request from ${selectedPR.from.name}!` })
      setTimeout(() => {
        setSelectedPR(null)
        setFeedback(null)
      }, 2000)
    }
  }

  const handleDeny = () => {
    if (selectedPR) {
      onDecline(selectedPR.from)
      setFeedback({ type: 'error', message: `You've denied the pull request from ${selectedPR.from.name}.` })
      setTimeout(() => {
        setSelectedPR(null)
        setFeedback(null)
      }, 2000)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pull Requests</h2>
      <Button onClick={() => setIsDialogOpen(true)}>
        <GitPullRequest className="mr-2" /> View Pull Requests ({pullRequests.length})
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`${isLightMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-green-100'} border-2 ${isLightMode ? 'border-gray-300' : 'border-green-700'} max-h-[90vh] h-[90vh] overflow-hidden flex flex-col`}>
          <DialogHeader>
            <DialogTitle className={`${isLightMode ? 'text-gray-900' : 'text-green-100'} text-xl font-bold`}>Pull Requests</DialogTitle>
          </DialogHeader>
          <ScrollArea className="flex-grow my-4">
            <Accordion type="single" collapsible className="w-full">
              {pullRequests.map((pr, index) => (
                <AccordionItem value={`item-${index}`} key={index} className={`${isLightMode ? 'border-gray-200' : 'border-green-700'}`}>
                  <AccordionTrigger className={`text-left ${isLightMode ? 'text-gray-800 hover:text-gray-900' : 'text-green-200 hover:text-green-100'}`}>
                    New pull request from {pr.from.name}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className={`${isLightMode ? 'text-gray-800' : 'text-green-100'} whitespace-pre-wrap p-4 ${isLightMode ? 'bg-gray-50' : 'bg-gray-800'} rounded`}>
                      {pr.message}
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={() => setConfirmAction('deny')} disabled={!!feedback}
                        className={`${isLightMode ? 'border-red-500 text-red-500 hover:bg-red-50' : 'border-red-400 text-red-400 hover:bg-red-900'}`}>
                        <X className="mr-2" /> Deny
                      </Button>
                      <Button onClick={() => setConfirmAction('accept')} disabled={!!feedback}
                        className={`${isLightMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-700 hover:bg-green-600 text-green-100'}`}>
                        <Check className="mr-2" /> Accept
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollArea>
          {feedback && (
            <Alert variant={feedback.type === 'success' ? 'default' : 'destructive'} className={`${isLightMode ? 'bg-green-100 text-green-800' : 'bg-green-900 text-green-100'}`}>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{feedback.type === 'success' ? 'Success' : 'Denied'}</AlertTitle>
              <AlertDescription>{feedback.message}</AlertDescription>
            </Alert>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className={`${isLightMode ? 'bg-white text-gray-900' : 'bg-gray-900 text-green-100'} border-2 ${isLightMode ? 'border-gray-300' : 'border-green-700'}`}>
          <DialogHeader>
            <DialogTitle className={`${isLightMode ? 'text-gray-900' : 'text-green-100'} text-xl font-bold`}>Confirm Action</DialogTitle>
            <DialogDescription className={`${isLightMode ? 'text-gray-600' : 'text-green-300'}`}>
              Are you sure you want to {confirmAction === 'accept' ? 'accept' : 'deny'} this pull request?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmAction(null)}
              className={`${isLightMode ? 'border-gray-300 text-gray-600 hover:bg-gray-50' : 'border-green-700 text-green-300 hover:bg-gray-800'}`}>
              Cancel
            </Button>
            <Button onClick={() => {
              if (confirmAction === 'accept') handleAccept();
              else handleDeny();
              setConfirmAction(null);
            }} className={`${isLightMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-600 text-blue-100'}`}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}