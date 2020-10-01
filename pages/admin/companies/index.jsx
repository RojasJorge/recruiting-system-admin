import Layout from '../../../views/Layout';
import Companies from '../../../components/Companies';
import { PageTitle } from '../../../elements';
import { Button } from 'antd';
import Link from 'next/link';
import { Can } from '../../../components/Can';

const Index = _ => {
  return (
    <Layout title="Catalogos">
      <>
        <PageTitle title="Empresas" />
        <div className="umana-subtitle">
          <Can I="add" a="COMPANIES">
            <Button type="link" size="large">
              <Link href="/admin/companies/add" passHref>
                <a>
                  <i className="material-icons">add</i>Agregar empresa
                </a>
              </Link>
            </Button>
          </Can>
        </div>
        <Companies />
      </>
    </Layout>
  );
};

export default Index;
