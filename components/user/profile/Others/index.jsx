import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Select, notification, Space } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import router from 'next/router';

const { Item, List } = Form;

const Others = ({ switchCurrent, current }) => {
  /** Global state */
  const {
    profile: {
      id,
      fields: { others },
    },
  } = useStoreState(state => state.auth.user);

  /** Personal info */
  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            others: fields,
          },
        }),
      )
      .then(resp => {
        updateProfile({ type: 'others', fields });

        /** Send notification success */
        notify('success', 'Ficha Otros actualizada.', '');
        switchCurrent(current + 1);
        router.push(`${router.router.pathname}?current=${current + 1}`);
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

  return (
    <>
      <Form onFinish={onFinish} initialValues={others}>
        <div className="umana-form--section">
          <h2>Otros conocimientos</h2>

          <Item label="Software" name="softwares">
            <Select mode="tags" />
          </Item>

          <Item label="Habilidades" name="skills">
            <Select mode="tags" />
          </Item>
        </div>
        <div className="umana-form--section">
          <h2>Idiomas</h2>
          <List name="languages" className="form-item--lg">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(field => (
                    <Space key={field.key} className="umana-form--group academic-level">
                      <Item
                        label="Idioma"
                        {...field}
                        name={[field.name, 'language']}
                        fieldKey={[field.fieldKey, 'language']}
                        rules={[
                          {
                            required: true,
                            message: 'Debes agregar un nombre',
                          },
                        ]}
                      >
                        <Input />
                      </Item>

                      <Item
                        label="Comprensión"
                        {...field}
                        name={[field.name, 'comprehension']}
                        fieldKey={[field.fieldKey, 'comprehension']}
                        rules={[
                          {
                            required: true,
                            message: 'Debes agregar un porcentaje',
                          },
                        ]}
                      >
                        <InputNumber min={0} />
                      </Item>

                      <Item
                        label="Hablando"
                        {...field}
                        name={[field.name, 'speak']}
                        fieldKey={[field.fieldKey, 'speak']}
                        rules={[
                          {
                            required: true,
                            message: 'Debes agregar un porcentaje',
                          },
                        ]}
                      >
                        <InputNumber min={0} />
                      </Item>

                      <Item
                        label="Comprensión"
                        {...field}
                        name={[field.name, 'write']}
                        fieldKey={[field.fieldKey, 'write']}
                        rules={[
                          {
                            required: true,
                            message: 'Debes agregar un porcentaje',
                          },
                        ]}
                      >
                        <InputNumber min={0} />
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
                  <Item>
                    <Button
                      style={{ width: '100%' }}
                      type="dashed"
                      size="large"
                      onClick={() => {
                        add();
                      }}
                      block
                    >
                      <i className="material-icons">add</i> Agregar idioma
                    </Button>
                  </Item>
                </>
              );
            }}
          </List>
        </div>
        <Item>
          <Button htmlType="submit" type="orange" size="small" style={{ marginLeft: 'auto' }}>
            Guardar y continuar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default Others;
