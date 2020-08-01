import 'firebase/auth'
import firebase from 'firebase/app'

let _app: firebase.app.App | null = null

const firebaseConfig = {
  apiKey: 'AIzaSyCG_cJe95ocYWef_Gptg41VCRzvAX8unBI',
  authDomain: 'yayayay-2b206.firebaseapp.com',
  databaseURL: 'https://yayayay-2b206.firebaseio.com',
  projectId: 'yayayay-2b206',
  storageBucket: 'yayayay-2b206.appspot.com',
  messagingSenderId: '36070440906',
  appId: '1:36070440906:web:f4c308f28245aa9d6bd933',
}

export function getApp() {
  if (_app) return _app
  if (firebase.apps.length > 0) {
    return (_app = firebase.app())
  } else {
    _app = firebase.initializeApp(firebaseConfig)
    return _app
  }
}

export function getAuth() {
  return getApp().auth()
}

export async function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider()

  try {
    const user = await firebase.auth().signInWithPopup(provider)
    console.log(user)
  } catch (err) {
    console.error('login fail', err)
  }
}

export async function logout() {
  try {
    const user = await firebase.auth().signOut()
    console.log(user)
  } catch (error) {
    console.error('logout failed', error)
  }
}

// @ts-ignore
globalThis._app = firebase
