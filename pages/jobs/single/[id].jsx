import Guest from '../../../views/Guest';
import { PageTitle } from '../../../elements';
import SingleJob from '../../../components/jobs/Single';

const Index = _ => {
  return (
    <Guest title="Plaza" containerClass="app public-jobs-singe theme-candidate">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob />
      </>
    </Guest>
  );
};

export default Index;
