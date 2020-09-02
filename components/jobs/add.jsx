import { Form, Input, InputNumber, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Locations from '../Location';
import xhr from '../../xhr';

const { TextArea } = Input;

const FormJob = props => {
  const data = useStoreState(state => state.collections);
  const fill = useStoreActions(actions => actions.collections.fill);
  const [career, setCareer] = useState([]);
  /** Get collection */
  const get = () =>
    xhr()
      // .get(`/${type}?pager=${JSON.stringify({ page: 1, limit: 1000 })}`)
      .get(`/career`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setCareer(data.list);
  }, [data.list]);

  useEffect(() => {
    get();
  }, []);
  console.log(career);

  const onFinish = e => {
    console.log(e);
  };
  return (
    <div className="col">
      <h2 style={{ width: '100%' }}>Información general</h2>
      <Form scrollToFirstError={true} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'Titulo de la plaza es requerido',
            },
          ]}
          name="title"
          label="Titulo"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'La descripción de la empresa es requerida',
            },
          ]}
          name="description"
          label="Descripción de la empresa"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="typeBusness"
          label="Tipo de negocio de la empresa"
          className="form-item--md"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="socialreason" label="Razón Social" className="form-item--md">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="nit" label="NIT" className="form-item--sm">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="employees" label="Números de empleos" className="form-item--sm">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item name="experience" label="Año de fundación" className="form-item--sm">
          <InputNumber size="large" />
        </Form.Item>
        <Form.Item name="website" label="Sitio Web">
          <Input size="large" />
        </Form.Item>
        <Locations />
        <div className="umana-form--group">
          <h2 style={{ width: '100%' }}>Información de contacto</h2>
          <br />
          <Form.Item name="name-contact" label="Nombre de contacto" className="form-item--lg">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="email-contact" label="Correo Electrónico" className="form-item--md">
            <Input size="large" />
          </Form.Item>
          <Form.Item name="phone-contact" label="Teléfono" className="form-item--md">
            <Input size="large" />
          </Form.Item>
        </div>
        <Form.Item className="umana-form--footer">
          <Button htmlType="submit" type="primary">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormJob;
