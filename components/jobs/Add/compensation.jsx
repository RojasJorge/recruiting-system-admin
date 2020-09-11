import { Form, Input, Checkbox, Select, InputNumber, Radio } from 'antd';
import { useState } from 'react';
import benefist from '../../../data/benefist.json';
import monedas from '../../../data/monedas.json';
import Salary from '../../Salary';

const Compensation = props => {
  const initialState = {
    base_min: 0,
    base_max: 0,
    com_min: 0,
    com_max: 0,
  };

  const [values, setValues] = useState(initialState);
  return (
    <>
      <Form.Item label="Beneficios" className="form-item--lg" name="benefits">
        <Checkbox.Group>
          {benefist
            ? benefist.map(b => (
                <Checkbox key={b} value={b}>
                  {b}
                </Checkbox>
              ))
            : null}
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Otros Beneficios" className="form-item--lg" name="benefits_other">
        <Input.TextArea />
      </Form.Item>
      <br />
      <br />
      <h3 style={{ width: '100%' }}>Rango Salarial</h3>

      <Form.Item label="Salario" className="form-item--md" name="salary">
        <Salary />
      </Form.Item>

      <Form.Item
        label="Confidencialidad de la empresa"
        className="form-item--lg"
        name="company_state"
        help="Seleccionar si desea que la información de la empresa sea pública"
      >
        <Radio.Group>
          <Radio.Button value="public">Pública</Radio.Button>
          <Radio.Button value="confidential">Privada</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default Compensation;
