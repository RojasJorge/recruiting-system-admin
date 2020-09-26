import { useEffect, useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStoreActions } from 'easy-peasy';
import { Button, Form, Input } from 'antd';
import { delay } from 'lodash';
import MainHeader from '../structure/Header';
import imgLogin from '../../images/login.png';

const { Item } = Form;
const { Password } = Input;

const Login = _ => {
  const [loading, switchLoading] = useState(true);
  const login = useStoreActions(actions => actions.auth.login);
  const [token, setToken] = useState(false);
  const collectionsActions = useStoreActions(actions => actions.collections);

  const onFinish = data => {
    switchLoading(true);
    login(data);

    /** Switch loader delay */
    delay(() => switchLoading(false), 1000);
  };

  useEffect(() => {
    if (localStorage.getItem('uToken')) {
      setToken(true);
      collectionsActions.get({ type: 'career', token: localStorage.getItem('uToken') });
      collectionsActions.get({ type: 'academic-level', token: localStorage.getItem('uToken') });
    }
    delay(() => switchLoading(false), 1000);
  }, []);

  if (token) return null;

  return (
    <>
      <Head>
        <title>Iniciar Sesión</title>
      </Head>
      <div className="app animated fadeIn login umana">
        <MainHeader />
        <div className="umana-login">
          <div className="umana-layout row justify-content-center align-items-center">
            <div className="col-md-6 umana-login__img">
              <img src={imgLogin} alt="" />
            </div>
            <div className="col-md-6 umana-login__form">
              <div className="row">
                <div className="col-md-12 umana-signup-login-title">
                  <h1>Iniciar Sesión</h1>
                </div>
              </div>
              <Form
                className="login--form"
                // form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout="vertical"
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
                <Button size="large" htmlType="submit" type="primary" loading={loading}>
                  Iniciar Sesión
                </Button>
                <p>
                  ¿No tienes cuenta?
                  <Button
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  // 	<>
  // 		<h1>ir al inicio</h1>
  // 		<Button
  // 			type="link"
  // 			onClick={e => {
  // 				e.preventDefault()
  // 				Router.push('/admin/catalogs')
  // 			}}
  // 		>
  // 			catalogos
  // 		</Button>
  // 	</>
  // )
};

export default Login;
