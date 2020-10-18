import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useRouter } from 'next/router';
import xhr from '../../xhr';
import FormCompany from '../../components/Companies/add';
import { Sitebar } from '../../elements';
import { Can } from '../../components/Can';
import SingleData from '../../components/Companies/single/data';
import CompanyJobs from '../../components/Companies/job';
import FormJob from '../../components/jobs/Add';
import { Steps, Button } from 'antd';

const { Step } = Steps;

const Single = ({query}) => {
  const [missing, isMissing] = useState(false);
  const router = useRouter();
  const [company, setCompany] = useState({});
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    
      xhr()
        .get(`/company/${query.id}`)
        .then(res => {
          setCompany(res.data);
        })
        .catch(err => isMissing(true));
      
  }, []);

  const header = {
    title: company && company.name ? company.name : 'Empresa',
    icon: 'business',
    action: 'replay',
    titleAction: 'Volver',
    urlAction: 'back',
  };
  const header1 = {
    title: company && company.name ? company.name : 'Empresa',
    icon: 'location_city',
    action: 'back',
  };

  const initialState = {
    locationState: 'public',
    interviewPlace: 'office',
    gender: 'indifferent',
    vehicle: 'indifferent',
    type_license: 'indifferent',
    age: [18, 60],
    isBranch: false,
    company_state: 'public',
    religion: ['indifferent'],
  };

  const switchContent = _ => {
    switch (current) {
      case 3:
        return (
          <>
            <div className="umana-title">
              <h2>{`Agregar plaza de ${company ? company.name : 'esta empresa'}`}</h2>
            </div>
            <FormJob data={initialState} company={false} setCurrent={setCurrent} />
          </>
        );
        break;
      case 2:
        return <CompanyJobs title={company ? company.name : 'la empresa'} id={router.query.id} />;
        break;
      case 1:
        return (
          <>
            <div className="umana-title">
              <h2>{`Editar ${company ? company.name : 'la empresa'}`}</h2>
            </div>
            <div className="umana-form--section">
              <FormCompany data={company} action="edit" id={router.query.id} />
            </div>
          </>
        );
        break;
      case 0:
        return <SingleData company={company} />;
        break;
      default:
        return null;
        break;
    }
  };

  const onChange = o => {
    setCurrent(o);
  };
  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small">
        <Can I="edit" a="COMPANIES">
          <Sitebar header={header}>
            <Steps current={current} onChange={onChange} direction="vertical">
              <Step
                key={0}
                title="Perfil de empresa"
                icon={<i className="material-icons">business</i>}
              />
              <Step key={1} title="Editar empresa" icon={<i className="material-icons">edit</i>} />
              <Step
                key={2}
                title="Ver plazas"
                icon={<i className="material-icons">remove_red_eye</i>}
              />
              <Step
                key={3}
                title="Agregar plazas"
                icon={<i className="material-icons">add_circle_outline</i>}
              />
            </Steps>
            ,
          </Sitebar>
        </Can>
        <Can I="apply" a="JOBS">
          <Sitebar header={header1} />
        </Can>
      </div>
      <div
        className={`umana-layout-cl__flex ${
          current !== 2 && current !== 3 && current !== 1 ? 'bg-white' : 'width-section'
        }`}
      >
        {switchContent()}
      </div>
    </div>
  );
};

export default Single;
