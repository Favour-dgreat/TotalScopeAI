import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'
import { ContentType } from './types'

export async function trackActivity(userId: string, type: ContentType, description: string) {
  try {
    await addDoc(collection(db, 'activities'), {
      userId,
      type,
      description,
      timestamp: serverTimestamp()
    })
  } catch (error) {
    console.error('Error tracking activity:', error)
  }
}