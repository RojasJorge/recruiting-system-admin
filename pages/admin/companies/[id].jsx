import Layout from '../../../views/Layout';
import Single from '../../../components/Companies/Single';
import { PageTitle } from '../../../elements';

const SingleCompany = _ => (
  <Layout title="Perfil de la empresa">
    <>
      <PageTitle title="Perfil de la empresa" />
      <Single />
    </>
  </Layout>
);

export default SingleCompany;
