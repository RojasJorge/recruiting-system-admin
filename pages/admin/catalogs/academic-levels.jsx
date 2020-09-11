import Layout from '../../../views/Layout';
import { PageTitle } from '../../../elements';
import List from '../../../components/catalogs/List';

const AcademicLevels = () => {
  return (
    <Layout title="Niveles académicos">
      <>
        <PageTitle title="Profesiones" back="/admin/catalogs" />
        <List type="career" title="Profesiones" />
      </>
    </Layout>
  );
};

export default AcademicLevels;
