import Link from 'next/link'
import Layout from '../components/Layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth, loginWithGoogle, logout } from '../utils/firebase'

const AboutPage = () => {
  const [user, loading, error] = useAuthState(getAuth())

  if (error) {
    return (
      <Layout>
        <h1>error</h1> <p>{error.message}</p>
      </Layout>
    )
  }

  return (
    <Layout title="About | Next.js + TypeScript Example">
      <h1>About</h1>
      <p>This is the about page</p>
      {!loading && user ? (
        <>
          <button onClick={() => logout()}>logout</button>
          {user.email}
        </>
      ) : (
        <button onClick={() => loginWithGoogle()}>google</button>
      )}
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  )
}

export default AboutPage
