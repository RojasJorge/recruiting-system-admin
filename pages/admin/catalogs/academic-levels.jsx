import Layout from '../../../views/Layout'
// import { PageTitle } from 'antd'
import List from '../../../components/catalogs/List'

const AcademicLevels = () => {
  return (
    <Layout title="Niveles académicos">
      
      {/* <PageTitle title="Niveles Académicos" back="/admin/catalogs" /> */}
      <List type="career" title="Niveles Académicos" />
    </Layout>
  )
}

export default AcademicLevels
