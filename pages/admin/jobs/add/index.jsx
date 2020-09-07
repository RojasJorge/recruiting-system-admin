import Layout from '../../../../views/Layout';
import FormJob from '../../../../components/jobs/add';
import { PageTitle, Sitebar } from '../../../../elements';

const AddJob = _ => {
  return (
    <Layout title="Agregar Plaza">
      <>
        <PageTitle title="Agregar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar />
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
