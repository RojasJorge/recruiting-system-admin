import Layout from '../../../views/Layout';
import { PageTitle, EmptyElemet } from '../../../elements';
import candidateImg from '../../../images/welcome-talento.png';
import {useEffect, useState} from "react";
import xhr from "../../../xhr";
import {isEmpty} from 'lodash'
import Applications from "../../../components/Applications";
import App from "next/app";

const dataEmpty = {
  title: 'Aún no has aplicado a ninguna plaza',
  content: `Busca oportunidades en la sección de plazas disponibles`,
  
  buttonTitle: 'Buscar oportunidades',
  url: '/admin/jobs',
  img: candidateImg,
};

const Index = _ => {
  
  const initialValues = {
    page: 1,
    offset: 10,
    companyId: null
  }
  
  const [filters, setFilters] = useState(initialValues)
  const [applications, setApplications] = useState([])
  
  const getApply = _ =>
    xhr()
      .get('/apply')
      .then(resp => setApplications(resp.data))
      .catch(err => console.log(err))
  
  useEffect(() => {
    getApply()
  }, [])
  
  if(!isEmpty(applications)) {
    return (
      <Layout title="Mis aplicaciones">
        <>
          <PageTitle title="Mis aplicaciones" />
          {/*<pre>{JSON.stringify(applications, false, 2)}</pre>*/}
          <Applications applications={applications} total={0}/>
        </>
      </Layout>
    );
  }
  
  return (
    <Layout title="Mis aplicaciones">
      <>
        <PageTitle title="Mis aplicaciones" />
        {/*<pre>{JSON.stringify(applications, false, 2)}</pre>*/}
        <div className="umana-list list-empty" style={{ marginTop: 80 }}>
          <EmptyElemet data={dataEmpty} type="orange" />
        </div>
      </>
    </Layout>
  );
};

export default Index;
