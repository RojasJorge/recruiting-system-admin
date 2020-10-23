import { useState } from 'react';
import { Checkbox, Input, Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;

const Label = styled.label`
  display: block;
`;

const Health = ({ value = {}, onChange }) => {
  const initVal =
    Object.keys(value).length > 0
      ? value
      : {
          haveDisease: false,
          disease: '',
          tattoOrPiercing: false,
          whatTattoOrPiercing: '',
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
      style={{
        marginTop: 24,
      }}
    >
      <div className="row" style={{ marginBottom: 20 }}>
        <div className="col-md-3">
          <Label htmlFor="haveDisease">¿Padece de enfermedades?</Label>
          <Checkbox
            onChange={e => handleChange(e.target.checked, 'haveDisease')}
            checked={values.haveDisease}
          >
            Si
          </Checkbox>
        </div>

        <div className="col-md-9">
          <Label htmlFor="disease">Especifíque</Label>
          <Input
            onChange={e => handleChange(e.target.value, 'disease')}
            value={values.disease}
            size="large"
            disabled={!values.haveDisease}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <Label htmlFor="tattoOrPiercing">¿Tiene Tatuajes o Aretes?</Label>
          <Checkbox
            onChange={e => handleChange(e.target.checked, 'tattoOrPiercing')}
            checked={values.tattoOrPiercing}
          >
            Si
          </Checkbox>
        </div>
        <div className="col-md-9">
          <Label htmlFor="whatTattoOrPiercing">Especifíque</Label>
          <Input
            onChange={e => handleChange(e.target.value, 'whatTattoOrPiercing')}
            value={values.whatTattoOrPiercing}
            size="large"
            disabled={!values.tattoOrPiercing}
          />
        </div>
      </div>
    </div>
  );
};

export default Health;
