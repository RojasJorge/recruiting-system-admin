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
  let initialState = {
    locationState: 'public',
    interviewPlace: 'office',
    gender: 'indifferent',
    vehicle: ['indifferent'],
    type_license: ['indifferent'],
    age: {
      min: 18,
      max: 60,
    },
    isBranch: false,
    company_state: 'public',
    religion: ['indifferent'],
    dependents: 0,
    relocate: false,
    travel: false,
    salary: {
      currency: {
        code: 'GTQ',
      },
      base_min: 0,
      base_max: 0,
      commission_min: 0,
      commission_max: 0,
    },
  };
  return (
    <Layout title="Agregar Plaza">
      <>
        <PageTitle title="Agregar Plaza" back="/admin/jobs" />
        <div className="umana-layout-cl">
          <div className="umana-layout-cl__small ">
            <Sitebar header={header} data={menuItem} />
          </div>
          <div className="umana-layout-cl__flex width-section bg-white">
            <FormJob data={initialState} companyData={{}} />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default AddJob;
