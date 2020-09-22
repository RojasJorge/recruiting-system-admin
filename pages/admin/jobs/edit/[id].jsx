import Layout from '../../../../views/Layout';
import EditJob from '../../../../components/jobs/Edit';

import { PageTitle } from '../../../../elements';

const Edit = _ => {
  return (
    <Layout title="Editar Plaza">
      <>
        <PageTitle title="Editar Plaza" back="/admin/jobs" />
        <EditJob />
      </>
    </Layout>
  );
};

export default Edit;
