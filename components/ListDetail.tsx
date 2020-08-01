import * as React from 'react'

import { User } from '../interfaces'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from '../utils/firebase'
import { useState, useEffect } from 'react'

type ListDetailProps = {
  item?: User
}

const ListDetail = ({}: ListDetailProps) => {
  const [user, loading, error] = useAuthState(getAuth())

  const [text, setText] = useState('')
  useEffect(() => {
    const fn = async () => {
      if (!user) return

      const token = await user.getIdToken(true)

      const id = 1 // wip

      console.log('-------')
      const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.status == 200) {
        console.log('success')
        setText(await res.text()) // wiiip
      } else {
        setText('error')
      }
    }

    fn()
  }, [user])

  if (loading) {
    return (
      <>
        <p>loading</p>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <p>you are not logged in</p>
      </>
    )
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div>
      <h1>Detail for {user.email}</h1>
      <p>{text}</p>
    </div>
  )
}

export default ListDetail
