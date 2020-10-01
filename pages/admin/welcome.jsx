import Layout from '../../views/Layout';
import { EmptyElemet, PageTitle } from '../../elements';
import { useState, useEffect } from 'react';
import candidateImg from '../../images/welcome-talento.png';
import companyImg from '../../images/welcome-company.png';
import { Can } from '../../components/Can';

const Welcome = () => {
  return (
    <Layout title="Bienvenido(a)">
      <>
        <PageTitle title="Bienvenido(a)" />
        <Can I="edit" a="JOBS">
          <EmptyElemet
            data={{
              title: 'Ahora eres parte de Umana.',
              content: `Crear empresas y plazas para encontrar los mejores candidatos de la
          plataforma.`,
              beforeButton: 'Crea tu primera empresa',
              buttonTitle: 'Comenzar',
              url: '/admin/companies/add',
              img: companyImg,
            }}
            type="green"
          />
          :
        </Can>
        <Can I="apply" a="JOBS">
          <EmptyElemet
            data={{
              title: 'Ahora eres parte de Umana.',
              content: `Para continuar debes completar tu perfil, asegurate de brindar toda la
            información que se te solicita y ver las mejores plazas para ti.`,
              beforeButton: 'Estas listo(a)',
              buttonTitle: 'Comenzar',
              url: '/admin/profile/edit?current=0',
              img: candidateImg,
            }}
            type="orange"
          />{' '}
          :
        </Can>
      </>
    </Layout>
  );
};

export default Welcome;
