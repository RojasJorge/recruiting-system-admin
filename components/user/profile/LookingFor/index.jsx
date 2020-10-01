import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Form, notification, Select, Switch } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import xhr from '../../../../xhr';
import router from 'next/router';

const { Item } = Form;
const { Option } = Select;

const LookingFor = ({ switchCurrent, current }) => {
  /** Global state */
  const {
    profile: {
      id,
      fields: { lookingFor },
    },
  } = useStoreState(state => state.auth.user);

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    // console.log('lookingFor:', fields)
    // return true;
    let merged = Object.assign(lookingFor, fields);

    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            lookingFor: fields,
          },
        }),
      )
      .then(resp => {
        updateProfile({ type: 'lookingFor', fields: merged });

        /** Send notification success */
        notify('success', 'Ficha Que buscas actualizada.', 'Vamos al siguiente paso...');
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
      <Form onFinish={onFinish} initialValues={lookingFor}>
        <Item
          label="Tipo de plaza"
          className="form-item--lg"
          name="availability"
          rules={[{ required: true, message: 'Tipo de plaza es requerido.' }]}
        >
          <Select size="large" placeholder="Seleccione">
            <Option value="freelance">Independiente</Option>
            <Option value="practicing">Prácticas</Option>
            <Option value="temporal">Temporal</Option>
            <Option value="full_time">Tiempo completo</Option>
            <Option value="part_time">Medio tiempo</Option>
            <Option value="vacationer">Vacacionista</Option>
          </Select>
        </Item>

        <Item
          className="form-item--md"
          name="relocate"
          valuePropName="checked"
          label="¿Está dispuesto a reubicarse?"
        >
          <Switch checkedChildren="Si" unCheckedChildren="No" />
        </Item>

        <Item
          className="form-item--md"
          name="travel"
          valuePropName="checked"
          label="¿Disponibilidad para viajar?"
        >
          <Switch checkedChildren="Si" unCheckedChildren="No" />
        </Item>

        <Item className="form-item--lg" style={{ marginTop: 30 }}>
          <Button style={{ width: '100%' }} type="orange" htmlType="submit" size="large">
            Confirmar y continuar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default LookingFor;
