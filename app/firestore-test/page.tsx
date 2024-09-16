import FirestoreCounter from '../components/FirestoreCounter';

export default function FirestoreTestPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Firestore Counter Test</h1>
      <FirestoreCounter />
    </main>
  );
}