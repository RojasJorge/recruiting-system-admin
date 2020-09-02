import Layout from '../../../views/Layout';
import Jobs from '../../../components/jobs';
import { PageTitle } from '../../../elements';

const Index = _ => {
  return (
    <Layout title="Plazas">
      <>
        <PageTitle title="Plazas" />
        <Jobs />
      </>
    </Layout>
  );
};

export default Index;
