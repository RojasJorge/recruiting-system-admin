import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Divider, Form, Input, InputNumber, notification, Select } from 'antd';
import Salary from './Salary';
import { useState } from 'react';
import Health from './Health';
import Legal from './Legal';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import router from 'next/router';
import Vehicle from './Vehicle';
import Debts from './debts';

const { Item, List } = Form;
const { Option } = Select;

const Economic = ({ current, switchCurrent }) => {
  /** Global state */
  let {
    profile: {
      id,
      fields: { economic },
    },
  } = useStoreState(state => state.auth.user);

  const [checks, updateChecks] = useState({
    otherIncome: economic.otherIncome,
  });

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            economic: fields,
          },
        }),
      )
      .then(resp => {
        updateProfile({ type: 'economic', fields });

        /** Send notification success */
        notify('success', 'Economía/Legal', 'Actualizado correctamente.');
        switchCurrent(0);
        router.push(`${router.router.pathname}?current=${0}`);
      })
      .catch(err => notify('error', 'Error', 'Ha ocurrido un error, intenta de nuevo más tarde'));
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
      <Form onFinish={onFinish} initialValues={economic}>
        <div className="umana-form--section">
          <h2 style={{ width: '100%' }}>Información Económica</h2>
          <Item name="typeHousing" label="Tipo de vivienda" className="form-item--md">
            <Select>
              {[
                {
                  name: 'own',
                  translation: 'Casa propia',
                },
                {
                  name: 'family',
                  translation: 'Familiar',
                },
                {
                  name: 'rented',
                  translation: 'Renta',
                },
              ].map((op, index) => (
                <Option key={index} value={op.name}>
                  {op.translation}
                </Option>
              ))}
            </Select>
          </Item>

          <Item name="dependents" label="Dependientes" className="form-item--md">
            <InputNumber min={0} size="large" />
          </Item>
          <Item name="currentSalary" label="Salario actual" className="form-item--lg">
            <InputNumber size="large" />
          </Item>
          <Item name="desiredSalary" label="Salario deseado" className="form-item--lg">
            <Salary />
          </Item>

          <hr />
          <Item name="otherIncome" valuePropName="checked" className="form-item--lg">
            <Checkbox onChange={e => updateChecks({ ...checks, otherIncome: e.target.checked })}>
              ¿Tiene otros ingresos?
            </Checkbox>
          </Item>
          {checks.otherIncome ? (
            <>
              <Item name="otherIncomeValue" label="Escriba monto" className="form-item--md">
                <InputNumber min={0} size="large" />
              </Item>

              <Item name="sourceIncome" label="Escriba la fuente" className="form-item--md">
                <Input size="large" />
              </Item>
            </>
          ) : null}
        </div>
        <Debts />
        <Vehicle />
        <div className="umana-form--section">
          <h2>Salud</h2>
          <Item name="health">
            <Health />
          </Item>
        </div>
        <div className="umana-form--section">
          <h2>Información Legal</h2>
          <Item name="legal">
            <Legal />
          </Item>
          <Item name="allowed" valuePropName="checked">
            <Checkbox>
              Autorizo expresamente a las empresas que distribuyen o comercializan con datos
              personales, para que distribuyan / comercialicen estudios que contengan datos
              personales concernientes a mi persona, a efecto de verificar la información
              proporcionada; y autorizo que mis datos personales sean compartidos / distribuidos a
              empresas que presten servicios de información personal: según los artículos 9 numeral
              y 64 Ley de Acceso a la Información Pública, 19, 21, 22, 28, 46. Ley contra Lavado de
              Dinero y Otros Activos y 12 y 20 de su Reglamento: 50, 55, 56, 58. Ley de Bancos y
              Grupos Financieros entre otros. Doy fe que la información proporcionada es verdadera y
              queda a disposición de ser verificada por UMANA RH.
            </Checkbox>
          </Item>
        </div>

        <Item className="form-item--lg">
          <Button type="orange" htmlType="submit" size="small" style={{ marginLeft: 'auto' }}>
            Guardar
          </Button>
        </Item>
      </Form>
    </>
  );
};

export default Economic;
