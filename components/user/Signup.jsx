import Head from 'next/head';
import { useState } from 'react';
import SignupForm from './signup/form';
import { Form, Input, Button, Radio, Steps } from 'antd';
import MainHeader from '../structure/Header';
import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.gt';
import Cleave from 'cleave.js/react';
import imgLogin from '../../images/login.png';

const { Step } = Steps;

const SignupSteps = _ => {
  /** Submit handler */

  const [current, switchCurrent] = useState(0);
  const [role, setRole] = useState('');
  const [status, setStatus] = useState({
    stepOne: 'process',
    stepTwo: 'wait',
  });

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
        return (
          <div>
            <Radio.Group onChange={e => setRole(e.target.value)} value={role} size="large">
              <Radio.Button value="candidate">
                <i className="material-icons">person</i> Estoy buscando Trabajo
              </Radio.Button>
              <Radio.Button value="company">
                <i className="material-icons">location_city</i> Estoy buscando Talentos
              </Radio.Button>
            </Radio.Group>
          </div>
        );
        break;

      default:
        return <SignupForm scope={role} />;
        break;
    }
  };

  const next = () => {
    const current = current + 1;
    switchCurrent({ current });
    setStatus({ ...status, stepOne: 'do', stepTwo: 'process' });
  };

  return (
    <>
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <div className="app fadeIn umana signup">
        <MainHeader />
        {/* Content  */}
        <div className="umana-signup">
          <div className="umana-layout row justify-content-center align-items-center">
            <div className="col-md-6 umana-signup__img">
              <img src={imgLogin} alt="" />
            </div>
            <div className="col-md-6 umana-signup__form">
              <div className="row">
                <div className="umana-signup-login-title have-subtitle">
                  <h1>Registrase</h1>
                </div>
                <div className="umana-signup-login-subtitle">
                  <Steps className="col-md-12" direction="horizontal" size="large" current={current}>
                    <Step key={0} title="¿Qué estás buscando?" status={status.stepOne} />
                    <Step key={1} title="Crear cuenta" status={status.stepTwo} />
                  </Steps>
                </div>

                <div className="col-md-12">
                  {switchStep()}
                  {current < checkList.length - 1 && (
                    <Button type="primary" onClick={() => next()} disabled={role ? false : true}>
                      Siguiente
                    </Button>
                  )}
                  <p>
                    ¿Ya tienes cuenta?
                    <Button
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
        </div>
      </div>
    </>
  );
};

export default SignupSteps;
