import Layout from '../../../views/Layout';
import JobsCompanies from '../../../components/jobs/company';
import { PageTitle } from '../../../elements';

const Index = _ => {
  return (
    <Layout title="Plazas">
      <>
        <PageTitle title="Plazas" />
        <JobsCompanies />
      </>
    </Layout>
  );
};

export default Index;
