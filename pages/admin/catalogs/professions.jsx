import Layout from '../../../views/Layout'
// import { PageTitle } from 'antd'
import List from '../../../components/catalogs/List'

const Professions = () => {
  return (
    <Layout title="Profesiones">
      {/* <PageTitle title="Profesiones" back="/admin/catalogs" /> */}
      <List type="academic-level" title="Profesiones" />
    </Layout>
  )
}

export default Professions
