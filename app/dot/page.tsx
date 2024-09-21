'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FaInfoCircle, FaCoffee, FaBeer, FaKeyboard } from 'react-icons/fa';
import Image from 'next/image';

export default function DotPage() {
  const [response, setResponse] = useState<string | null>(null);
  const twitterHandle = "@laterdogx";
  const recipientId = "1832737814615867392";
  const preMessage = encodeURIComponent("Hey! It's @28followeregirl. I'm down to be a mod! And maybe fly to America? 😉");

  const handleResponse = (answer: 'sure' | 'nah') => {
    setResponse(answer);
    if (answer === 'sure') {
      window.open(`https://twitter.com/messages/compose?recipient_id=${recipientId}&text=${preMessage}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors duration-200">
            later.dog
          </Link>
          <Link href="/internship" aria-label="See regular internship page">
            <FaInfoCircle className="text-green-400 hover:text-green-300 transition-colors duration-200" size={24} />
          </Link>
        </div>
        <h2 className="text-3xl font-extrabold mb-4 text-center text-blue-400">
          Yo @28followeregirl!
        </h2>
        <div className="flex justify-center mb-6">
          <Image src="https://pbs.twimg.com/profile_images/1831146765187526656/8Q0A65-h_400x400.jpg" width={100} height={100} alt="@28followeregirl" className="rounded-full" />
        </div>
        
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 text-green-400">Wanna be our mod?</h3>
          <ul className="space-y-2 mb-4 text-green-300 text-sm sm:text-base">
            <li>• Post whatever you want (keep it legal tho)</li>
            <li>• Share your hot takes and memes</li>
            <li>• Help us grow this weird community</li>
            <li className="flex items-center">
              • Get a verified badge, because why not?
              <Image src="/images/twitter-verified-badge.png" width={16} height={16} alt="Verified Badge" className="ml-2" />
            </li>
            <li>• Maybe even fly to America? 👀✈️</li>
          </ul>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h4 className="text-lg font-semibold mb-2 text-green-400">Your Qualifications:</h4>
          <ul className="space-y-2 text-green-300 text-sm">
            <li><FaCoffee className="inline mr-2" /> Barista experience</li>
            <li><FaBeer className="inline mr-2" /> Can pour a mean beer</li>
            <li><FaKeyboard className="inline mr-2" /> 78 WPM with 98% accuracy 💅</li>
            <li>Pretty girl energy ✨</li>
          </ul>
        </div>

        <p className="text-lg mb-5 text-green-300 text-center">
          We dig your vibe. Wanna join our chaotic energy?
        </p>

        {!response ? (
          <div className="flex space-x-4 mb-4">
            <Button onClick={() => handleResponse('sure')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-3 sm:py-3 sm:px-4 rounded-lg text-sm flex-grow transition-all duration-200">
              Sure, I guess
            </Button>
            <Button onClick={() => handleResponse('nah')} className="bg-gray-500 hover:bg-gray-600 text-black font-bold py-2 px-3 sm:py-3 sm:px-4 rounded-lg text-sm flex-grow transition-all duration-200">
              Nah
            </Button>
          </div>
        ) : (
          <p className="text-lg text-center text-green-300 mb-4">
            {response === 'sure' ? "Cool! Check your DMs on Twitter." : "Okie, no worries! The offer stands if you change your mind."}
          </p>
        )}
        
        <p className="text-sm text-center text-green-300">
          Not sure? Hit us up anyway. We're all about the chaos.
        </p>
      </div>
      <footer className="mt-6 text-sm text-blue-400 text-center">
        From Cali to Oz, we're living in the future too
      </footer>
    </div>
  );
}