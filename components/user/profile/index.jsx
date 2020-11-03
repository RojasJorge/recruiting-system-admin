import { useState } from 'react';
import { useStoreState } from 'easy-peasy';
import { Steps } from 'antd';
import Personal from './personal';
import Documents from './Documents';
import About from './personal/About';
import LookingFor from './LookingFor';
import AcademicLevels from './AcademicLevels';
import Experiences from './Experiences';
import Economic from './Economic';
import Others from './Others';
import Courses from './Courses';
import router from 'next/router';
import { PageTitle, Sitebar } from '../../../elements';
import Dashboard from "./Dashboard";

const { Step } = Steps;

const checkList = [
  {
    title: 'Personal',
    id: 'personal',
    icon: 'person',
  },
  {
    title: 'Documentos',
    id: 'documents',
    icon: 'attachment',
  },
  {
    title: 'Acerca de',
    id: 'about',
    icon: 'contacts',
  },
  {
    title: '¿Qué buscas?',
    id: 'looking-for',
    icon: 'search',
  },
  {
    title: 'Niveles Académicos',
    id: 'academic-levels',
    icon: 'school',
  },
  {
    title: 'Otros Cursos',
    id: 'other',
    icon: 'book',
  },
  {
    title: 'Otros Conocimientos',
    id: 'other-knowledge',
    icon: 'collections_bookmark',
  },
  {
    title: 'Experiencia Laboral',
    id: 'work-experience',
    icon: 'work',
  },
  {
    title: 'Económica / Legal ',
    id: 'economic-legal',
    icon: 'monetization_on',
  },
];

const UserProfile = ({ query }) => {
  /** Global state */
  const user = useStoreState(state => state.auth.user);

  /** Local state */
  const [current, switchCurrent] = useState(parseInt(query.current, 10) || 0);

  const onChange = o => {
    switchCurrent(o);
    router.push(`${router.pathname}?current=${o}`);
    window.scroll({
      top: 80,
      behavior: 'smooth',
    });
  };

  const status = o => {
    let s = 'wait';
    if (o === current) {
      s = 'process';
    } else if (o !== current && o < current) {
      s = 'finish';
    }

    return s;
  };

  const switchStep = _ => {
    switch (current) {
      case 0:
        return <Personal switchCurrent={switchCurrent} current={current} />;
        break;
      case 1:
        return <Documents switchCurrent={switchCurrent} current={current} />;
        break;
      case 2:
        return <About switchCurrent={switchCurrent} current={current} />;
        break;
      case 3:
        return <LookingFor switchCurrent={switchCurrent} current={current} />;
        break;
      case 4:
        return <AcademicLevels switchCurrent={switchCurrent} current={current} />;
        break;
      case 5:
        return <Courses switchCurrent={switchCurrent} current={current} />;
        break;
      case 6:
        return <Others switchCurrent={switchCurrent} current={current} />;
        break;
      case 7:
        return <Experiences switchCurrent={switchCurrent} current={current} />;
        break;
      case 8:
        return <Economic switchCurrent={switchCurrent} current={current} />;
        break;
      default:
        return <Personal switchCurrent={switchCurrent} current={current} />;
        break;
    }
  };

  const header = {
    title: user.name + ' ' + user.lastname,
    icon: 'person',
    action: 'remove_red_eye',
    titleAction: 'Ver perfil',
    urlAction: '/admin/profile',
  };

  return (
    <>
      <PageTitle title="Mi Perfil" back="/admin/companies" />
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small ">
          <Sitebar header={header} theme="orange">
            <Steps direction="vertical" size="large" current={current} onChange={onChange}>
              {checkList.map((o, i) => (
                <Step key={i} title={o.title} status={status(i)} icon={<i className="material-icons">{o.icon}</i>} />
              ))}
            </Steps>
            <Dashboard show={['TotalPercent']}/>
          </Sitebar>
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">{switchStep()}</div>
      </div>
    </>
  );
};

export default UserProfile;
