import * as React from 'react'

import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from '../utils/firebase'
import { useState, useEffect, useContext } from 'react'
import useSWR from 'swr'

import { UserContext } from '../pages/_app'

const fetchWithToken = async (url: string, token: string) => {
  const headers = { headers: { Authorization: `Bearer ${token}` } }
  return fetch(url, headers).then((res) => res.json())
}

const ListDetail = () => {
  const { token, user, loading } = useContext(UserContext)

  const [text, setText] = useState('')
  // useEffect(() => {
  //   const fn = async () => {
  //     if (!user) return

  //     const token = await user.getIdToken(true)

  //     console.log('-------')
  //     const res = await fetch(`http://localhost:3000/api/users`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     if (res.status == 200) {
  //       console.log('success')
  //       setText(await res.text()) // wiiip
  //     } else {
  //       setText('error')
  //     }
  //   }

  //   fn()
  // }, [user])

  const { data, error } = useSWR(
    token ? [`http://localhost:3000/api/users`, token] : null,
    fetchWithToken,
  )
  // if (data) {
  //   setText(data)
  // }

  if (!user || loading) {
    return <div>waiting</div>
  }

  return (
    <div>
      <h1>Detail for {user.email}</h1>
      <p>{text}</p>
      {data && data.id}
    </div>
  )
}

export default ListDetail
