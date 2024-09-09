import admin from 'firebase-admin';

console.log('Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Firebase Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('Firebase Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
  }
}

export const firestore = admin.firestore();