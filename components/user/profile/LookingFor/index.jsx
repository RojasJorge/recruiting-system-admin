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

  if (lookingFor.relocate === '') {
    lookingFor.relocate = false;
  }
  if (lookingFor.travel === '') {
    lookingFor.travel = false;
  }

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
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
        window.scroll({
          top: 80,
          behavior: 'smooth',
        });
        /** Send notification success */
        notify('success', 'Ficha Que buscas actualizada.', 'Vamos al siguiente paso...');

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

  return (
    <>
      <Form onFinish={onFinish} initialValues={lookingFor} scrollToFirstError={true} validateTrigger="onBlur">
        <div className="umana-form--section">
          <h2>¿Qué estas buscando?</h2>
          <Item label="Tipo de plaza" className="form-item--lg" name="availability" rules={[{ required: true, message: 'Tipo de plaza es requerido.' }]}>
            <Select size="large" placeholder="Seleccione" mode="multiple">
              <Option value="freelance">Independiente</Option>
              <Option value="practicing">Prácticas</Option>
              <Option value="temporary">Temporal</Option>
              <Option value="full_time">Tiempo completo</Option>
              <Option value="part_time">Medio tiempo</Option>
              <Option value="vacationer">Vacacionista</Option>
            </Select>
          </Item>
          <Item label="Plaza remota / locación" className="form-item--lg" name="workplace" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
            <Select size="large" placeholder="Seleccione" mode="multiple">
              <Option value="location">Locación</Option>
              <Option value="mix_location">Mixta</Option>
              <Option value="remote">Remoto</Option>
            </Select>
          </Item>

          <Item className="form-item--md" name="relocate" valuePropName="checked" label="¿Está dispuesto a reubicarse?" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
            <Switch checkedChildren="Si" unCheckedChildren="No" size="large" className="switch-large theme-orange" />
          </Item>

          <Item className="form-item--md" name="travel" valuePropName="checked" label="¿Disponibilidad para viajar?" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
            <Switch checkedChildren="Si" unCheckedChildren="No" size="large" className="switch-large theme-orange" />
          </Item>
        </div>

        <Item className="form-item--lg">
          <Button style={{ marginLeft: 'auto' }} type="orange" htmlType="submit" size="small">
            Guardar y continuar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default LookingFor;
