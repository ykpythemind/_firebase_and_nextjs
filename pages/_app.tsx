import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from '../utils/firebase'
import Head from 'next/head'

interface userContextType {
  token: string
  user: firebase.User | undefined
  loading: boolean
}

export const UserContext = React.createContext<userContextType>({
  token: '',
  loading: false,
  user: undefined,
})

export default ({ Component, pageProps }: AppProps) => {
  const [user, loading, error] = useAuthState(getAuth())
  const [token, setToken] = useState('')

  useEffect(() => {
    const fn = async () => {
      if (user) {
        const token = await user.getIdToken(true)
        setToken(token)
        console.log('token set')
      }
    }

    fn()
  }, [user])

  return (
    <SWRConfig value={{}}>
      <UserContext.Provider value={{ token, loading, user }}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Component {...pageProps} />
      </UserContext.Provider>
    </SWRConfig>
  )
}
