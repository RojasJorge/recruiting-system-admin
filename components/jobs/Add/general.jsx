import { Form, Input, Select, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import xhr from '../../../xhr';

const { TextArea } = Input;

const GeneralJob = ({ career }) => {
  const [disabled, setDisabled] = useState(true);

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
        <Input size="large" />
      </Form.Item>

      <Form.Item
        className="form-item--md"
        label="Puesto"
        rules={[
          {
            required: true,
            message: 'El puesto es requerido',
          },
        ]}
        name="profession"
      >
        <Select
          showSearch
          optionFilterProp="title"
          filterprop="title"
          filterOption={(input, option) => {
            if (option.children) {
              return strForSearch(option.children).includes(strForSearch(input));
            } else {
              if (option.options) {
                return strForSearch(option.label).includes(strForSearch(input));
              }
              return false;
            }
          }}
          onChange={e => (e === 'otros' ? setDisabled(false) : setDisabled(true))}
        >
          <Select.OptGroup key="otros" label="Otros">
            <Select.Option key="otro" value="otros">
              Otro, agregar puesto
            </Select.Option>
          </Select.OptGroup>
          {career
            ? career
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e, idx) => (
                  <Select.OptGroup key={idx} label={e.name}>
                    {e.children
                      ? e.children
                          .sort((z, x) => (z.name > x.name ? 1 : -1))
                          .map((m, index) => (
                            <Select.Option key={m.id} value={m.id}>
                              {m.name}
                            </Select.Option>
                          ))
                      : null}
                  </Select.OptGroup>
                ))
            : null}
        </Select>
      </Form.Item>
      {!disabled ? (
        <Form.Item label="Agregar nombre de puesto" className="form-item--md" name="professionalt">
          <>
            <Tooltip title="Agrega el nombre del puesto que no encontraste">
              <a className="help">
                <i className="material-icons">info_outline</i>
              </a>
            </Tooltip>
            <Input disabled={disabled} />
          </>
        </Form.Item>
      ) : null}
      <Form.Item
        className="form-item--lg"
        label="Puestos para matching"
        rules={[
          {
            required: true,
            message: 'El matching es requerido',
          },
        ]}
        name="area"
        // help="Este campo se utilizará para encontrar los mejores candidatos para esta plaza. (Este campo no será visible)"
      >
        <Select
          showSearch
          mode="tags"
          optionFilterProp="title"
          filterprop="title"
          filterOption={(input, option) => {
            if (option.children) {
              return strForSearch(option.children).includes(strForSearch(input));
            } else {
              if (option.options) {
                return strForSearch(option.label).includes(strForSearch(input));
              }
              return false;
            }
          }}
          onChange={e => (e === 'otros' ? setDisabled(false) : setDisabled(true))}
        >
          <Select.OptGroup key="otros" label="Otros">
            <Select.Option key="otro" value="otros">
              Otro, agregar puesto
            </Select.Option>
          </Select.OptGroup>
          {career
            ? career
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((e, idx) => (
                  <Select.OptGroup key={idx} label={e.name}>
                    {e.children
                      ? e.children
                          .sort((z, x) => (z.name > x.name ? 1 : -1))
                          .map((m, index) => (
                            <Select.Option key={m.id} value={m.id}>
                              {m.name}
                            </Select.Option>
                          ))
                      : null}
                  </Select.OptGroup>
                ))
            : null}
        </Select>
      </Form.Item>

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
          <Select.Option value="freelance" key="freelance">
            Freelance
          </Select.Option>
          <Select.Option value="practice" key="practice">
            Prácticas
          </Select.Option>
          <Select.Option value="temporal" key="temporal">
            Temporal
          </Select.Option>
          <Select.Option value="full" key="full">
            Tiempo completo
          </Select.Option>
          <Select.Option value="part" key="part">
            Medio Tiempo
          </Select.Option>
          <Select.Option value="vacacionista" key="vacacionista">
            Vacacionista
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Giro de negocio de la empresa"
        className="form-item--md"
        name="businessturn"
      >
        <Input name="businessturn" />
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
      <Form.Item
        label="Horario"
        name="schedule"
        className="form-item--xf"
        help="Horario de Lunes a viernes de 8am a 5pm, Lunes a sábado de 9am a 6pm etc."
      >
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
        label="Descripción de la empresa"
      >
        <TextArea rows={4} />
      </Form.Item>
    </>
  );
};
export default GeneralJob;