import { Form, Input, Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import xhr from '../../../xhr';
import { AreaJob } from '../../../elements';
import TynyEditor from '../../Misc/TinyEditor';

const { TextArea } = Input;

const GeneralJob = ({ career, position }) => {
  const [disabled, setDisabled] = useState(position);

  const strForSearch = str => {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : str;
  };

  return (
    <>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'Titulo de la plaza es requerido',
          },
        ]}
        name="title"
        label="Titulo"
      >
        <Input size="large" name="title" />
      </Form.Item>
      <Form.Item
        className="form-item--lg"
        label="Area de puesto"
        rules={[
          {
            required: true,
            message: 'El puesto es requerido',
          },
        ]}
        name="jobposition"
      >
        <AreaJob />
      </Form.Item>
      {!disabled ? (
        <Form.Item label="Agregar nombre de puesto" className="form-item--lg" name="positionalt">
          <>
            <Tooltip title="Agrega el nombre del puesto que no encontraste">
              <a className="help">
                <i className="material-icons">info_outline</i>
              </a>
            </Tooltip>
            <Input />
          </>
        </Form.Item>
      ) : null}

      <Form.Item
        label="Tipo de plaza"
        className="form-item--md"
        name="availability"
        rules={[
          {
            required: true,
            message: 'Este campo es requerido',
          },
        ]}
      >
        <Select showSearch>
          <Select.Option value="freelance">Independiente</Select.Option>
          <Select.Option value="practicing">Prácticas</Select.Option>
          <Select.Option value="temporary">Temporal</Select.Option>
          <Select.Option value="full_time">Tiempo completo</Select.Option>
          <Select.Option value="part_time">Medio tiempo</Select.Option>
          <Select.Option value="vacationer">Vacacionista</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item label="Plaza remota / locación" className="form-item--md" name="workplace" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
        <Select size="large" placeholder="Seleccione">
          <Option value="location">Locación</Option>
          <Option value="mix-location">Mixta</Option>
          <Option value="remote">Remoto</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Tipo de horario*" className="form-item--sm" name="schedule_type">
        <Select showSearch>
          <Select.Option value="daytime" key="daytime">
            Diurno
          </Select.Option>
          <Select.Option value="night" key="night">
            Nocturno
          </Select.Option>
          <Select.Option value="mix" key="mix">
            Mixto
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Horario" name="schedule" className="form-item--xf" help="Horario de Lunes a viernes de 8am a 5pm, Lunes a sábado de 9am a 6pm etc.">
        <Input name="schudele" />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: 'La descripción de la plaza es requerida',
          },
        ]}
        name="description"
        label="Descripción de la plaza"
      >
        <TynyEditor />
        {/*<TextArea rows={4} />*/}
      </Form.Item>
    </>
  );
};
export default GeneralJob;
