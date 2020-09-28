import { useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import router from 'next/router';
import { Steps, Avatar } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
import Personal from './personal';
import Documents from './Documents';
import About from './personal/About';
import LookingFor from './LookingFor';
import AcademicLevels from './AcademicLevels';
import Experiences from './Experiences';
import xhr from '../../../xhr';
import { PageTitle, Sitebar, UploadAvatar } from '../../../elements';

const { Step } = Steps;

const checkList = [
  {
    title: 'Personal',
    // icon:
  },
  {
    title: 'Documentos',
  },
  {
    title: 'Acerca de',
  },
  {
    title: '¿Qué buscas?',
  },
  {
    title: 'Niveles Académicos',
  },
  {
    title: 'Experiencia Laboral',
  },
  {
    title: 'Economía',
  },
];

const UserProfile = _ => {
  /** Global state */
  const user = useStoreState(state => state.auth.user);
  const steps = useStoreState(state => state.profile.steps);
  const update = useStoreActions(actions => actions.profile.update);

  /** Local state */
  console.log('Current path step:', router);
  const [current, switchCurrent] = useState(parseInt(router.query.current, 10) || 0);
  const [avatarSrc, setAvatarSrc] = useState('');
  const onChange = o => {
    switchCurrent(o);
    router.push(`${router.router.pathname}?current=${o}`);
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
        return <Personal update={update} />;
        break;
      case 1:
        return <Documents />;
        break;
      case 2:
        return <About />;
        break;
      case 3:
        return <LookingFor />;
        break;
      case 4:
        return <AcademicLevels />;
        break;
      case 5:
        return <Experiences />;
        break;
      default:
        return <Personal update={update} />;
        break;
    }
  };

  const avatarChange = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'avatar');

    const response = await fetch('https://api.cloudinary.com/v1_1/umana-storage/image/upload', {
      method: 'POST',
      body: data,
    });

    const file = await response.json();

    setAvatarSrc(file.secure_url);

    updateProfile({ avatar: file.secure_url });
  };

  const url = `/user/${user.id}`;

  const updateProfile = async o =>
    await xhr()
      .put(url, JSON.stringify(o))
      .then(resp => getUser())
      .catch(err => console.log(err));

  const getUser = async o =>
    await xhr()
      .get(url)
      .then(resp => {
        window.location.reload();
      })
      .catch(err => console.log(err));

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
          <Sitebar header={header} theme="orange" />
          <Steps direction="vertical" size="large" current={current} onChange={onChange} progressDot>
            {checkList.map((o, i) => (
              <Step key={i} title={o.title} status={status(i)} />
            ))}
          </Steps>
        </div>
        <div className="umana-layout-cl__flex bg-white">
          {current === 0 ? <UploadAvatar type="user" src={user.avatar} /> : null}
          {switchStep()}
          {/* <h4 style={{ marginTop: 24 }}>Global statate</h4>
          <pre style={{ marginTop: 24 }}>{JSON.stringify(steps, false, 2)}</pre> */}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
