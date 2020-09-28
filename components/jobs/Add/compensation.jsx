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
    </>
  );
};

export default Compensation;
