import Guest from '../../views/Guest';
import Jobs from '../../components/jobs';
import { PageTitle } from '../../elements';

const Index = _ => {
  const dataEmpty = {
    title: 'No hay plazas publicas.',
    content: 'En este momento no se han encotrado plazas publicas, visitanos más.',
  };

  return (
    <Guest pageTitle="Plazas disponibles" containerClass="app public-jobs theme-candidate" layoutClass="umana-layout-big">
      <>
        <PageTitle title="Plazas" />
        <Jobs empty={dataEmpty} />
      </>
    </Guest>
  );
};

export default Index;
