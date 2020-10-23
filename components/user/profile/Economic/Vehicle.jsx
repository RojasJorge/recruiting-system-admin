import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, InputNumber, notification, Select } from 'antd';
const { Item, List } = Form;
const { Option } = Select;
const Vehicle = () => {
  return (
    <div className="umana-form--section">
      <h2>Vehículos</h2>
      <List name="vehicles" className="form-item--lg">
        {(fields, { add: addVehicle, remove: removeVehicle }) => {
          return (
            <>
              {fields.map(field => (
                <fieldset
                  key={field.key}
                  style={{
                    marginBottom: 24,
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-4">
                          <Item
                            label="Tipo"
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}
                            rules={[
                              {
                                required: true,
                                message: 'El tipo es requerido',
                              },
                            ]}
                          >
                            <Select size="large">
                              {[
                                {
                                  name: 'motorcycle',
                                  translation: 'Moto',
                                },
                                {
                                  name: 'car',
                                  translation: 'Carro',
                                },
                              ].map((op, index) => (
                                <Option key={index} value={op.name}>
                                  {op.translation}
                                </Option>
                              ))}
                            </Select>
                          </Item>
                        </div>
                        <div className="col-md-4">
                          <Item
                            label="Marca"
                            name={[field.name, 'brand']}
                            fieldKey={[field.fieldKey, 'brand']}
                            rules={[
                              {
                                required: true,
                                message: 'Marca de vehículo es requerido',
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Item>
                        </div>
                        <div className="col-md-4">
                          <Item
                            label="Año"
                            name={[field.name, 'year']}
                            fieldKey={[field.fieldKey, 'year']}
                            rules={[
                              {
                                required: true,
                                message: 'Año del vehículo es requerido',
                              },
                            ]}
                          >
                            <InputNumber min={1899} size="large" />
                          </Item>
                        </div>
                        <div className="col-md-2">
                          <Item
                            label="¿Aún debe?"
                            name={[field.name, 'debts']}
                            fieldKey={[field.fieldKey, 'debts']}
                            valuePropName="checked"
                          >
                            <Checkbox />
                          </Item>
                        </div>
                        <div className="col-md-10">
                          <Item
                            name={[field.name, 'amount']}
                            fieldKey={[field.fieldKey, 'amount']}
                            label="Monto"
                          >
                            <InputNumber min={0} size="large" />
                          </Item>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <MinusCircleOutlined
                        onClick={() => {
                          removeVehicle(field.name);
                        }}
                      />
                    </div>
                  </div>
                </fieldset>
              ))}

              <Button
                style={{ width: '100%' }}
                type="dashed"
                icon={<PlusOutlined />}
                onClick={() => {
                  addVehicle();
                }}
              >
                Agregar vehículo
              </Button>
            </>
          );
        }}
      </List>
    </div>
  );
};

export default Vehicle;
