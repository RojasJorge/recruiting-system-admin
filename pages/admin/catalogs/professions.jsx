import Layout from '../../../views/Layout';
import { PageTitle } from '../../../elements';
import List from '../../../components/catalogs/List';

const Professions = () => {
  return (
    <Layout title="Niveles académicos">
      <>
        <PageTitle title="Niveles Académicos" back="/admin/catalogs" />
        <List type="academic-level" title="Profesiones" />
      </>
    </Layout>
  );
};

export default Professions;
