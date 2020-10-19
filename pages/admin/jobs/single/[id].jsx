import Layout from '../../../../views/Layout';
import { PageTitle } from '../../../../elements';
import SingleJob from '../../../../components/jobs/Single';

const Index = ({query}) => {
  // console.log('QUERY FROM INITIAL PROPS--------:', query)
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
  console.log('ctx:', ctx)
  return {query: ctx.query}
}

export default Index
