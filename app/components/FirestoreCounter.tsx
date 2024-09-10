'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { doc, onSnapshot, setDoc, updateDoc, increment } from 'firebase/firestore';

export default function FirestoreCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const counterRef = doc(db, 'counters', 'main');
    
    // Create the document if it doesn't exist
    setDoc(counterRef, { value: 0 }, { merge: true })
      .then(() => {
        const unsubscribe = onSnapshot(counterRef, (doc) => {
          setCount(doc.data()?.value || 0);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Error creating/updating document: ", error);
      });
  }, []);

  const updateCounter = async (incrementValue: number) => {
    const counterRef = doc(db, 'counters', 'main');
    try {
      await updateDoc(counterRef, {
        value: increment(incrementValue)
      });
    } catch (error) {
      console.error("Error updating counter: ", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Firestore Counter: {count}</h2>
      <div className="flex space-x-2">
        <button
          onClick={() => updateCounter(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment
        </button>
        <button
          onClick={() => updateCounter(-1)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Decrement
        </button>
      </div>
    </div>
  );
}