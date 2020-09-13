import Layout from '../../../views/Layout';
import { PageTitle } from '../../../elements';
import List from '../../../components/catalogs/List';

const AcademicLevels = () => {
  return (
    <Layout title="Niveles académicos">
      <>
        <PageTitle title="Niveles académicos" back="/admin/catalogs" />
        <List type="academic_level" title="Niveles académicos" />
      </>
    </Layout>
  );
};

export default AcademicLevels;
