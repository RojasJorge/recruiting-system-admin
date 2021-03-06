import Layout from '../../../../views/Layout';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import FormCompany from '../../../../components/Companies/add';
import { PageTitle, Sitebar } from '../../../../elements';
import xhr from '../../../../xhr';
import isEmpty from 'lodash';

const AddCompany = _ => {
  const [missing, isMissing] = useState(false);
  const router = useRouter();
  const data = useStoreState(state => state.companies);

  const [company, setCompany] = useState({});

  useEffect(() => {
    xhr()
      .get(`/company/${router.query.id}`)
      .then(res => {
        // res.type = false;
        setCompany(res.data);
      })
      .catch(err => isMissing(true));
  }, []);

  const header = {
    title: data && data.company && data.company.name ? data.company.name : 'Empresa',
    icon: 'location_city',
    action: 'remove_red_eye',
    titleAction: 'Ver perfil',
    urlAction: '/admin/companies/',
    urlDinamic: router.query.id,
  };
  const menuList = [
    {
      icon: 'add_circle_outline',
      title: 'Agregar plaza',
      url: '/admin/jobs/add/',
      id: router.query.id,
    },
    {
      icon: 'arrow_back',
      title: 'Ver plazas',
      url: '/admin/jobs',
    },
  ];

  return (
    <Layout title="Editar Empresa">
      <>
        <PageTitle title="Editar Empresa" back="/admin/companies" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} data={menuList} />
          </div>
          <div className="umana-layout-cl__flex bg-white">
            <FormCompany
              data={
                data && data.company && data.company.items
                  ? data.company.items[0]
                  : !isEmpty(company)
                  ? company
                  : {}
              }
              action="edit"
              id={router.query.id}
            />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddCompany;
