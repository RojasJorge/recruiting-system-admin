import { useEffect } from 'react'
import Layout from '../../views/Layout'

const Admin = _ => {
  useEffect(() => {
    // console.log('Router on admin:', Router);
    if (localStorage.getItem('eToken')) {
      // Router.push("/login");
    }
  }, [])

  return (
    <Layout title="Tablero">
      <h1>Dashboard</h1>
    </Layout>
  )
}

export default Admin
