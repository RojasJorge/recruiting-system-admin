import Head from 'next/head';
import UmanaLogo from '../Misc/UmanaLogo';
import { Form, Input, Button, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Link from 'next/link';
import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.gt';
import Cleave from 'cleave.js/react';
import 'animate.css';

const SignupForm = _ => {
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

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Head>
        <title>Crear cuenta</title>
      </Head>
      <div className="app signup container-fluid animated fadeIn">
        <header className="app--header umana__header">
          <div className="menu--user menu--user__login umana__header--noLogin">
            <div className="container">
              <div className="row align-items-center">
                <div className="col">
                  <UmanaLogo />
                </div>
                <div className="col access-links  umana-menu">
                  <Link href="/" passHref>
                    <a>Inicio</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="row align-items-center justify-content-center app--signup umana">
          <div className="umana-login">
            <div className="col-md-8 umana-layout">
              <div className="row ">
                <div className="col-md-12">
                  <h1>Crear cuenta:</h1>
                </div>
              </div>
              <Form
                name="basic"
                className="login--form signup--form"
                onSubmit={onSubmit}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: 'Correo electrónico es requerido.',
                        },
                      ]}
                    >
                      <Input
                        name="email"
                        size="large"
                        value="jorge@royalestudios.com"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Password"
                      name="Password"
                      rules={[
                        {
                          required: true,
                          message: 'La contraseña es requerida.',
                        },
                      ]}
                    >
                      <Input.Password
                        name="password"
                        size="large"
                        value="royale123"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Name"
                      name="Name"
                      rules={[
                        {
                          required: true,
                          message: 'El nombre es requerido.',
                        },
                      ]}
                    >
                      <Input
                        name="name"
                        size="large"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item
                      label="Lastname"
                      name="lastname"
                      rules={[
                        {
                          required: true,
                          message: 'Apellidos es requerida.',
                        },
                      ]}
                    >
                      <Input name="lastname" size="large" />
                    </Form.Item>
                  </div>
                  <div className="col-md-12">
                    <h3>Optional:</h3>
                  </div>
                  <div className="col">
                    <Form.Item label="Phone(s)">
                      <Cleave
                        className="ant-input ant-input-lg"
                        options={{
                          phone: true,
                          phoneRegionCode: 'GT',
                        }}
                        name="phone"
                        onChange={e => console.log(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="col">
                    <Form.Item label="Birthday">
                      <DatePicker
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        size="large"
                        name="birthday"
                      />
                    </Form.Item>
                  </div>
                </div>
                <Button htmlType="submit" icon={<PlusOutlined />} size="large" type="primary">
                  Register new user
                </Button>
                <p>
                  ¿Ya tienes cuenta?
                  <Button
                    type="link"
                    onClick={e => {
                      e.preventDefault();
                      Router.push('/login');
                    }}
                  >
                    Iniciar sesión
                  </Button>
                </p>
                {/* <p className="info">Envia Logistics internal metrics system.</p> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
