import { Form, Input, Select } from 'antd';

const { Item } = Form;

const Names = ({ careers }) => {
  const strForSearch = str => {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : str;
  };
  
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
        label="Puestos a los que desea aplicar"
        type="text"
        rules={[{ required: true, message: "El campo 'Puesto Actual' es requerido." }]}
      >
        <Select
          showSearch
          mode="multiple"
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
          {careers
            ? careers
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e, idx) =>
                  e.parent === '' || e.parent === null ? (
                    <Select.OptGroup key={idx} label={e.name}>
                      {careers.filter(child => child.parent === e.id) &&
                      careers.filter(child => child.parent === e.id).length > 0
                        ? careers
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
