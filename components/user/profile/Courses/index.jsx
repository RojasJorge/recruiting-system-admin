import { MinusCircleOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, notification, Space } from 'antd';
import styled from 'styled-components';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import moment from 'moment';

const { Item, List } = Form;

const Wrap = styled.fieldset`
  margin-bottom: 30px;
  padding: 24px;
  background-color: #f5f5f5;
`;

const AddRow = styled(Button)`
  margin: 0px;
`;

const Courses = _ => {
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

        /** Send notification success */
        notify('success', 'Niveles académicos.', 'Actualizado correctamente..');
      })
      .catch(err => console.log('Error:', err));
  };

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
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
      <Form onFinish={onFinish} initialValues={initialValues()}>
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

                      <Item
                        label="País"
                        {...field}
                        name={[field.name, 'country']}
                        fieldkey={[field.fieldKey, 'country']}
                        rules={[{ required: true, message: 'País es requerido.' }]}
                      >
                        <Input />
                      </Item>

                      <Item
                        label="Año"
                        {...field}
                        name={[field.name, 'year']}
                        fieldkey={[field.fieldKey, 'year']}
                        rules={[{ required: true, message: 'Año es requerido' }]}
                      >
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
