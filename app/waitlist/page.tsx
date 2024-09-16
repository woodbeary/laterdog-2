'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TweetCarousel } from '@/components/TweetCarousel';
import { useTheme } from '@/contexts/ThemeContext';
import { Users, DollarSign, Share2, Info } from 'lucide-react';
import Link from 'next/link';

const calculateSurgePrice = (queueCount: number): number => {
  const basePrice = 5;
  const maxPrice = 50;
  const surgeMultiplier = Math.min(1 + queueCount / 100, 10); // Cap at 10x surge
  return Math.min(Math.round(basePrice * surgeMultiplier), maxPrice);
};

export default function WaitlistPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [queueCount, setQueueCount] = useState<number>(0);
  const [surgePrice, setSurgePrice] = useState<number>(5);
  const { isLightMode } = useTheme();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'stats', 'queue'), (doc) => {
      const count = doc.data()?.count || 0;
      setQueueCount(count);
      setSurgePrice(calculateSurgePrice(count));
    });
    return () => unsubscribe();
  }, []);

  const handleJoinWaitlist = async () => {
    // Logic to join waitlist
    console.log("Joining waitlist with phone number:", phoneNumber);
  };

  const handleSkipQueue = async () => {
    // Logic to process payment and skip queue
    console.log(`Processing $${surgePrice} payment for instant access`);
  };

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-green-400'} font-mono`}>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          <Link href="/" className="hover:underline">
            later.dog Waitlist
          </Link>
        </h1>
        
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg p-6 mb-8 relative">
          <Dialog open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="absolute top-2 right-2 text-green-400 hover:text-green-300">
                <Info size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-green-400 border-green-500">
              <DialogHeader>
                <DialogTitle>How It Works</DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-green-300">
                <p>We maintain a 4:1 ratio of men to women to ensure a balanced community.</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Women get instant access</li>
                  <li>Men join the queue (free)</li>
                  <li>Skip the queue for a dynamic fee ($5-$50)</li>
                  <li>Invite women to move up faster</li>
                </ul>
                <p className="mt-2">The skip queue price increases as demand grows, similar to surge pricing.</p>
              </DialogDescription>
            </DialogContent>
          </Dialog>

          <div className="flex items-center justify-center mb-4">
            <Users size={20} className="mr-2 text-green-400" />
            <p className="text-lg text-green-400">Queue: {queueCount}</p>
          </div>
          
          <p className="text-center mb-6 text-green-300 text-sm">
            4:1 ratio of men to women. Women get instant access, men join the queue.
          </p>
          
          <div className="space-y-4 mb-6">
            <Label htmlFor="phoneNumber" className="text-green-300 text-sm">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="bg-gray-700 text-green-300 border-green-500 placeholder-green-600"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleJoinWaitlist} className="w-full bg-green-600 hover:bg-green-700 text-white transition duration-300">
                    Join Waitlist (Free)
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-700 text-green-300 border-green-500">
                  <p>Join the queue for free. We'll notify you when it's your turn.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleSkipQueue} className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 flex items-center justify-center transition duration-300">
                  <DollarSign size={18} className="mr-2" />
                  Skip Queue (${surgePrice})
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-700 text-green-300 border-green-500">
                <p>Get instant access by paying ${surgePrice}. Price may change based on demand.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="mt-4 text-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="link" className="text-blue-400 hover:text-blue-300">
                    <Share2 size={16} className="mr-1" />
                    Share Invitation
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-700 text-green-300 border-green-500">
                  <p>Invite women to join and move up faster in the queue!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-300">What People Are Saying</h2>
          <TweetCarousel />
        </div>

        <div className="mt-8 text-center text-xs text-green-500">
          <p>By joining, you agree to our Terms of Service and Privacy Policy.</p>
          <p className="mt-1">We value transparency and fairness in our community.</p>
        </div>
      </div>
    </div>
  );
}