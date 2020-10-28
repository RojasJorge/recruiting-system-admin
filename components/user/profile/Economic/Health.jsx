import { useState } from 'react';
import { Checkbox, Input, Select } from 'antd';

const { Option } = Select;

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
          <label style={{ width: '100%', display: 'block' }} htmlFor="haveDisease">
            ¿Padece de enfermedades?
          </label>
          <Checkbox onChange={e => handleChange(e.target.checked, 'haveDisease')} checked={values.haveDisease}>
            Si
          </Checkbox>
        </div>

        <div className="col-md-9">
          <label style={{ width: '100%', display: 'block' }} htmlFor="disease">
            Especifíque
          </label>
          <Input onChange={e => handleChange(e.target.value, 'disease')} value={values.disease} size="large" disabled={!values.haveDisease} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <label style={{ width: '100%', display: 'block' }} htmlFor="tattoOrPiercing">
            ¿Tiene Tatuajes o Aretes?
          </label>
          <Checkbox onChange={e => handleChange(e.target.checked, 'tattoOrPiercing')} checked={values.tattoOrPiercing}>
            Si
          </Checkbox>
        </div>
        <div className="col-md-9">
          <label style={{ width: '100%', display: 'block' }} htmlFor="whatTattoOrPiercing">
            Especifíque
          </label>
          <Input onChange={e => handleChange(e.target.value, 'whatTattoOrPiercing')} value={values.whatTattoOrPiercing} size="large" disabled={!values.tattoOrPiercing} />
        </div>
      </div>
    </div>
  );
};

export default Health;
