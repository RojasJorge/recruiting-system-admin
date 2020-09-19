import Layout from '../../../views/Layout';
import UserProfile from '../../../components/user/profile';
import {EditOutlined} from '@ant-design/icons'
import {Empty} from 'antd'
import Link from 'next/link'
import router from 'next/router'

const Index = _ => (
  <Layout title="Mi perfil" className="profile">
    <div className="row">
      <div className="col">
        <Link href="/admin/profile/edit?current=0" passHref>
          <a>
            <EditOutlined /> Editar
          </a>
        </Link>
      </div>
      <div className="col-md-12">
        <Empty/>
      </div>
    </div>
  </Layout>
);

export default Index;
