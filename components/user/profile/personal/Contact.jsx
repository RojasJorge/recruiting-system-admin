import { useStoreState } from 'easy-peasy';
import { Form, Input, Divider } from 'antd';
import Phones from './Phones';
import { useState } from 'react';

const { Item } = Form;

const Contact = ({ phones, setPhones }) => {
  const user = useStoreState(state => state.auth.user);

  return (
    <>
      <h2 style={{ width: '100%', marginTop: 20 }}>Información de Contacto</h2>

      <Item
        label="Correo electrónico"
        className="form-item--lg"
        name="email"
        rules={[{ message: 'Es requerido que ingrese un email/válido.', type: 'email' }]}
      >
        <Input size="large" />
      </Item>

      <h3 style={{ width: '100%', marginTop: 20 }}>Números telefónicos</h3>

      <Phones phones={phones} setPhones={setPhones} />
    </>
  );
};

export default Contact;
