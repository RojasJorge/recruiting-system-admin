import Layout from '../../../../views/Layout';
import { PageTitle } from '../../../../elements';
import SingleJob from '../../../../components/jobs/Single';

const Index = _ => {
  return (
    <Layout title="Plaza">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob />
      </>
    </Layout>
  );
};

export default Index;
