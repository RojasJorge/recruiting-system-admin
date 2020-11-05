import Layout from '../../../views/Layout';
import { useStoreState } from 'easy-peasy';
import { PageTitle, Sitebar } from '../../../elements';
import SingleProfileCandidate from '../../../components/user/single/userProfile';
import { useEffect, useState } from 'react';
import xhr from '../../../xhr';

const Index = query => {
  const [user, setUser] = useState({});

  const getUser = () => {
    xhr()
      .get(`/user/${query.id}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getUser();
  }, []);

  const header = {
    title: user ? user.name + ' ' + user.lastname : 'perfil',
    icon: 'person',
    action: 'replay',
    titleAction: 'Volver',
    urlAction: 'back',
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
    <Layout title="Candidato" className="profile">
      <>
        <PageTitle title="Perfil de candidato" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} theme="orange" data={menuList}></Sitebar>
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">
            <SingleProfileCandidate query={query} data={user} />
          </div>
        </div>
      </>
    </Layout>
  );
};

Index.getInitialProps = async ctx => ctx.query;

export default Index;
