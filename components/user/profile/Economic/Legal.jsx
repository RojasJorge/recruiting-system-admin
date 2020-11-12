import { useState } from 'react';
import { Input, InputNumber, Select, Checkbox } from 'antd';

const { Option } = Select;

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
      <div className="col-md-3" style={{ marginBottom: 20 }}>
        <label style={{ width: '100%', display: 'block' }} htmlFor="legalProblem">
          ¿Tiene algún problema legal?
        </label>
        <Checkbox onChange={e => handleChange(e.target.checked, 'legalProblem')} checked={values.legalProblem}>
          Si
        </Checkbox>
      </div>
      <br />
      <div className="col-md-9" style={{ marginBottom: 20 }}>
        <label style={{ width: '100%', display: 'block' }} htmlFor="whatProblem">
          ¿Qué tipo de problema?
        </label>
        <Input onChange={e => handleChange(e.target.value, 'whatProblem')} value={values.whatProblem} size="large" />
      </div>
      <br />
      <div className="col-md-3" style={{ marginBottom: 20 }}>
        <label style={{ width: '100%', display: 'block' }} htmlFor="legalProblem">
          ¿Ha pertenecido a algún sindicato?
        </label>
        <Checkbox onChange={e => handleChange(e.target.checked, 'sindicate')} checked={values.sindicate}>
          Si
        </Checkbox>
      </div>
      <br />
      <div className="col-md-9" style={{ marginBottom: 20 }}>
        <label style={{ width: '100%', display: 'block' }} htmlFor="whatsindicate">
          ¿Qué sindicato?
        </label>
        <Input onChange={e => handleChange(e.target.value, 'whatsindicate')} value={values.whatsindicate} size="large" />
      </div>
      <br />
      <div className="col-md-9" style={{ marginTop: 30 }}>
        <label style={{ width: '100%', display: 'block' }} htmlFor="infonetOrOther">
          Autorizo a Umana a solicitar información personal por Infonet
        </label>
        <Checkbox onChange={e => handleChange(e.target.checked, 'infonetOrOther')} checked={values.infonetOrOther}>
          Si
        </Checkbox>
      </div>
    </div>
  );
};

export default Legal;
