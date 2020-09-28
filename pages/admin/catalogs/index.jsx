import Layout from '../../../views/Layout';
import Catalogs from '../../../components/catalogs';
import { PageTitle } from '../../../elements';

const Index = _ => {
  return (
    <Layout title="Catalogos">
      <>
        <PageTitle title="Catálogos" />
        <Catalogs />
      </>
    </Layout>
  );
};

export default Index;
