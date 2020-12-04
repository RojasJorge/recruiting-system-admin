import { PageTitle, Sitebar } from '../../elements';
import { Steps } from 'antd';
import { useState } from 'react';
import ListCandidate from './archive/candidates';
import ListCompanies from './archive/companies';

const { Step } = Steps;

const UsersList = () => {
  const [current, setCurrent] = useState(0);

  const switchTabs = _ => {
    switch (current) {
      case 0:
        return <ListCandidate />;
        break;
      case 1:
        return <ListCompanies />;
        break;
      default:
        return <ListCandidate />;
        break;
    }
  };

  const handleSteps = o => {
    setCurrent(o);
  };

  return (
    <div className="">
      <PageTitle title="Lista de usuarios" />
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small">
          <Sitebar>
            <Steps current={current} onChange={handleSteps} direction="vertical">
              <Step key={0} title="Candidatos" icon={<i className="material-icons">group</i>} />
              <Step key={1} title="Empresas" icon={<i className="material-icons">business</i>} />
            </Steps>
          </Sitebar>
        </div>
        <div className="umana-layout-cl__flex">{switchTabs()}</div>
      </div>
    </div>
  );
};

export default UsersList;
