import Layout from '../../../views/Layout';
import { PageTitle, EmptyElemet } from '../../../elements';
import candidateImg from '../../../images/welcome-talento.png';

const Index = _ => {
  const dataEmpty = {
    title: 'Aún no has aplicado a ninguna plaza',
    content: `Busca oportunidades en la sección de plazas disponibles`,

    buttonTitle: 'Buscar oportunidades',
    url: '/admin/jobs',
    img: candidateImg,
  };
  return (
    <Layout title="Mis aplicaciones">
      <>
        <PageTitle title="Mis aplicaciones" />
        <div className="umana-list list-empty" style={{ marginTop: 80 }}>
          <EmptyElemet data={dataEmpty} type="orange" />
        </div>
      </>
    </Layout>
  );
};

export default Index;
