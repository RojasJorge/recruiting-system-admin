import Layout from '../../../views/Layout';
import Companies from '../../../components/Companies';
import { PageTitle } from '../../../elements';

const Index = _ => {
  return (
    <Layout title="Catalogos">
      <PageTitle title="Empresas" />
      <Companies />
    </Layout>
  );
};

export default Index;
