import firebase from 'firebase/app'
import 'firebase/auth'
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  // measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const provider = new firebase.auth.GoogleAuthProvider()
const signUpWithGoogle = () => firebase.auth().signInWithPopup(provider)
const app = firebase.app()
const auth = firebase.auth()
if (process.env.NEXT_PUBLIC_LOCAL_DEV) {
  auth.useEmulator(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_AUTH_URL || 'http://localhost:9099/')
}
export { auth, signUpWithGoogle }
console.log(app.name ? 'Firebase Mode Activated!' : 'Firebase not working :(')
