import Layout from '../../../views/Layout';
import { useStoreState } from 'easy-peasy';
import { PageTitle, Sitebar } from '../../../elements';
import SingleProfile from '../../../components/user/single';

const Index = _ => {
  const user = useStoreState(state => state.auth.user);
  const header = {
    title: user.name + ' ' + user.lastname,
    icon: 'person',
    action: 'edit',
    titleAction: 'Editar perfil',
    urlAction: '/admin/profile/edit?current=0',
  };
  return (
    <Layout title="Mi perfil" className="profile">
      <>
        <PageTitle title="Mi perfil" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} theme="orange" />
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">
            <SingleProfile />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default Index;
