import Layout from '../../../../views/Layout';
import FormCompany from '../../../../components/Companies/add';
import { PageTitle } from '../../../../elements';

const AddCompany = _ => {
  return (
    <Layout title="Agregar Empresa">
      <PageTitle title="Agregar Empresa" back="/admin/companies" />
      <div className="umana-layout-cl bg-color">
        <div className="umana-layout-cl__small ">
          <h4>avatar</h4>
        </div>
        <div className="umana-layout-cl__flex bg-white">
          <FormCompany />
        </div>
      </div>
    </Layout>
  );
};

export default AddCompany;
