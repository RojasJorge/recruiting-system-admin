import Layout from '../../../../views/Layout';
import { PageTitle } from '../../../../elements';
import SingleJob from '../../../../components/jobs/Single';

const Index = query => {
  return (
    <Layout title="Plaza" className="single-jobs">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob query={query} />
      </>
    </Layout>
  );
};

Index.getInitialProps = async ctx => ctx.query;

export default Index;
