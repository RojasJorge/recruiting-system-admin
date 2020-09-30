import Layout from '../../../views/Layout';
import Jobs from '../../../components/jobs';
import { PageTitle } from '../../../elements';
import { Button } from 'antd';
import { Can } from '../../../components/Can';
import Link from 'next/link';

const Index = _ => {
  const dataEmpty = {
    title: 'No tienes ninguna plaza publicada',
    content: 'Selecciona una empresa y publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.',
    buttonTitle: 'Agregar plaza',
    url: '/admin/companies',
  };

  return (
    <Layout title="Plazas">
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
        <Jobs empty={dataEmpty} />
      </>
    </Layout>
  );
};

export default Index;
