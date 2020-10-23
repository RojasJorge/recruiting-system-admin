import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, InputNumber, notification, Select } from 'antd';
const { Item, List } = Form;
const { Option } = Select;

const Debts = () => {
  return (
    <div className="umana-form--section">
      <h2>Deudas</h2>
      <List name="debts">
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(field => (
                <fieldset
                  key={field.key}
                  style={{
                    marginBottom: 24,
                    width: '100%',
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-6">
                          <Item
                            label="¿En qué empresa?"
                            name={[field.name, 'whatCompany']}
                            fieldKey={[field.fieldKey, 'whatCompany']}
                            rules={[
                              {
                                required: true,
                                message: 'Escriba el nombre de la empresa',
                              },
                            ]}
                          >
                            <Input size="large" />
                          </Item>
                        </div>
                        <div className="col-md-3">
                          <Item
                            label="Monto"
                            name={[field.name, 'amount']}
                            fieldKey={[field.fieldKey, 'amount']}
                            rules={[
                              {
                                required: true,
                                message: 'Escriba el monto',
                              },
                            ]}
                          >
                            <InputNumber size="large" />
                          </Item>
                        </div>
                        <div className="col-md-3">
                          <Item
                            label="Pago mensual"
                            name={[field.name, 'monthlyFee']}
                            fieldKey={[field.fieldKey, 'monthlyFee']}
                            rules={[
                              {
                                required: true,
                                message: 'Escriba el monto mensual',
                              },
                            ]}
                          >
                            <InputNumber size="large" />
                          </Item>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
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
                  add();
                }}
              >
                Agregar deudas
              </Button>
            </>
          );
        }}
      </List>
    </div>
  );
};
export default Debts;
