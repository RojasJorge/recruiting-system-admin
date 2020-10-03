import { filter, map } from 'lodash';
import { useStoreActions } from 'easy-peasy';
import { Button, Form, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.gt';

const { Item, List } = Form;
const { Option } = Select;

const Phones = ({ phones, setPhones }) => {
  /** Global tools */
  const makeRandomId = useStoreActions(
    actions => actions.tools.makeRandomId,
  ); /** Unique param is length (int) */

  /** Add/Remove phone handlers */
  const removePhone = id => setPhones(filter(phones, o => o.id !== id));

  /** Add phones -> global state */
  const addPhone = () =>
    setPhones([
      ...phones,
      {
        area: '',
        number: '',
        type: '',
        id: makeRandomId(10),
      },
    ]);

  /** Update single phone */
  const updatePhone = (e, field, phone) =>
    setPhones(
      map(phones, o => {
        if (o.id === phone.id) {
          if (field === 'number') {
            o.number = e.target.value;
          }
          if (field === 'area') {
            o.area = e;
          }
          if (field === 'type') {
            o.type = e;
          }
        }
        return o;
      }),
    );

  return (
    <>
      <List name="phones" className="form-item--lg">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Space className="no-wrap umana-form--group" required={false} key={field.key}>
                  <Item label="Área" {...field} name={[field.name, 'area']}>
                    <Select placeholder="Seleccione" style={{ width: '100%' }}>
                      <Option value={502}>(502) Guatemala</Option>
                    </Select>
                  </Item>

                  <Item label="Número" {...field} name={[field.name, 'number']}>
                    <Cleave
                      options={{
                        phone: true,
                        phoneRegionCode: 'GT',
                      }}
                      className="ant-input-number"
                      style={{ padding: 10 }}
                    />
                    {/*<Input*/}
                    {/*	placeholder="0000-0000"*/}
                    {/*/>*/}
                  </Item>

                  <Item label="Tipo" {...field} name={[field.name, 'type']}>
                    <Select
                      placeholder="Seleccione"
                      style={{ width: '100%' }}
                      // onSelect={e => updatePhone(e, "type", phone)}
                    >
                      <Option value="personal">Personal</Option>
                      <Option value="work">Trabajo</Option>
                      <Option value="home">Casa</Option>
                    </Select>
                  </Item>

                  {fields.length > 0 ? (
                    <a
                      key={field.key + 'add'}
                      className="form-item--delete"
                      onClick={() => {
                        remove(field.name);
                      }}
                    >
                      <i className="material-icons">cancel</i>
                    </a>
                  ) : null}
                </Space>
              ))}
              <Item style={{ width: '100%' }}>
                <Button
                  style={{ width: '100%' }}
                  type="dashed"
                  size="large"
                  onClick={() => {
                    add();
                  }}
                >
                  <i className="material-icons">add</i> Agregar número teléfonico
                </Button>
              </Item>
            </>
          );
        }}
      </List>
    </>
  );
};

Phones.propTypes = {
  phones: PropTypes.array,
  setPhones: PropTypes.func,
};

Phones.defaultProps = {
  phones: [],
  setPhones: () => {},
};

export default Phones;
