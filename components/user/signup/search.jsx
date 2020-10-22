import { Radio } from 'antd';
const WhatScope = props => {
  return (
    <div>
      <Radio.Group onChange={e => props.setCurrent(e.target.value)} value={props.role} size="large">
        <Radio.Button value="candidate">
          <i className="material-icons">person</i> Estoy buscando Trabajo
        </Radio.Button>
        <Radio.Button value="company">
          <i className="material-icons">location_city</i> Estoy buscando Talentos
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default WhatScope;
