import Head from 'next/head';
import { useState } from 'react';
import SignupForm from './signup/form';
import { Form, Input, Button, DatePicker, Steps } from 'antd';
import MainHeader from '../structure/Header';
import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.gt';
import Cleave from 'cleave.js/react';

const { Step } = Steps;

const SignupSteps = _ => {
  /** Submit handler */
  const onSubmit = e => {
    e.preventDefault();
    console.log(
      e.target.name.value,
      e.target.lastname.value,
      e.target.email.value,
      e.target.phone.value,
      e.target.birthday.value,
      'password',
      e.target.password.value,
    );
  };

  const [current, switchCurrent] = useState(0);
  const onChange = o => switchCurrent(o);

  const checkList = [
    {
      title: '¿Qué estás buscando?',
    },
    {
      title: 'Crear cuenta',
    },
  ];

  const switchStep = _ => {
    switch (current) {
      case 0:
        return <div>Busco trabajo</div>;
        break;

      default:
        return <SignupForm />;
        break;
    }
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

  return (
    <>
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <div className="app container-fluid animated fadeIn umana signup">
        <MainHeader />
        {/* Content  */}
        <div className="umana-signup">
          <Steps
            direction="vertical"
            size="large"
            current={current}
            onChange={onChange}
            progressDot
          >
            {checkList.map((o, i) => (
              <Step key={i} title={o.title} status={status(i)} />
            ))}
          </Steps>
          <div>{switchStep()}</div>
        </div>
      </div>
    </>
  );
};

export default SignupSteps;
