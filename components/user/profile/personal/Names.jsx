import { Form, Input, Select } from 'antd';
import { isEmpty } from 'lodash';
import { useStoreState } from 'easy-peasy';
import { AreaJob } from '../../../../elements';

const { Item } = Form;

const Names = _ => {
  const strForSearch = str => {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : str;
  };

  /** Get catalogs */
  const catalogs = useStoreState(state => state.collections);

  return (
    <>
      <Item className="form-item--md" name="name" type="text" label="Nombres" rules={[{ required: true, message: 'El campo Nombre es requerido.' }]}>
        <Input size="large" />
      </Item>
      <Item name="lastname" className="form-item--md" type="text" label="Apellidos" rules={[{ required: true, message: 'El campo Apellido es requerido.' }]}>
        <Input size="large" />
      </Item>
      <Item name="currentJobTitle" className="form-item--lg" name="currentJobTitle" label="Área al que aplica" type="text" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
        <AreaJob />
      </Item>
    </>
  );
};

export default Names;
