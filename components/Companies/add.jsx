import { Form, Input, InputNumber } from 'antd';
const { TextArea } = Input;

const FormCompany = () => {
  return (
    <div className="col">
      <Form>
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
        <Form.Item name="typeBusness" label="Tipo de negocio de la empresa">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="socialReazon" label="Razón Social">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="nit" label="NIT">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="employees" label="Números de empleos">
          <InputNumber size="large" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCompany;
