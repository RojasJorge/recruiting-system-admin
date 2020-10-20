import { Form, Input, Button, DatePicker, notification, Alert } from 'antd';
import 'cleave.js/dist/addons/cleave-phone.gt';
import { useStoreActions } from 'easy-peasy';
import { useState } from 'react';
import xhr from '../../../xhr';
import Cleave from 'cleave.js/react';
import moment from 'moment';

const SignupForm = props => {
  const login = useStoreActions(actions => actions.auth.login);
  const [errorInfo, setError] = useState('');
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
    delete values.confirm;
    values.birthday = moment(values.birthday).format();
    const newObj = Object.assign(values, scope);

    add(newObj);
  };

  const allSet = e => {
    notification.info({
      message: `Confirmación`,
      description: 'El usuario ha sido creado con éxito',
      placement: 'bottomRight',
    });

    setTimeout(() => {
      login(e);
    }, 500);
  };

  const errorResponse = data => {
    setError(data);
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
        setError('');
      })
      .catch(err => {
        if (err.response.status === 406) {
          errorResponse('El usuario ya existe, has click en iniciar sesión');
        } else {
          errorResponse('Ha ocurrido un error, por favor intentela más tarde.');
        }
      });
  };

  return (
    <div className={`theme-${props.scope}`}>
      {errorInfo ? <Alert message="Error" type="error" showIcon description={errorInfo} /> : null}
      <Form scrollToFirstError={true} onFinish={onFinish} className="login--form signup--form">
        <Form.Item
          className="form-item--md"
          rules={[
            {
              required: true,
              message: 'Este campo es requerido.',
            },
          ]}
          name="name"
          label="Nombres"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          className="form-item--md"
          rules={[
            {
              required: true,
              message: 'Este campo es requerido.',
            },
          ]}
          name="lastname"
          label="Apellidos"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          className="form-item--lg"
          label="Correo Electrónico"
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Correo electrónico es requerido.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Fecha de nacimiento" name="birthday" className="form-item--md">
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" size="large" name="birthday" />
        </Form.Item>
        <Form.Item label="Teléfono" name="phone" className="form-item--md">
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
        <Form.Item
          className="form-item--md"
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: 'Este campo es requerido.',
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Form.Item
          className="form-item--md"
          label="Confirmar contraseña"
          dependencies={['password']}
          name="confirm"
          rules={[
            {
              required: true,
              message: 'Por favor confirma contraseña',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Las contraseñas no coiciden');
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>
        <Button htmlType="submit" size="small" type="primary">
          Crear cuenta
        </Button>
      </Form>
    </div>
  );
};

export default SignupForm;
