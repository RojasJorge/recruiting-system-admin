import Layout from '../../../../views/Layout';
import FormJob from '../../../../components/jobs/Add';
import { useRouter } from 'next/router';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { PageTitle, Sitebar } from '../../../../elements';

const EditJob = _ => {
  const router = useRouter();
  const data = useStoreState(state => state.jobs);
  const header = {
    title: 'Empresa',
    icon: 'location_city',
    action: 'remove_red_eye',
    titleAction: 'Ver plaza',
    urlAction: '/admin/jobs/single/',
    urlDinamic: router.query.id,
  };
  let age = [];
  if (data && data.job && data.job[0] && data.job.age) {
    age = [data.job[0].age.min, data.job[0].age.max];
  }
  if (data.job) {
    data.job[0].age = age;
  }
  
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
  return (
    <Layout title="Editar Plaza">
      <>
        <PageTitle title="Editar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} data={menuItem} />
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">
            <FormJob data={data.job} type="edit" />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default EditJob;
