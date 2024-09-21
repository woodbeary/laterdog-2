import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { FaTwitter, FaEnvelope } from 'react-icons/fa';

export default function InternshipPage() {
  const twitterHandle = "@laterdogx";
  const recipientId = "1832737814615867392";
  const preMessage = encodeURIComponent("Hey! I'm interested in a social media role, my name is ");
  const contactEmail = "apply@later.dog";

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-center text-green-400">
          later.dog
        </h1>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-400">
          Social Media<br />Intern Wanted
        </h2>
        
        <div className="bg-gray-900 p-6 rounded-lg mb-6">
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

        <p className="text-lg mb-4 text-green-300 text-center font-semibold italic">
          Join us in building a community where code commits lead to real-life commits.
        </p>
        <p className="text-sm mb-6 text-green-300 text-center">
          California-based, Australia-rooted
        </p>

        <div className="flex space-x-4 mb-4">
          <Button asChild className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-4 rounded-lg text-sm flex-grow">
            <a 
              href={`https://twitter.com/messages/compose?recipient_id=${recipientId}&text=${preMessage}`}
              className="twitter-dm-button flex items-center justify-center"
              data-screen-name={twitterHandle}
            >
              <FaTwitter className="mr-2" /> Slide into our DMs
            </a>
          </Button>
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-black font-bold p-3 rounded-lg">
            <Link href={`mailto:${contactEmail}`}>
              <FaEnvelope size={20} />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-center text-green-300">
          Not sure? Reach out anyway - we're open to cool ideas!
        </p>
      </div>
    </div>
  );
}