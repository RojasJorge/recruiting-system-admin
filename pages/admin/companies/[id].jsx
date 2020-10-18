import Layout from '../../../views/Layout';
import Single from '../../../components/Companies/Single';
import { PageTitle } from '../../../elements';

const SingleCompany = ({query}) => (
  <Layout title="Perfil de la empresa">
    <>
      <PageTitle title="Perfil de la empresa" />
      <Single query={query} />
    </>
  </Layout>
);

SingleCompany.getInitialProps = async (ctx) => {
  return {query: ctx.query}
}

export default SingleCompany;
