import Layout from '../../../views/Layout'
import UsersList from '../../../components/user/List'
import { Can } from '../../../components/Can'
import ability from '../../../ability'

const Users = () => {

  const special_alert = _ => {
    return <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime ipsa debitis quasi ut quo, minima odio commodi quae voluptates. Aperiam maiores, ab nam qui reiciendis blanditiis similique exercitationem nemo molestiae?</p>
  }

  return (
    <Layout title="Usuarios">
      <Can I="read" a="USERS">
        {
          ability.can('read', 'SPECIAL_ALERTS')
            ? special_alert()
            : null
        }
        <UsersList />
      </Can>
    </Layout>
  )
}

export default Users
