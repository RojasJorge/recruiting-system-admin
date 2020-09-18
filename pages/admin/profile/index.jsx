import Layout from '../../../views/Layout';
import UserProfile from '../../../components/user/profile';
import {Empty} from 'antd'

const Index = _ => (
  <Layout title="Mi perfil" className="profile">
    <div className="row">
      <div className="col">
        <Empty/>
      </div>
    </div>
  </Layout>
);

export default Index;
