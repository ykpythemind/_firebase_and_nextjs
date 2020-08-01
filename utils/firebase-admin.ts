import * as admin from 'firebase-admin'

const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!raw) {
  throw 'credential missing!'
}
const key = JSON.parse(Buffer.from(raw, 'base64').toString())

export function getAdmin(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0] as admin.app.App
  } else {
    const app = admin.initializeApp({
      credential: admin.credential.cert(key),
      databaseURL: 'https://yayayay-2b206.firebaseio.com', // todo: use .env
    })
    return app
  }
}

export async function verifyIdToken(idToken: string) {
  const admin = getAdmin()
  return await admin.auth().verifyIdToken(idToken)
}
