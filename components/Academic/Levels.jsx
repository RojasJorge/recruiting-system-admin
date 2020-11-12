import { Select, Form, Space } from 'antd';
import { find, isEmpty } from 'lodash';

const { Item } = Form;
const { Option } = Select;

const Levels = ({ catalogs: { career, academic_level } }) => {
  return (
    <>
      <Item
        label="Nivel Académico"
        {...field}
        name={[field.name, 'academicLevel']}
        fieldKey={[field.fieldKey, 'academicLevel']}
        rules={[{ required: true, message: 'Debes escoger un nivel académico' }]}
      >
        <Select
          placeholder="Seleccione"
          // onChange={switchChildren}
          onChange={e => {
            PARENT = find(catalogs.academic_level, o => o.id === e);
          }}
          optionFilterProp="children"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          showSearch
        >
          {!isEmpty(academicParent) ? (
            academicParent.map((o, i) =>
              o.status ? (
                <Option value={o.id} key={i}>
                  {o.name}
                </Option>
              ) : null,
            )
          ) : (
            <Option value="0">No hay listado para mostrar</Option>
          )}
        </Select>
      </Item>

      <Item label="Especialización" {...field} name={[field.name, 'specialization']} fieldKey={[field.fieldKey, 'specialization']}>
        <Select placeholder="Seleccione" optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} showSearch>
          {isEmpty(PARENT.children) ? (
            current && Object.keys(current).length > 0 && !isEmpty(current.children) ? (
              current.children.map((o, i) =>
                o.status ? (
                  <Option value={o.id} key={i}>
                    {o.name}
                  </Option>
                ) : null,
              )
            ) : (
              <Option value="0">No hay listado para mostrar</Option>
            )
          ) : !isEmpty(PARENT.children) ? (
            PARENT.children.map((o, i) =>
              o.status ? (
                <Option value={o.id} key={i}>
                  {o.name}
                </Option>
              ) : null,
            )
          ) : (
            <Option value="0">No hay listado para mostrar</Option>
          )}
        </Select>
      </Item>
    </>
  );
};

export default Levels;
