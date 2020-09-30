import Guest from '../../views/Guest';
import Jobs from '../../components/jobs';
import { PageTitle } from '../../elements';

const Index = _ => {
  const dataEmpty = {
    title: 'No hay plazas plazas publicas.',
    content: 'En este momento no se han encotrado plazas publicas, visitanos más.',
  };

  return (
    <Guest title="Plazas">
      <>
        <PageTitle title="Plazas" />
        <Jobs empty={dataEmpty} />
      </>
    </Guest>
  );
};

export default Index;