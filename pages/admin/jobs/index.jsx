import Layout from '../../../views/Layout';
import Jobs from '../../../components/jobs';
import { PageTitle } from '../../../elements';
import { Button } from 'antd';
import { Can } from '../../../components/Can';
import Link from 'next/link';

const Index = _ => {
  return (
    <Layout title="Plazas">
      <>
        <PageTitle title="Plazas" />
        <div className="umana-subtitle">
          {/* {ability.can('read', 'SPECIAL_ALERTS') ? special_alert() : null} */}
          <Button type="link" size="large">
            <Link href="/admin/jobs/add" passHref>
              <a>
                <i className="material-icons">add</i>Crear plaza
              </a>
            </Link>
          </Button>
        </div>
        <Jobs />
      </>
    </Layout>
  );
};

export default Index;
