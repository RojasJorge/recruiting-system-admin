import { Form, Input, Button, DatePicker } from 'antd';
import Router from 'next/router';
import 'cleave.js/dist/addons/cleave-phone.gt';
import Cleave from 'cleave.js/react';

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
    // console.log('Success:', values)
  };

  const onFinishFailed = errorInfo => {
    // console.log('Failed:', errorInfo)
  };

  return (
    <div className="">
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
              label="Correo Electrónico"
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
              label="Contraseña"
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
              label="Nombres"
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
          <div className="col">
            <Form.Item label="Fecha de nacimiento">
              <DatePicker
                style={{ width: '100%' }}
                format="DD/MM/YYYY"
                size="large"
                name="birthday"
              />
            </Form.Item>
          </div>
        </div>
        <Button htmlType="submit" size="large" type="primary">
          Crear cuenta
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
