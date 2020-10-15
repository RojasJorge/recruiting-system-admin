import Layout from '../../../views/Layout';
import { EmptyElemet, PageTitle } from '../../../elements';
import candidateImg from '../../../images/welcome-talento.png';
import { useEffect, useState } from 'react';
import xhr from '../../../xhr';
import { isEmpty } from 'lodash';
import Applications from '../../../components/Applications';
import Filters from '../../../components/Applications/Filters';

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
    companyId: null,
  };

  const [filters, setFilters] = useState(initialValues);

  const [applications, setApplications] = useState({
    list: [],
    total: 0,
  });

  const getApply = _ => {
    let applyFilters = `?page=${filters.page}&offset=${filters.offset}`;

    if (filters.companyId) {
      applyFilters += `&companyId=${filters.companyId}`;
    }

    xhr()
      .get(`/apply${applyFilters}`)
      .then(resp => setApplications({ ...applications, list: resp.data }))
      .catch(err => console.log(err));

    return;
  };

  useEffect(() => {
    getApply();
  }, [filters.page, filters.offset, filters.companyId]);

  return (
    <Layout title="Mis aplicaciones">
      <>
        <PageTitle title="Mis aplicaciones" />

        {!isEmpty(applications.list) ? (
          <>
            <Filters filters={filters} setFilters={setFilters} />
            {applications.list.map(apply => (
              <>
                <h2>{apply.name}</h2>
                <Applications
                  key={apply.id}
                  applications={apply.applications}
                  // total={applications.total}
                />
              </>
            ))}
          </>
        ) : (
          <div className="umana-list list-empty" style={{ marginTop: 80 }}>
            <EmptyElemet data={dataEmpty} type="orange" />
          </div>
        )}
      </>
    </Layout>
  );

  // return (
  // 	<Layout title="Mis aplicaciones">
  // 		<>
  // 			<PageTitle title="Mis aplicaciones"/>
  // 			{/*<pre>{JSON.stringify(applications, false, 2)}</pre>*/}
  // 			<div className="umana-list list-empty" style={{marginTop: 80}}>
  // 				<EmptyElemet data={dataEmpty} type="orange"/>
  // 			</div>
  // 		</>
  // 	</Layout>
  // );
};

export default Index;
