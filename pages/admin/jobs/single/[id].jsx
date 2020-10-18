import Layout from '../../../../views/Layout';
import { PageTitle } from '../../../../elements';
import SingleJob from '../../../../components/jobs/Single';

const Index = ({query}) => {
  return (
    <Layout title="Plaza">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob query={query} />
      </>
    </Layout>
  );
};

Index.getInitialProps = async (ctx) => {
  return {query: ctx.query}
}

export default Index
