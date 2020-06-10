import { Form, Input, InputNumber, Button } from 'antd';
import Locations from '../Location';
const { TextArea } = Input;

const FormCompany = () => {
  const onFinish = e => {
    console.log(e);
  };
  return (
    <div className="col">
      <Form scrollToFirstError={true} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'El nombre de la empresa es requerido.',
            },
          ]}
          name="name"
          label="Nombre de la empresa"
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
          <Form.Item className="form-item--lg">
            <Button htmlType="submit" type="primary">
              Guardar
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FormCompany;
