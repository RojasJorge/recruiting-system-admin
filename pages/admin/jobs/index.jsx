import Layout from '../../../views/Layout';
import Jobs from '../../../components/jobs';
import { PageTitle } from '../../../elements';
import { Button } from 'antd';
import { Can } from '../../../components/Can';
import Link from 'next/link';
import { AbilityContext } from '../../../components/Can';
import { useContext } from 'react';

const Index = _ => {
  const ability = useContext(AbilityContext);
  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/jobs/add',
  };
  const dataEmptyCandidate = {
    title: 'No hay plazas disponibles',
    content: '',
  };

  return (
    <Layout title="Plazas" containerClass="app public-jobs">
      <>
        <PageTitle title="Plazas" />
        <div className="umana-subtitle">
          {/* {ability.can('read', 'SPECIAL_ALERTS') ? special_alert() : null} */}
          <Can I="edit" a="JOBS">
            <Button type="link" size="large">
              <Link href="/admin/jobs/add" passHref>
                <a>
                  <i className="material-icons">add</i>Crear plaza
                </a>
              </Link>
            </Button>
          </Can>
        </div>
        {ability.can('apply', 'JOBS') ? <Jobs empty={dataEmptyCandidate} /> : <Jobs empty={dataEmpty} />}
      </>
    </Layout>
  );
};

export default Index;
