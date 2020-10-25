import { Form, Input, Select } from 'antd';
import { isEmpty } from 'lodash';
import { useStoreState } from 'easy-peasy';

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
      <Item
        className="form-item--md"
        name="name"
        type="text"
        label="Nombres"
        rules={[{ required: true, message: 'El campo Nombre es requerido.' }]}
      >
        <Input size="large" />
      </Item>
      <Item
        name="lastname"
        className="form-item--md"
        type="text"
        label="Apellidos"
        rules={[{ required: true, message: 'El campo Apellido es requerido.' }]}
      >
        <Input size="large" />
      </Item>
      <Item
        name="currentJobTitle"
        className="form-item--lg"
        name="currentJobTitle"
        label="Área al que aplica"
        type="text"
        rules={[{ required: true, message: 'Este campo es requerido.' }]}
      >
        <Select
          showSearch
          optionFilterProp="title"
          filterprop="title"
          filterOption={(input, option) => {
            if (option.children) {
              return strForSearch(option.children).includes(strForSearch(input));
            } else {
              if (option.options) {
                return strForSearch(option.label).includes(strForSearch(input));
              }
              return false;
            }
          }}
        >
          {!isEmpty(catalogs.career)
            ? catalogs.career
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e, idx) =>
                  e.parent === '' || e.parent === null ? (
                    <Select.OptGroup key={idx} label={e.name}>
                      {catalogs.career.filter(child => child.parent === e.id) &&
                      catalogs.career.filter(child => child.parent === e.id).length > 0
                        ? catalogs.career
                            .filter(child => child.parent === e.id)
                            .sort((z, x) => (z.name > x.name ? 1 : -1))
                            .map((m, index) => (
                              <Select.Option key={m.id} value={m.id}>
                                {m.name}
                              </Select.Option>
                            ))
                        : null}
                    </Select.OptGroup>
                  ) : null,
                )
            : null}
        </Select>
      </Item>
    </>
  );
};

export default Names;
