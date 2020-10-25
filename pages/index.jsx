import Router from 'next/router'
import Login from '../components/user/Login'
import { useEffect, useState } from 'react'
import {SyncOutlined} from '@ant-design/icons'

const Index = _ => {
  
  const [loading, setLoading] = useState(true)
  const [loggedIn, checkSession] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('uToken')) {
      Router.push('/admin')
      checkSession(true)
    }
    setTimeout(() => {
      setLoading(false)
      
    }, 1000);
  }, []);

  if(loading && loggedIn) {
    return (
      <div className="app--spinner animated fadeIn">
        <SyncOutlined style={{ fontSize: 60 }} spin />
      </div>
    )
  } else {
    return (<Login/>)
  }
}

export default Index
