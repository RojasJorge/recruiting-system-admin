import { useState } from 'react';
import { Input, InputNumber, Select, Checkbox } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const Label = styled.label`
  display: block;
`;

const Legal = ({ value = {}, onChange }) => {
  const initVal =
    Object.keys(value).length > 0
      ? value
      : {
          legalProblem: false,
          whatProblem: '',
          infonetOrOther: false,
        };

  const [values, setValues] = useState(initVal);

  const triggerOnChange = val => {
    if (onChange) {
      onChange({
        ...values,
        ...val,
      });
    }
  };

  const handleChange = (e, type) => {
    setValues({
      ...values,
      [type]: e,
    });

    triggerOnChange({
      [type]: e,
    });
  };

  return (
    <div
      className="row"
      style={{
        marginTop: 24,
        marginBottom: 30,
      }}
    >
      <div className="col-md-3">
        <Label htmlFor="legalProblem">¿Tiene algún problemas legales?</Label>
        <Checkbox
          onChange={e => handleChange(e.target.checked, 'legalProblem')}
          checked={values.legalProblem}
        >
          Si
        </Checkbox>
      </div>
      <div className="col-md-9">
        <Label htmlFor="whatProblem">¿Qué tipo de problema?</Label>
        <Input
          onChange={e => handleChange(e.target.value, 'whatProblem')}
          value={values.whatProblem}
          size="large"
        />
      </div>
      <div className="col-md-3" style={{ marginTop: 30 }}>
        <Label htmlFor="infonetOrOther">¿Infornet u otros?</Label>
        <Checkbox
          onChange={e => handleChange(e.target.checked, 'infonetOrOther')}
          checked={values.infonetOrOther}
        >
          Si
        </Checkbox>
      </div>
    </div>
  );
};

export default Legal;
