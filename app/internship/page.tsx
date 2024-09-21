'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FaTwitter, FaEnvelope, FaShare } from 'react-icons/fa';
import Image from 'next/image';

export default function InternshipPage() {
  const twitterHandle = "@laterdogx";
  const recipientId = "1832737814615867392";
  const preMessage = encodeURIComponent("Hey! I'm interested in a social media role, my name is ");
  const contactEmail = "apply@later.dog";

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'Social Media Intern Opportunity at later.dog',
          text: 'Check out this cool internship opportunity!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-between p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-2xl font-bold mb-3 text-center text-green-400 hover:text-green-300 transition-colors duration-200">
          later.dog
        </Link>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-400">
          Social Media<br />Intern Wanted
        </h2>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-8">
          <h3 className="text-2xl font-bold mb-4 text-green-400">The Role:</h3>
          <ul className="space-y-2 mb-6 text-green-300">
            <li>• Master the art of the shitpost on X</li>
            <li>• Engage with top-tier tech memes</li>
            <li>• Share updates with extra slop</li>
            <li>• Boost visibility creatively</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-green-400">You Have:</h3>
          <ul className="space-y-2 text-green-300">
            <li>• Passion for tech and dank memes</li>
            <li>• GIF and emoji fluency</li>
            <li>• Self-motivation (PJs welcome)</li>
            <li>• Pulse on tech and internet culture</li>
          </ul>
        </div>

        <p className="text-lg mb-5 text-green-300 text-center font-semibold italic">
          Join us in building a community where code commits lead to real-life commits.
        </p>
        <p className="text-sm mb-8 text-green-300 text-center flex items-center justify-center">
          <Image src="/images/twitter-verified-badge.png" width={20} height={20} alt="Verified Badge" className="mr-2" />
          Get a verified badge on your personal X account!
        </p>

        <div className="flex space-x-4 mb-5">
          <Button asChild className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-lg text-sm flex-grow transition-all duration-200">
            <a 
              href={`https://twitter.com/messages/compose?recipient_id=${recipientId}&text=${preMessage}`}
              className="twitter-dm-button flex items-center justify-center"
              data-screen-name={twitterHandle}
            >
              <FaTwitter className="mr-2" /> Slide into our DMs
            </a>
          </Button>
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-black font-bold p-3 rounded-lg transition-all duration-200" aria-label="Email us">
            <Link href={`mailto:${contactEmail}`}>
              <FaEnvelope size={20} />
            </Link>
          </Button>
          <Button onClick={handleShare} className="bg-gray-500 hover:bg-gray-600 text-black font-bold p-3 rounded-lg transition-all duration-200" aria-label="Share this page">
            <FaShare size={20} />
          </Button>
        </div>
        <p className="text-sm text-center text-green-300">
          Not sure? Reach out anyway - we're open to cool ideas!
        </p>
      </div>
      <footer className="mt-8 text-sm text-blue-400 text-center">
        California-based, Australia-rooted
      </footer>
    </div>
  );
}