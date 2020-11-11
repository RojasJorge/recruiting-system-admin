import { Button, DatePicker, Form, Input, notification, Select, Space } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import moment from 'moment';
import router from 'next/router';
import WorldCountries from 'world-countries';

const { Item, List } = Form;
const { Option } = Select;

const Courses = ({ switchCurrent, current }) => {
  /** Global state */
  let {
    profile: {
      id,
      fields: { academic },
    },
  } = useStoreState(state => state.auth.user);

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            academic: {
              courses: fields.courses,
            },
          },
        }),
      )
      .then(resp => {
        updateProfile({
          type: 'academic',
          fields: Object.assign(academic, { courses: fields.courses }),
        });

        window.scroll({
          top: 80,
          behavior: 'smooth',
        });

        /** Send notification success */
        notify('success', 'Niveles académicos.', 'Actualizado correctamente..');

        router.push(`${router.router.pathname}?current=${parseInt(router.router.query.current, 10) + 1}`);
      })
      .catch(err => console.log('Error:', err));
  };

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  const initialValues = _ => {
    if (academic && academic.courses.length > 0) {
      academic.courses.map((row, index) => {
        row.year = moment(row.year);
        return row;
      });
      return academic;
    } else {
      return {};
    }
  };

  // const dateFormat = 'DD/MM/YYYY'

  return (
    <>
      <Form onFinish={onFinish} initialValues={initialValues()} validateTrigger="onBlur">
        {/*<pre>{JSON.stringify(WorldCountries[0], false, 2)}</pre>*/}
        <div className="umana-form--section">
          <h2>Otros cursos</h2>
          <List name="courses" className="form-item--lg">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(field => (
                    <Space key={field.key} className="umana-form--group academic-level">
                      <Item
                        label="Establecimiento"
                        {...field}
                        name={[field.name, 'establishment']}
                        fieldkey={[field.fieldKey, 'establishment']}
                        rules={[{ required: true, message: 'Establecimiento es requerido.' }]}
                      >
                        <Input />
                      </Item>

                      <Item
                        label="Título"
                        {...field}
                        name={[field.name, 'titleCourse']}
                        fieldkey={[field.fieldKey, 'titleCourse']}
                        rules={[{ required: true, message: 'Título del curso es requerido.' }]}
                      >
                        <Input />
                      </Item>

                      <Item label="País" {...field} name={[field.name, 'country']} fieldkey={[field.fieldKey, 'country']} rules={[{ required: true, message: 'País es requerido.' }]}>
                        <Select
                          showSearch
                          allowClear
                          optionFilterProp="children"
                          // filterOption={(input, option) =>
                          // 	option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          // }
                        >
                          {WorldCountries.map((country, key) => (
                            <Option key={key} value={country.name.official}>
                              {country.flag} {country.name.official}
                            </Option>
                          ))}
                        </Select>
                      </Item>

                      <Item label="Año" {...field} name={[field.name, 'year']} fieldkey={[field.fieldKey, 'year']} rules={[{ required: true, message: 'Año es requerido' }]}>
                        <DatePicker picker="year" style={{ width: '100%' }} size="large" />
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

                  <Button
                    style={{ width: '100%' }}
                    type="dashed"
                    size="large"
                    onClick={() => {
                      add();
                    }}
                    block
                  >
                    <i className="material-icons">add</i> Agregar curso
                  </Button>
                </>
              );
            }}
          </List>
        </div>
        <Item>
          <Button size="small" type="orange" htmlType="submir" style={{ marginLeft: 'auto' }}>
            Guardar y continuar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default Courses;
