import { filter, map } from 'lodash';
import { useStoreActions } from 'easy-peasy';
import { Button, Form, Select } from 'antd';
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
      <List name="phones">
        {(fields, { add, remove }) => {
          return (
            <div className="test">
              {fields.map((field, index) => (
                <Item className="form-item--lg" required={false} key={field.key}>
                  <div className="row align-items-center umana-form--group">
                    <div className="col">
                      <Item label="Área" {...field} name={[field.name, 'area']}>
                        <Select placeholder="Seleccione" style={{ width: '100%' }}>
                          <Option value={502}>(502) Guatemala</Option>
                        </Select>
                      </Item>
                    </div>
                    <div className="col">
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
                    </div>
                    <div className="col">
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
                    </div>
                    <div className="col-md-1">
                      {fields.length > 0 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </Item>
              ))}
              <Item style={{ width: '100%' }}>
                <Button
                  type="dashed"
                  size="large"
                  onClick={() => {
                    add();
                  }}
                >
                  <PlusOutlined /> Agregar número
                </Button>
              </Item>
            </div>
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
