import Layout from '../../../views/Layout';
import { useStoreState } from 'easy-peasy';
import { PageTitle, Sitebar } from '../../../elements';
import SingleProfile from '../../../components/user/single';

const Index = _ => {
  const user = useStoreState(state => state.auth.user);
  const header = {
    title: user ? user.name + ' ' + user.lastname : 'perfil',
    icon: 'person',
    action: 'edit',
    titleAction: 'Editar perfil',
    urlAction: '/admin/profile/edit?current=0',
  };
  const menuList = [
    {
      icon: 'person',
      title: 'Personal',
      url: '#general',
    },
    {
      icon: 'insert_drive_file',
      title: 'Contacto',
      url: '#contact',
    },
    {
      icon: 'contacts',
      title: 'Acerca de ti',
      url: '#aboutme',
    },
    {
      icon: 'search',
      title: '¿Qué buscas?',
      url: '#whatsearch',
    },
    {
      icon: 'school',
      title: 'Niveles académicos',
      url: '#academiclevel',
    },
    {
      icon: 'work',
      title: 'Experiencia laboral',
      url: '#experience',
    },
    {
      icon: 'monetization_on',
      title: 'Económica / Legal',
      url: '#economic',
    },
  ];
  return (
    <Layout title="Mi perfil" className="profile">
      <>
        <PageTitle title="Mi perfil" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} theme="orange" data={menuList} />
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
