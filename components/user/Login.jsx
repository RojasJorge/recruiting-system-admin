import { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { useStoreActions } from 'easy-peasy';
import { Form, Input, Button } from 'antd';
import { EnterOutlined } from '@ant-design/icons';
import { delay } from 'lodash';
import MainHeader from '../structure/Header';
import { Can } from '../Can';
import imgLogin from '../../images/login.png';

const Login = _ => {
  const [loading, switchLoading] = useState(true);
  const login = useStoreActions(actions => actions.auth.login);
  const [token, setToken] = useState(false);

  const onFinish = data => {
    switchLoading(true);
    login(data);

    /** Switch loader delay */
    delay(() => switchLoading(false), 1000);
  };

  useEffect(() => {
    if (localStorage.getItem('uToken')) {
      setToken(true);
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
                <div className="col-md-12">
                  <h1>Iniciar Sesión</h1>
                  {/* <Can I="view" a="LOGIN">
                    <p>Mensaje para los administradores.</p>
                  </Can> */}
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
                <Form.Item
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
                </Form.Item>
                <Form.Item
                  rules={[{ required: true, message: 'Contraseña es requerida.' }]}
                  name="password"
                  label="Contraseña"
                >
                  <Input.Password size="large" />
                </Form.Item>
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
