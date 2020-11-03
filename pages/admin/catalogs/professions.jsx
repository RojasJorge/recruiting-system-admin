import Layout from '../../../views/Layout';
import { PageTitle } from '../../../elements';
import List from '../../../components/catalogs/List';
import Link from "next/link";
import {RollbackOutlined} from '@ant-design/icons'

const Professions = () => {
  return (
    <Layout title="Profesiones">
      <>
        <PageTitle title="Profesiones" back="/admin/catalogs" />
        <h3 style={{marginBottom: 30}}>
          <Link href="/admin/catalogs" passHref>
            <a><RollbackOutlined /> Volver</a>
          </Link>
        </h3>
        <List type="career" title="Profesiones" />
      </>
    </Layout>
  );
};

export default Professions;
