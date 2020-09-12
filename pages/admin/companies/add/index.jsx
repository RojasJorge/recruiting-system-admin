import Layout from '../../../../views/Layout';
import FormCompany from '../../../../components/Companies/add';
import { PageTitle, Sitebar } from '../../../../elements';

const AddCompany = _ => {
  return (
    <Layout title="Agregar Empresa">
      <>
        <PageTitle title="Agregar Empresa" back="/admin/companies" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar data={[{ icon: 'edit', url: '/admin/companies/editar' }]} />
          </div>
          <div className="umana-layout-cl__flex bg-white">
            <FormCompany />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddCompany;
