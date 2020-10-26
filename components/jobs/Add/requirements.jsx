import { Form, Input, InputNumber, Select, Radio, Slider, Checkbox } from 'antd';
import religiones from '../../../data/religion.json';
import skills from '../../../data/skills_softwares.json';

const Requirements = () => {
  const marks = {
    1: 'Min',
    18: '18 años',
    60: '60 años',
    80: 'Max',
  };

  const children = [];

  children.push(<Option key=""></Option>);

  return (
    <>
      <Form.Item label="Sexo" name="gender" className="form-item--lg">
        <Radio.Group>
          <Radio.Button value="indifferent">Indiferente</Radio.Button>
          <Radio.Button value="male">Masculino</Radio.Button>
          <Radio.Button value="female">Femenino</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <div className="umana-form--group group-row">
        <Form.Item name="age" label="Edad" className="form-item--fx" help="Seleccione rango de edad">
          <Slider
            min={1}
            max={80}
            marks={marks}
            range
            // value={[customer.age.min, customer.age.max]}
          />
        </Form.Item>
      </div>
      <div className="umana-form--group group-row">
        <Form.Item name="religion" label="Religión" className="form-item--fx">
          <Select mode="tags" style={{ width: '100%' }}>
            <Select.Option value="indifferent" key="indifferent">
              Indiferente
            </Select.Option>

            {religiones
              ? religiones.map((o, k) => (
                  <Select.Option value={o} key={k}>
                    {o}
                  </Select.Option>
                ))
              : null}
          </Select>
        </Form.Item>
      </div>
      <Form.Item label="Años de experiencia" className="form-item--lg" name="experience">
        <InputNumber max={100} min={0} />
      </Form.Item>
      {/* <Form.Item
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
        <Select placeholder="Agrega elementos al dar enter" mode="tags" />
      </Form.Item> */}

      <br />
      <h3 style={{ width: '100%' }}>Otros Requerimientos</h3>
      <br />
      <Form.Item
        label="Habilidades, conocimientos, capacidades y Software"
        className="form-item--lg"
        name="skills"
        rules={[
          {
            required: true,
            message: 'Este campo es requerido',
          },
        ]}
      >
        <Select mode="tags" placeholder="Agrega elementos al dar enter">
          {skills
            ? skills
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item, idx) => (
                  <Select.OptGroup key={idx} label={item.title}>
                    {item.options
                      .sort((a, b) => (a.name > b.name ? 1 : -1))
                      .map((child, id) => (
                        <Select.Option key={id + child} value={child}>
                          {child}
                        </Select.Option>
                      ))}
                  </Select.OptGroup>
                ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item label="Atribuciones" className="form-item--lg" name="responsibilities">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Requerimientos adicionales" className="form-item--lg" name="requirements">
        <Input.TextArea />
      </Form.Item>

      <Form.Item label="Vehículos" className="form-item--lg" name="vehicle">
        <Radio.Group>
          <Radio.Button value="indifferent">Indiferente</Radio.Button>
          <Radio.Button value="vehicle">Vehiculo</Radio.Button>
          <Radio.Button value="motorcycle">Motocicleta</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Tipo de Licencia" className="form-item--lg" name="type_license">
        <Radio.Group>
          <Radio.Button value="indifferent">Indiferente</Radio.Button>
          <Radio.Button value="a">A</Radio.Button>
          <Radio.Button value="b">B</Radio.Button>
          <Radio.Button value="c">C</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </>
  );
};
export default Requirements;
