import { Form, Input, Button, DatePicker, notification } from 'antd';
import 'cleave.js/dist/addons/cleave-phone.gt';
import { useStoreActions } from 'easy-peasy';
import xhr from '../../../xhr';
import Cleave from 'cleave.js/react';
import Router from 'next/router';

const SignupForm = props => {
  const login = useStoreActions(actions => actions.auth.login);

  const openNotification = placement => {
    notification.info({
      message: `Error`,
      description: 'Ha ocurrido un error, por favor inténtalo más tarde',
      placement,
    });
  };
  /** Submit handler */

  const onFinish = values => {
    const scope = { scope: [props.scope] };
    const newObj = Object.assign(values, scope);
    console.log(newObj);
    add(newObj);
  };

  const allSet = e => {
    notification.info({
      message: `Confirmación`,
      description: 'El usuario ha sido creado con éxito',
      placement: 'bottomRight',
    });
    console.log('data sign', e);
    setTimeout(() => {
      console.log('data sign2', e);
      login(e);
    }, 500);
  };

  const add = async e => {
    const loginData = {
      email: e.email,
      password: e.password,
    };
    xhr()
      .post(`/user`, e)
      .then(resp => {
        allSet(loginData);
      })
      .catch(err => {
        console.log('error', err);
        // openNotification('bottomRight');
      });
  };

  return (
    <div className="">
      <Form name="basic" className="login--form signup--form" onFinish={onFinish}>
        <div className="row">
          <div className="col-md-6">
            <Form.Item
              label="Correo Electrónico"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Correo electrónico es requerido.',
                },
              ]}
            >
              <Input name="email" size="large" rules={[{ required: true, message: 'Please input your email!' }]} />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'La contraseña es requerida.',
                },
              ]}
            >
              <Input.Password size="large" rules={[{ required: true, message: 'Please input your password!' }]} />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Nombres"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'El nombre es requerido.',
                },
              ]}
            >
              <Input name="name" size="large" rules={[{ required: true, message: 'Please input your username!' }]} />
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item
              label="Apellidos"
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
            <Form.Item label="Teléfono">
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
          {/*<div className="col">*/}
          {/*  <Form.Item label="Fecha de nacimiento" name="birthday">*/}
          {/*    <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" size="large" name="birthday" />*/}
          {/*  </Form.Item>*/}
          {/*</div>*/}
        </div>
        <Button htmlType="submit" size="large" type="primary">
          Crear cuenta
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
