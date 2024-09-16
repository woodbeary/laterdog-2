import { db } from '@/firebase';
import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';

export async function inviteUser(inviterId: string, inviteeEmail: string, inviteeGender: string) {
  const invitationRef = doc(db, 'invitations', `${inviterId}_${inviteeEmail}`);
  
  await setDoc(invitationRef, {
    inviterId,
    inviteeEmail,
    inviteeGender,
    timestamp: new Date(),
    status: 'pending'
  });

  if (inviteeGender === 'female') {
    // If a woman is invited, move the inviter up in the queue
    const inviterRef = doc(db, 'queue', inviterId);
    await updateDoc(inviterRef, {
      position: increment(-1) // Move up one position
    });

    // TODO: Implement email sending logic here
    // You might want to use a service like SendGrid or Firebase Cloud Functions
  }
}

export async function getQueuePosition(userId: string): Promise<number> {
  const queueRef = doc(db, 'queue', userId);
  const queueDoc = await getDoc(queueRef);
  return queueDoc.data()?.position || 0;
}