import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import React, {useEffect, FC, useState} from 'react'
import {useRouter} from 'next/router'
import {auth} from '../utils/firebase'
import {ComponentButton} from '../component'

const Home: FC<any> = (props) => {
  const router = useRouter()
  const [currentUser, setCurrenUser] = useState<null | object>(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user ? setCurrenUser(user) : router.push('/signin')
    })
  }, [])

  const logOut = async () => {
    try {
      await auth.signOut()
      router.push('/signin')
    } catch(err) {
      alert(err.message)
    }
  }

  return (
  <div>
    <pre>{currentUser && JSON.stringify(currentUser, null, 4)}</pre>

    <h1>{}</h1>
    <ComponentButton 
      onClick={logOut}
      label={"サインアウト"}
    />
  </div>
 )
}



export default Home