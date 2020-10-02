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
                    backgroundColor: '#f5f5f5',
                    padding: 24,
                  }}
                >
                  <div className="row align-items-center">
                    <div className="col-md-11">
                      <div className="row">
                        <div className="col-md-4">
                          <label htmlFor="whatCompany">Que empresa</label>
                          <Item
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
                        <div className="col-md-4">
                          <label htmlFor="amount">Monto</label>
                          <Item
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
                        <div className="col-md-4">
                          <label htmlFor="monthlyFee">Pago mensual</label>
                          <Item
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
