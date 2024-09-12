import { LandingPage, styleTag } from "@/components/landing-page";
import { Metadata } from 'next';
import { TweetCarousel } from '@/components/TweetCarousel';

export const metadata: Metadata = {
  // ... (keep your existing metadata)
};

export default function Home() {
  return (
    <>
      {styleTag}
      <div className="hacker-background">
        <LandingPage>
          {/* Add the TweetCarousel as a child of LandingPage */}
          <div className="w-full my-16">
            <h2 className="text-2xl font-bold text-center mb-8">What people are saying</h2>
            <TweetCarousel />
          </div>
        </LandingPage>
      </div>
    </>
  );
}
