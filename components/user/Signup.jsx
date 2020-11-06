import Head from 'next/head';
import { useState } from 'react';
import { Form, Input, Button, Radio, Steps, Alert } from 'antd';
import MainHeader from '../structure/Header';
import { PageTitle } from '../../elements';
import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.gt';
import Cleave from 'cleave.js/react';
import imgLogin from '../../images/login.png';
import imgSignup from '../../images/signup.png';
import SignupForm from './signup/form';
import WhatScope from './signup/search';

const { Step } = Steps;

const Validation = _ => {
  return (
    <div>
      <p>
        Te hemos enviado un correo electrónico,
        <br /> revisalo y verifica tu cuenta.
      </p>
    </div>
  );
};

const SignupSteps = _ => {
  /** Submit handler */

  const [current, switchCurrent] = useState(0);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState({
    stepOne: 'process',
    stepTwo: 'wait',
    stepThree: 'wait',
  });

  const next = no => {
    const current = no + 1;
    switchCurrent(current);
  };

  const setCurrent = e => {
    if (e) {
      setRole(e);
    }
    setTimeout(() => {
      next(0);
    }, 1000);
  };

  const steps = [
    {
      title: '¿Qué estas buscando?',
      content: <WhatScope scope={role} setCurrent={setCurrent} role={role} />,
    },
    {
      title: 'Llena tu información',
      content: <SignupForm scope={role} next={next} />,
    },
    {
      title: '¡Ya casi terminamos!',
      content: <Validation />,
    },
  ];

  return (
    <>
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <div className="app fadeIn umana signup">
        <MainHeader />
        {/* Content  */}
        <div className="umana-signup" style={{ background: `url(${imgSignup})` }}>
          <div className="umana-layout">
            <PageTitle title="Crear cuenta" />
            <div className="umana-signup__content">
              <div className="steps-content">
                <Steps current={current}>
                  {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                {steps[current].content}
              </div>

              <p>
                ¿Ya tienes cuenta?
                <Button
                  style={{ width: 125 }}
                  type="link"
                  size="small"
                  onClick={e => {
                    e.preventDefault();
                    Router.push('/');
                  }}
                >
                  Iniciar sesión
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupSteps;
