import PropTypes from 'prop-types';
import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, notification, Select, Space } from 'antd';
import { filter, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import moment from 'moment';

const { Item, List } = Form;
const { Option } = Select;

const Wrap = styled.fieldset`
  margin-bottom: 30px;
  padding: 24px;
  background-color: #f5f5f5;
  displau: flex;
`;

const AddRow = styled(Button)`
  margin: 0px;
`;

const Level = ({ level, counter, careers, academicLevels, addLevels, levels }) => {
  /** Global state */
  let {
    profile: {
      id,
      fields: { academic },
    },
  } = useStoreState(state => state.auth.user);

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const academicParent = filter(academicLevels, o => o.parent === null);

  const [children, setAcademicChildren] = useState([]);

  /** Current default level */
  const [_level, _setLevel] = useState(level);

  const switchChildren = (e, collection) => {
    const module = collection === 'academicLevels' ? academicLevels : careers;
    const localModule = collection === 'academicLevels' ? 'academic_level' : 'careers';
    const filtered = filter(module, o => o.parent === e);
    _setLevel({ ..._level, [localModule]: e });
    setAcademicChildren(filtered);
  };

  const switchSpecialization = e => {
    _setLevel({ ..._level, specialization: e });
  };

  const onChange = e => _setLevel({ ..._level, [e.target.name]: e.target.value });

  const switchCurrently = e => _setLevel({ ..._level, currently: e });

  const onDatePickerChange = (date, dateString, field) =>
    _setLevel({ ..._level, [field]: date.toString() });

  const onFinish = fields =>
    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            academic: {
              studies: fields.studies,
            },
          },
        }),
      )
      .then(resp => {
        updateProfile({
          type: 'academic',
          fields: Object.assign(academic, { studies: fields.studies }),
        });

        /** Send notification success */
        notify('success', 'Niveles académicos.', 'Actualizado correctamente..');
      })
      .catch(err => console.log('Error:', err));

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const initialValues = _ => {
    if (academic && academic.studies.length > 0) {
      academic.studies.map((row, index) => {
        row.dateInit = moment(row.dateInit);
        row.dateEnd = moment(row.dateEnd);
        return row;
      });
      return academic;
    } else {
      return {
        studies: [
          {
            currently: false,
          },
        ],
      };
    }
  };

  const dateFormat = 'DD/MM/YYYY';

  useEffect(() => {
    initialValues();
  });

  return (
    <>
      <Form initialValues={initialValues()} onFinish={onFinish}>
        <div className="umana-form--section">
          <h2>Niveles académicos</h2>
          <List name="studies" className="form-item--lg">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(field => (
                    <Space key={field.key} className="umana-form--group two-columns">
                      <Item
                        label="Establecimiento"
                        {...field}
                        name={[field.name, 'establishment']}
                        fieldKey={[field.fieldKey, 'establishment']}
                        rules={[{ required: true, message: 'Establecimiento es requerido.' }]}
                      >
                        <Input />
                      </Item>

                      <Item
                        label="Nivel Académico"
                        {...field}
                        name={[field.name, 'academicLevel']}
                        fieldKey={[field.fieldKey, 'academicLevel']}
                        rules={[{ required: true, message: 'Debes escoger un nivel académico' }]}
                      >
                        <Select
                          placeholder="Seleccione"
                          onChange={e => switchChildren(e, 'academicLevels')}
                          showSearch
                        >
                          {!isEmpty(academicParent) ? (
                            academicParent.map((o, i) => (
                              <Option value={o.id} key={i}>
                                {o.name}
                              </Option>
                            ))
                          ) : (
                            <Option value="0">No hay listado para mostrar</Option>
                          )}
                        </Select>
                      </Item>

                      <Item
                        label="Especialización"
                        {...field}
                        name={[field.name, 'specialization']}
                        fieldKey={[field.fieldKey, 'specialization']}
                      >
                        <Select
                          placeholder="Seleccione"
                          disabled={isEmpty(children)}
                          onChange={switchSpecialization}
                          onChange={switchSpecialization}
                          showSearch
                        >
                          {!isEmpty(children) ? (
                            children.map((o, i) => (
                              <Option value={o.id} key={i}>
                                {o.name}
                              </Option>
                            ))
                          ) : (
                            <Option value="0">No hay listado para mostrar</Option>
                          )}
                        </Select>
                      </Item>

                      <Item
                        label="Fecha de inicio"
                        {...field}
                        name={[field.name, 'dateInit']}
                        fieldKey={[field.fieldKey, 'dateInit']}
                        rules={[{ required: true, message: 'Fecha de inicio es requerida' }]}
                      >
                        <DatePicker
                          format={dateFormat}
                          style={{ width: '100%' }}
                          size="large"
                          onChange={(date, dateString) =>
                            onDatePickerChange(date, dateString, 'start_date')
                          }
                        />
                      </Item>

                      <Item
                        label="Fecha de fin"
                        {...field}
                        name={[field.name, 'dateEnd']}
                        fieldKey={[field.fieldKey, 'dateEnd']}
                        rules={[{ required: true, message: 'Fecha final es requerida' }]}
                      >
                        <DatePicker
                          style={{ width: '100%' }}
                          size="large"
                          format={dateFormat}
                          onChange={(date, dateString) =>
                            onDatePickerChange(date, dateString, 'end_date')
                          }
                        />
                      </Item>

                      <Item
                        label="Número de colegiado"
                        {...field}
                        name={[field.name, 'collegiate']}
                        fieldKey={[field.fieldKey, 'collegiate']}
                      >
                        <Input />
                      </Item>

                      <Item
                        label="¿Estudia aquí actualmente?"
                        {...field}
                        name={[field.name, 'currently']}
                        fieldKey={[field.fieldKey, 'currently']}
                        valuePropName="checked"
                      >
                        <Checkbox size="large" />
                      </Item>
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
                      style={{ width: '100%' }}
                      type="dashed"
                      size="large"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <i className="material-icons">add</i> Agregar nivel académico
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </List>
        </div>
        <Form.Item>
          <Button type="orange" size="small" htmlType="submit" style={{ marginLeft: 'auto' }}>
            Guardar y continuar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

Level.propTypes = {
  careers: PropTypes.array,
  academicLevels: PropTypes.array,
};

Level.defaultProps = {
  careers: [],
  academicLevels: [],
};

export default Level;
