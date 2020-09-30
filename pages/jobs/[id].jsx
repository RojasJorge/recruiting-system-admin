import Guest from '../../views/Guest';
import { PageTitle } from '../../elements';
import SingleJob from '../../components/jobs/Single';

const Index = _ => {
  return (
    <Guest title="Plaza">
      <>
        <PageTitle title="Ver Plaza" />
        <SingleJob />
      </>
    </Guest>
  );
};

export default Index;
