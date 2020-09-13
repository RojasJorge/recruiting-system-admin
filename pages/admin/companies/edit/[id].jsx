import Layout from '../../../../views/Layout';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import FormCompany from '../../../../components/Companies/add';
import { PageTitle, Sitebar } from '../../../../elements';
import xhr from '../../../../xhr';

const AddCompany = _ => {
  const router = useRouter();
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);
  const [missing, isMissing] = useState(false);
  const [company, setCompany] = useState({});

  useEffect(() => {
    xhr()
      .get(`/company/${router.query.id}`)
      .then(res => {
        res.type = false; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(err => isMissing(true));
  }, [data]);
  const header = {
    title: data && data.name ? data.name : 'Empresa',
    icon: 'location_city',
    action: 'remove_red_eye',
    titleAction: 'Ver perfil',
    urlAction: '/admin/companies/' + router.query.id,
  };

  console.log('data..', data);
  return (
    <Layout title="Editar Empresa">
      <>
        <PageTitle title="Editar Empresa" back="/admin/companies" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} />
          </div>
          <div className="umana-layout-cl__flex bg-white">
            <FormCompany data={data.company} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddCompany;
