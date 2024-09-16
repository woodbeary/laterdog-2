'use client';

import { useSession } from 'next-auth/react';
import FirestoreCounter from '../components/FirestoreCounter';

export default function FirestoreTestPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please sign in to access this page.</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Firestore Counter Test</h1>
      <FirestoreCounter />
    </main>
  );
}