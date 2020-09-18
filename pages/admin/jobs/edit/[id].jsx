import Layout from '../../../../views/Layout';
import FormJob from '../../../../components/jobs/Add';
import { useRouter } from 'next/router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { PageTitle, Sitebar } from '../../../../elements';
import { isEmpty } from 'lodash';
import xhr from '../../../../xhr';

const EditJob = _ => {
  const router = useRouter();
  const data = useStoreState(state => state.jobs);
  const fill = useStoreActions(actions => actions.jobs.fill);

  const header = {
    title: 'Empresa',
    icon: 'location_city',
    action: 'remove_red_eye',
    titleAction: 'Ver plaza',
    urlAction: '/admin/jobs/single/',
    urlDinamic: router.query.id,
  };

  useEffect(() => {
    xhr()
      .get(`/job/${router.query.id}`)
      .then(res => {
        res.type = false;
        fill(res);
        // setJob(res.data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  const menuItem = [
    {
      icon: 'turned_in',
      title: 'Información General',
      url: '#maininfo',
    },
    {
      icon: 'edit_location',
      title: 'Ubicación',
      url: '#location',
    },
    {
      icon: 'grade',
      title: 'Requerimientos',
      url: '#requirements',
    },
    {
      icon: 'language',
      title: 'Idiomas',
      url: '#languages',
    },
    {
      icon: 'school',
      title: 'Nivel Académicos',
      url: '#academic-level',
    },
    {
      icon: 'account_balance_wallet',
      title: 'Compensación y beneficios',
      url: '#compensation',
    },
  ];
  console.log('edit', data.job);
  return (
    <Layout title="Editar Plaza">
      <>
        <PageTitle title="Editar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} data={menuItem} />
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">{data.job ? <FormJob data={data.job} type="edit" id={router.query.id} /> : null}</div>
        </div>
      </>
    </Layout>
  );
};

export default EditJob;
