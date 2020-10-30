import { useState } from 'react';
import { isEmpty } from 'lodash';
import { InputNumber, Slider } from 'antd';

const Age = ({ value, onChange }) => {
  let initialState = {
    min: 18,
    max: 60,
  };

  if (isEmpty(value)) {
    initialState = {
      min: value.min,
      max: value.max,
    };
  }
  const [state, setState] = useState(initialState);

  const marks = {
    18: 'Min 18 años',
    60: '60 años',
    70: 'Max',
  };

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({
        ...value,
        ...state,
        ...changedValue,
      });
    }
  };

  const handlenChange = (e, type) => {
    setState({ ...state, [type]: e });
    triggerChange({ [type]: e });
  };

  const handleSlider = e => {
    setState({ ...state, min: e[0], max: e[1] });
    triggerChange({ min: e[0], max: e[1] });
  };

  return (
    <div className="umana-form--group" style={{ paddingBottom: 0 }}>
      {/* <span className="form-item--sm ant-form-item" style={{ width: 50 }}>
        <label>Mínima:</label>
        <InputNumber min={18} max={70} value={state.min} onChange={e => handlenChange(e, 'min')} />
      </span> */}
      <span className="form-item--fx ant-form-item">
        <Slider min={17} max={70} marks={marks} value={[state.min, state.max]} range onChange={handleSlider} style={{ marginTop: 'auto' }} />
      </span>
      {/* <span className="form-item--sm ant-form-item" style={{ width: 50 }}>
        <label>Máxima:</label>
        <InputNumber min={18} max={70} value={state.max} onChange={e => handlenChange(e, 'max')} />
      </span> */}
    </div>
  );
};

export default Age;
