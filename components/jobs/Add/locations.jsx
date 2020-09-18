import { Form, Radio } from 'antd';
import { useState } from 'react';
import Locations from '../../Location';

const LocationJob = props => {
  const [isBranch, setBranch] = useState(props.isBranch);
  const checkLocation = (rule, value) => {
    if (value.country && value.province && value.city && value.address && value.zone > 0) {
      return Promise.resolve();
    }
    return Promise.reject('Todos los campos de esta sección son requeridos');
  };

  return (
    <>
      <Form.Item name="location" label="Ubicación de la plaza" rules={[{ validator: checkLocation }]} className="form-item--lg">
        <Locations />
      </Form.Item>

      <Form.Item name="isBranch" label="Lugar donde será la plaza" className="form-item--lg item-row">
        <Radio.Group onChange={e => setBranch(e.target.value)}>
          <Radio.Button value={false}>Oficina</Radio.Button>
          <Radio.Button value={true}>Sucursal</Radio.Button>
        </Radio.Group>
      </Form.Item>
      {isBranch ? (
        <>
          <Form.Item name="branch" label="Sucursal" rules={[{ validator: checkLocation }]} className="form-item--lg">
            <Locations />
          </Form.Item>
          <Form.Item label="¿Dónde se realizará la entrevista?" className={`form-item--lg item-row`} name="interviewPlace">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="office">Oficina</Radio.Button>
              <Radio.Button value="branch">Sucursal</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </>
      ) : null}
      <Form.Item name="locationState" label="Estado de la ubicación" className="form-item--lg item-row">
        <Radio.Group>
          <Radio.Button value="public">Pública</Radio.Button>
          <Radio.Button value="private">Privada</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
};

export default LocationJob;
