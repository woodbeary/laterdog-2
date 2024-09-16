'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function ComingSoon() {
  const { data: session, status } = useSession() || {};

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-xl mb-8">We're working on something awesome. Stay tuned!</p>
      <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
        ← Back to Home
      </Link>
    </div>
  );
}