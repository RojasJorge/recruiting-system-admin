import Guest from '../../../views/Guest';
import { PageTitle } from '../../../elements';
import SingleJob from '../../../components/jobs/Single';

const Index = query => {
  return (
    <Guest title="Plaza" containerClass="app public-jobs-singe theme-candidate">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob query={query} privateCompany={true} />
      </>
    </Guest>
  );
};

Index.getInitialProps = async ctx => ctx.query;

export default Index;
