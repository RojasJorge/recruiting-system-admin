import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Tooltip,
  Radio,
  Slider,
  Checkbox,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import Locations from '../Location';
import xhr from '../../xhr';
import religiones from '../../data/religion.json';
import languages from '../../data/language.json';

const { TextArea } = Input;
const { Option, OptGroup } = Select;

const FormJob = props => {
  const data = useStoreState(state => state.collections);
  const fill = useStoreActions(actions => actions.collections.fill);
  const [career, setCareer] = useState([]);
  /** Get collection */
  const get = () =>
    xhr()
      // .get(`/${type}?pager=${JSON.stringify({ page: 1, limit: 1000 })}`)
      .get(`/career`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setCareer(data.list);
  }, [data.list]);

  useEffect(() => {
    get();
  }, []);

  const marks = {
    1: 'Min',
    18: '18 años',
    60: '60 años',
    80: 'Max',
  };

  const strForSearch = str => {
    return str
      ? str
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : str;
  };

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const onFinish = e => {
    console.log(e);
  };
  return (
    <div>
      <Form
        scrollToFirstError={true}
        onFinish={onFinish}
        className="umana-form umana-max-witdh"
        initialValues={{
          locationState: 'public',
          interviewPlace: 'office',
          gender: 'indifferent',
          vehicle: 'indifferent',
          type_license: 'indifferent',
          age: [18, 60],
          isBranch: false,
        }}
      >
        <div className="umana-form--section">
          <h2 style={{ width: '100%' }}>Información general</h2>
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
            label="Puesto*"
            rules={[
              {
                required: true,
                message: 'El puesto es requerido',
              },
            ]}
            name="jobtitle"
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
            >
              <OptGroup key="otros" label="Otros">
                <Option key="otro" value="otro">
                  Otro, agregar puesto
                </Option>
              </OptGroup>
              {career
                ? career
                    .sort((a, b) => (a.name > b.name ? 1 : -1))
                    .map((e, idx) => (
                      <OptGroup key={idx} label={e.name}>
                        {e.children
                          ? e.children
                              .sort((z, x) => (z.name > x.name ? 1 : -1))
                              .map((m, index) => (
                                <Option key={m.id} value={m.id}>
                                  {m.name}
                                </Option>
                              ))
                          : null}
                      </OptGroup>
                    ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            label="Agregar nombre de puesto"
            className="form-item--md"
            name="professionalt"
          >
            <>
              <Tooltip title="Agrega el nombre del puesto que no encontraste">
                <a className="help">
                  <i className="material-icons">info_outline</i>
                </a>
              </Tooltip>
              <Input name="professionalt" />
            </>
          </Form.Item>
          <Form.Item
            className="form-item--lg"
            label="Puestos de Matching*"
            rules={[
              {
                required: true,
                message: 'Este puesto es requerido',
              },
            ]}
            name="jobtitle"
            help={`Selecciona varias optiones`}
          >
            <>
              <Tooltip title="Este campo se utilizará para encontrar los mejores candidatos para esta plaza. (Este campo no será visible)">
                <a className="help">
                  <i className="material-icons">info_outline</i>
                </a>
              </Tooltip>
              <Select
                // onChange={e => (e && e.length < 4 ? handleSelect(e, "area") : null)}
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
              >
                {career
                  ? career
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((e, idx) => (
                        <OptGroup key={idx} label={e.name}>
                          {e.children
                            ? e.children
                                .sort((z, x) => (z.name > x.name ? 1 : -1))
                                .map((m, index) => (
                                  <Option key={m.id} value={m.id}>
                                    {m.name}
                                  </Option>
                                ))
                            : null}
                        </OptGroup>
                      ))
                  : null}
              </Select>
            </>
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
              <Option value="freelance" key="freelance">
                Freelance
              </Option>
              <Option value="practice" key="practice">
                Prácticas
              </Option>
              <Option value="temporal" key="temporal">
                Temporal
              </Option>
              <Option value="full" key="full">
                Tiempo completo
              </Option>
              <Option value="part" key="part">
                Medio Tiempo
              </Option>
              <Option value="vacacionista" key="vacacionista">
                Vacacionista
              </Option>
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
              <Option value="daytime" key="daytime">
                Diurno
              </Option>
              <Option value="night" key="night">
                Nocturno
              </Option>
              <Option value="mix" key="mix">
                Mixto
              </Option>
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
        </div>
        <div className="umana-form--section" id="location">
          <Locations title="Ubicacion" subtitle="ubicación de la empresa" />
          <Form.Item
            name="locationState"
            label="Estado de la ubicación"
            className="form-item--lg item-row"
          >
            <Radio.Group>
              <Radio.Button value="public">Pública</Radio.Button>
              <Radio.Button value="private">Privada</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="isBranch"
            label="Lugar donde será la plaza"
            className="form-item--lg item-row"
          >
            <Radio.Group>
              <Radio.Button value={false}>Oficina</Radio.Button>
              <Radio.Button value={true}>Sucursal</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Locations subtitle="Ubicación de la sucursal" />

          <Form.Item
            label="¿Dónde se realizará la entrevista?"
            className={`form-item--lg item-row`}
            name="interviewPlace"
          >
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="office">Oficina</Radio.Button>
              <Radio.Button value="branch">Sucursal</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="umana-form--section" id="requirements">
          <h2 style={{ width: '100%' }}>Requerimientos</h2>
          <br />
          <Form.Item label="Sexo" name="gender" className="form-item--lg">
            <Radio.Group>
              <Radio.Button value="indifferent">Indiferente</Radio.Button>
              <Radio.Button value="male">Masculino</Radio.Button>
              <Radio.Button value="female">Femenino</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div className="umana-form--group group-row">
            <Form.Item
              name="age"
              label="Edad"
              className="form-item--fx"
              help="Seleccione rango de edad"
            >
              <Slider
                min={1}
                max={80}
                marks={marks}
                range
                // value={[customer.age.min, customer.age.max]}
              />
            </Form.Item>
            <Form.Item className="form-item--md" label=" ">
              <Checkbox>Edad es indiferente</Checkbox>
            </Form.Item>
          </div>
          <div className="umana-form--group group-row">
            <Form.Item name="religion" label="Religión" className="form-item--fx">
              <Select mode="tags" style={{ width: '100%' }}>
                <Option value="indifferent" key="indifferent">
                  Indiferente
                </Option>

                {religiones
                  ? religiones.map((o, k) => (
                      <Option value={o} key={k}>
                        {o}
                      </Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
            <Form.Item className="form-item--md" label=" ">
              <Checkbox>Religión es indiferente</Checkbox>
            </Form.Item>
          </div>
          <Form.Item label="Años de experiencia" className="form-item--lg" name="experience">
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Habilidades*"
            className="form-item--lg"
            rules={[
              {
                required: true,
                message: 'Este campo es requerido',
              },
            ]}
            name="skills"
            help="Agregar Habilidades y/o competencias requeridas la plaza: (Ejemplo: Relaciones
            interpersonales, creatividad, actitud positiva, entre otras)"
          >
            <Select placeholder="Agrega elementos al dar enter" mode="tags" showSearch={false} />
          </Form.Item>

          <br />
          <h3 style={{ width: '100%' }}>Otros Requerimientos</h3>
          <br />
          <Form.Item
            label="Softwares requeridos"
            className="form-item--lg"
            name="softwares"
            help="Agrega aquí uno o varios softwares requeridos."
          >
            <Select placeholder="Agrega elementos al dar enter" mode="tags" />
          </Form.Item>

          <Form.Item label="Atribuciones" className="form-item--lg" name="responsibilities">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Requerimientos adicionales"
            className="form-item--lg"
            name="requirements"
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Vehículos" className="form-item--lg" name="vehicle">
            <Radio.Group>
              <Radio.Button value="indifferent">Indiferente</Radio.Button>
              <Radio.Button value="vehicle">Vehiculo</Radio.Button>
              <Radio.Button value="motorcycle">Motocicleta</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Número de Licencia" className="form-item--lg" name="type_license">
            <Radio.Group>
              <Radio.Button value="indifferent">Indiferente</Radio.Button>
              <Radio.Button value="a">A</Radio.Button>
              <Radio.Button value="b">B</Radio.Button>
              <Radio.Button value="c">C</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="umana-form--section" id="languages">
          <h2 style={{ width: '100%', margin: 0 }}>Idiomas</h2>
          <Form.List name="languages" className="form-item--lg">
            {(fields, { add, remove }) => {
              return (
                <div style={{ width: '100%', marginTop: 20 }}>
                  {fields.map(field => (
                    <Space
                      key={field.key}
                      style={{ display: 'flex', paddingBottom: 5 }}
                      align="start"
                      className="umana-form--group"
                    >
                      <Form.Item
                        {...field}
                        name={[field.name, 'language']}
                        fieldKey={['language' + field.fieldKey, 'language']}
                        label="Idioma"
                      >
                        <Select showSearch>
                          {languages ? languages.map(l => <Option key={l}>{l}</Option>) : null}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'comprehension']}
                        fieldKey={['comprehension' + field.fieldKey, 'comprehension']}
                        label="Comprensión"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'speak']}
                        fieldKey={['speak' + field.fieldKey, 'speak']}
                        label="Hablado"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'write']}
                        fieldKey={['write' + field.fieldKey, 'write']}
                        label="Escrito"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                      <a
                        key={field.key + 'add'}
                        className="form-item--delete"
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        <i className="material-icons">cancel</i>
                      </a>
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      size="large"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <i className="material-icons">add</i> Agregar idioma
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </div>

        {/* <div className="umana-form--section" id="academicLevel">
          <h2 style={{ width: '100%', margin: 0 }}>Idiomas</h2>
          <Form.List name="languaje" className="form-item--lg">
            {(fields, { add, remove }) => {
              return (
                <div style={{ width: '100%', marginTop: 20 }}>
                  {fields.map(field => (
                    <div
                      key={field.key}
                      style={{ display: 'flex', paddingBottom: 5 }}
                      align="start"
                      className="umana-form--group"
                    >
                      <a
                        className="form-item--delete"
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        <i className="material-icons">cancel</i>
                      </a>
                      <Form.Item
                        {...field}
                        name={[field.name, 'language']}
                        fieldKey={[field.fieldKey, 'language']}
                        label="Idioma"
                        className="form-item--lg"
                      >
                        <Select showSearch>
                          {languages ? languages.map(l => <Option key={l}>{l}</Option>) : null}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'comprehension']}
                        fieldKey={[field.fieldKey, 'comprehension']}
                        className="form-item--sm"
                        label="Comprensión"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'speak']}
                        fieldKey={[field.fieldKey, 'speak']}
                        className="form-item--sm"
                        label="Hablado"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, 'write']}
                        fieldKey={[field.fieldKey, 'write']}
                        className="form-item--sm"
                        label="Escrito"
                      >
                        <InputNumber formatter={value => `${value}%`} />
                      </Form.Item>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      size="large"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <i className="material-icons">add</i> Agregar idioma
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
        </div> */}

        {/* end group */}
        <Form.Item className="umana-form--footer">
          <Button htmlType="submit" type="primary">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormJob;
