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

  const age = [data.job.age.min, data.job.age.max];
  data.job.age = age;
  console.log('edit', data);
  return (
    <Layout title="Editar Plaza">
      <>
        <PageTitle title="Editar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} />
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
