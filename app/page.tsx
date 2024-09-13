import { LandingPage, styleTag } from "@/components/landing-page";
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const TweetCarousel = dynamic(() => import('@/components/TweetCarousel'), { ssr: false });

export const metadata: Metadata = {
  // ... (keep your existing metadata)
};

export default function Home() {
  return (
    <>
      {styleTag}
      <div className="hacker-background">
        <LandingPage>
          <div className="w-full my-16">
            <h2 className="text-2xl font-bold text-center mb-8">What people are saying</h2>
            <TweetCarousel />
          </div>
        </LandingPage>
      </div>
    </>
  );
}
