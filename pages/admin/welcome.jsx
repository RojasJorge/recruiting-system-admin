import Layout from '../../views/Layout';
import { EmptyElemet, PageTitle } from '../../elements';
import { useState, useEffect } from 'react';
import candidateImg from '../../images/welcome-talento.png';
import companyImg from '../../images/welcome-company.png';

const Welcome = () => {
  const [scope, setScope] = useState('candidate');
  const getScope = () => {
    const _scope = localStorage.getItem('uScopes') ? JSON.parse(localStorage.getItem('uScopes')) : null;
    if (_scope) {
      setScope(_scope);
    }
  };

  useEffect(() => {
    getScope();
  }, []);

  const candidateEmpty = {
    title: 'Ahora eres parte de Umana.',
    content: `Para continuar debes completar tu perfil, asegurate de brindar toda la
      información que se te solicita y ver las mejores plazas para ti.`,
    beforeButton: 'Estas listo(a)',
    buttonTitle: 'Comenzar',
    url: '/admin/profile/edit?current=0',
    img: candidateImg,
  };

  const companyEmpty = {
    title: 'Ahora eres parte de Umana.',
    content: `Crear empresas y plazas para encontrar los mejores candidatos de la
    plataforma.`,
    beforeButton: 'Crea tu primera empresa',
    buttonTitle: 'Comenzar',
    url: '/admin/companies/add',
    img: companyImg,
  };

  return (
    <Layout title="Bienvenido(a)">
      <>
        <PageTitle title="Bienvenido(a)" />
        {scope == 'candidate' ? <EmptyElemet data={candidateEmpty} type="orange" /> : <EmptyElemet data={companyEmpty} type="green" />}
      </>
    </Layout>
  );
};

export default Welcome;
