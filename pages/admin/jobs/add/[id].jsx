import Layout from '../../../../views/Layout';
import FormJob from '../../../../components/jobs/Add';
import { PageTitle, Sitebar } from '../../../../elements';

const AddJob = _ => {
  const header = {
    title: 'Agregar plaza',
    icon: 'location_city',
    action: 'replay',
    titleAction: 'Volver',
    urlAction: 'back',
  };
  return (
    <Layout title="Agregar Plaza">
      <>
        <PageTitle title="Agregar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} />
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">
            <FormJob />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddJob;
