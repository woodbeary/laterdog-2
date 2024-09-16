import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, Download, MessageSquare } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onDownloadData: () => void;
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm, onDownloadData }: DeleteAccountModalProps) {
  const [showMobileTooltip, setShowMobileTooltip] = useState('');

  if (!isOpen) return null;

  const handleFeedback = () => {
    const tweetText = encodeURIComponent("Hey @laterdogx, I'm deleting my Later.dog account because...");
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleMobileTooltip = (action: string) => {
    setShowMobileTooltip(action);
    setTimeout(() => setShowMobileTooltip(''), 2000); // Hide after 2 seconds
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full border border-green-500 shadow-lg shadow-green-500/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-400">System Purge Confirmation</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  className="bg-transparent hover:bg-gray-800 text-green-400 p-1"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Abort</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="mb-6 text-green-300 font-mono">
          WARNING: You are about to initiate a complete system purge. This action is irreversible. All data associated with your account will be permanently erased from our servers.
        </p>
        <Button 
          className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-mono text-lg flex items-center justify-center mb-4"
          onClick={onConfirm}
        >
          Confirm Purge
        </Button>
        <div className="flex justify-between items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-transparent hover:bg-gray-800 text-blue-400 text-xs font-mono flex items-center p-1"
                  onClick={() => {
                    onDownloadData();
                    handleMobileTooltip('extract');
                  }}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Extract Data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="bg-transparent hover:bg-gray-800 text-green-400 text-xs font-mono flex items-center p-1"
                  onClick={() => {
                    handleFeedback();
                    handleMobileTooltip('feedback');
                  }}
                >
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Send Feedback</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {showMobileTooltip && (
          <div className="mt-2 text-center text-xs text-green-400">
            {showMobileTooltip === 'extract' ? 'Extracting Data...' : 'Sending Feedback...'}
          </div>
        )}
      </div>
    </div>
  );
}