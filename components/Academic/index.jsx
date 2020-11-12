import { Form, Button, InputNumber, Select, Space, Input, Radio } from 'antd';
import { useState } from 'react';
import xhr from '../../xhr';
import Speciality from './speciality';

const AcademicLeves = ({ acLevel }) => {
  const [level, setLevel] = useState({});
  const [disabled, setDisebled] = useState();

  const handlenSelct = e => {
    setLevel(acLevel.filter(f => f.id === e)[0]);
  };

  return (
    <Form.List name="academic_level" className="form-item--lg">
      {(fields, { add, remove }) => {
        return (
          <div style={{ width: '100%', marginTop: 20 }}>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', paddingBottom: 5 }} align="start" className="umana-form--group no-wrap academicLevel">
                <Form.Item
                  {...field}
                  name={[field.name, 'id']}
                  fieldKey={['id' + field.fieldKey, 'id']}
                  label="Nivel académico"
                  rules={[
                    {
                      required: true,
                      message: 'Este campo es requerido',
                    },
                  ]}
                >
                  <Select showSearch onChange={e => handlenSelct(e)}>
                    {acLevel
                      ? acLevel.map(l =>
                          l.status ? (
                            <Select.Option key={l.id} value={l.id}>
                              {l.name}
                            </Select.Option>
                          ) : null,
                        )
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'children']}
                  fieldKey={['name' + field.fieldKey, 'children']}
                  label="Especialización"
                  rules={[
                    {
                      required: true,
                      message: 'Este campo es requerido',
                    },
                  ]}
                >
                  <Speciality level={level} />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, 'studyNow']}
                  fieldKey={[field.fieldKey, 'studyNow']}
                  label="Se permiten estudiantes"
                  rules={[{ required: true, message: 'Este campo es requerido.' }]}
                >
                  <Radio.Group>
                    <Radio.Button value={true}>Si</Radio.Button>
                    <Radio.Button value={false}>No</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'logic']} fieldKey={['logic' + field.fieldKey, 'logic']} label="Condición Logica">
                  <Radio.Group
                    onChange={() => {
                      add();
                      setDisebled(field.fieldKey);
                    }}
                    disabled={disabled >= field.fieldKey ? true : false}
                  >
                    <Radio.Button value={true}>O</Radio.Button>
                    <Radio.Button value={false}>Y</Radio.Button>
                  </Radio.Group>
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
                  add({ studyNow: true });
                }}
              >
                <i className="material-icons">add</i> Agregar nivel académico
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default AcademicLeves;
