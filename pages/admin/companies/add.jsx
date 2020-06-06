import Layout from '../../../views/Layout';
import FormCompany from '../../../components/Companies/add';
import { PageTitle } from '../../../elements';

const AddCompany = _ => {
  return (
    <Layout title="Agregar Empresa">
      <PageTitle title="Agregar Empresa" />
      <FormCompany />
    </Layout>
  );
};

export default AddCompany;
