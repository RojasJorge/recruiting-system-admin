import { useEffect, useState } from 'react';
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
import Dashboard from './Dashboard';

const { Step } = Steps;

const checkList = [
  {
    title: 'Personal',
    id: 'personal',
    icon: 'person',
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
    switch (parseInt(query.current, 10)) {
      case 0:
        return <Personal />;
        break;
      case 1:
        return <LookingFor />;
        break;
      case 2:
        return <AcademicLevels />;
        break;
      case 3:
        return <Courses />;
        break;
      case 4:
        return <Others />;
        break;
      case 5:
        return <Experiences />;
        break;
      case 6:
        return <Economic />;
        break;
      default:
        return <Personal />;
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

  useEffect(() => {
    if (query.current) {
      switchStep();
      switchCurrent(parseInt(query.current, 10));
    }
  }, [query]);

  return (
    <>
      <PageTitle title="Mi Perfil" back="/admin/profile" />
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small ">
          <Sitebar header={header} theme="orange">
            <Steps direction="vertical" size="large" current={current} onChange={onChange}>
              {checkList.map((o, i) => (
                <Step key={i} title={o.title} status={status(i)} icon={<i className="material-icons">{o.icon}</i>} />
              ))}
            </Steps>
            <Dashboard
              show={['TotalPercent']}
              config={{
                TotalPercent: {
                  legend: false,
                },
              }}
            />
          </Sitebar>
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">{switchStep()}</div>
      </div>
    </>
  );
};

export default UserProfile;
