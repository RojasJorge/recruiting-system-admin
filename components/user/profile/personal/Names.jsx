import { Form, Input } from 'antd';

const { Item } = Form;

const Names = _ => {
  return (
    <>
      <Item className="form-item--md" name="name" type="text" label="Nombres" rules={[{ required: true, message: 'El campo Nombre es requerido.' }]}>
        <Input size="large" />
      </Item>
      <Item name="lastname" className="form-item--md" type="text" label="Apellidos" rules={[{ required: true, message: 'El campo Apellido es requerido.' }]}>
        <Input size="large" />
      </Item>
      <Item name="currentJobTitle" className="form-item--lg" label="Puesto actual" type="text" rules={[{ required: true, message: "El campo 'Puesto Actual' es requerido." }]}>
        <Input size="large" />
      </Item>
    </>
  );
};

export default Names;
