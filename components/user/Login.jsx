import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { PageTitle } from '../../elements';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Form, Input, Alert } from 'antd';
import { delay } from 'lodash';
import MainHeader from '../structure/Header';
import imgLogin from '../../images/login.png';
import RequestNewPassword from '../Misc/RequestNewPassword';

const { Item } = Form;
const { Password } = Input;

const Login = _ => {
  const [loading, switchLoading] = useState(true);
  const login = useStoreActions(actions => actions.auth.login);
  const loginState = useStoreState(state => state.auth.error);
  const [token, setToken] = useState(false);
  const [errorInfo, setError] = useState('');

  const errorResponse = _ => {
    if (loginState === 401) {
      setError('El usuario no existe, has click en crear cuenta.');
    }
  };

  // console.log(loginState);

  const onFinish = data => {
    switchLoading(true);
    login(data);

    /** Switch loader delay */
    delay(() => switchLoading(false), 1000);
  };

  useEffect(() => {
    if (loginState === 401) {
      setError('El usuario no existe, has click en crear cuenta.');
    }
    if (loginState === 423) {
      setError('Usuaraio no verificado, revisa tu correo electrónico para verificar tu cuenta.');
    }
    if (loginState === 0) {
      setError('');
    }
    delay(() => switchLoading(false), 1000);
  }, [loginState]);

  if (token) return null;

  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>
      <div className="app fadeIn umana login">
        <MainHeader />
        {/* Content  */}
        <div className="umana-login" style={{ background: `url(${imgLogin})` }}>
          <div className="umana-layout">
            <PageTitle title="Iniciar sesión" />
            <div className="umana-login__content">
              <div className="notification">{errorInfo ? <Alert description={errorInfo} type="error" showIcon /> : null}</div>
              <div className="steps-content">
                <Form
                  className="login--form"
                  // form={form}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  layout="vertical"
                  validateTrigger="onBlur"
                >
                  <Item
                    rules={[
                      {
                        required: true,
                        message: 'Correo electrónico es requerido.',
                      },
                    ]}
                    name="email"
                    label="Correo Electrónico"
                  >
                    <Input size="large" />
                  </Item>
                  <Item rules={[{ required: true, message: 'Contraseña es requerida.' }]} name="password" label="Contraseña">
                    <Password size="large" style={{ height: 45, lineHeight: '45px' }} />
                  </Item>
                  <Button size="small" htmlType="submit" type="primary" loading={loading}>
                    Iniciar Sesión
                  </Button>
                </Form>
                <RequestNewPassword style={{ width: '100%' }} linkText="¿Olvidaste tu contraseña?" elementType="link" />
              </div>

              <p>
                ¿No tienes cuenta?
                <Button
                  style={{ width: 125 }}
                  type="link"
                  size="small"
                  onClick={e => {
                    e.preventDefault();
                    Router.push('/signup');
                  }}
                >
                  Crear cuenta
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
