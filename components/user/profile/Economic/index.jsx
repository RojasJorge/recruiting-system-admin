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
  const [checks, updateChecks] = useState({
    otherIncomes: false,
  });

  /** Global state */
  let {
    profile: {
      id,
      fields: { economic },
    },
  } = useStoreState(state => state.auth.user);

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
        notify('success', 'Experiencia laboral.', 'Actualizado correctamente..');
        switchCurrent(current + 1);
        router.push(`${router.router.pathname}?current=${current + 1}`);
      })
      .catch(err => notify('error', 'Error', 'Ha ocurrido un error, intenta de nuevo más tarde'));
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
      <Form onFinish={onFinish} initialValues={economic}>
        <div className="row">
          <div className="col-md-12">
            <Item name="currentSalary" label="Salario actual">
              <InputNumber size="large" />
            </Item>
          </div>
          <div className="col-md-12">
            <Item name="desiredSalary" label="Salario deseado">
              <Salary />
            </Item>
          </div>
          <div className="col-md-6">
            <Item name="otherIncome" valuePropName="checked" label="¿Tiene otros ingresos?">
              <Checkbox
                onChange={e => updateChecks({ ...checks, otherIncomes: e.target.checked })}
              />
            </Item>
            {checks.otherIncomes ? (
              <>
                <div>
                  <Item name="otherIncomeValue" label="Escriba monto">
                    <InputNumber size="large" />
                  </Item>
                </div>
                <div>
                  <Item name="sourceIncome" label="Escriba la fuente">
                    <Input size="large" />
                  </Item>
                </div>
              </>
            ) : null}
          </div>

          <div className="col-md-6">
            <label htmlFor="typeHousing">Tipo de vivienda</label>
            <Item name="typeHousing">
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
          </div>
          <div className="col-md-6">
            <label htmlFor="dependents">Dependientes</label>
            <Item name="dependents">
              <InputNumber min={0} size="large" />
            </Item>
          </div>
          <Debts />
          <Vehicle />
          <div className="col-md-12">
            <Item name="health">
              <Health />
            </Item>
          </div>
          <div className="col-md-12">
            <Item name="legal">
              <Legal />
            </Item>
          </div>
          <div className="col-md-12" style={{ marginTop: 60 }}>
            <Item
              name="allowed"
              // rules={[{
              // 	required: true,
              // 	message: 'Es necesario '
              // }]}
              valuePropName="checked"
            >
              <Checkbox />
            </Item>
          </div>
          <div className="col-md-12">
            <p>
              Autorizo expresamente a las empresas que distribuyen o comercializan con datos
              personales, para que distribuyan / comercialicen estudios que contengan datos
              personales concernientes a mi persona, a efecto de verificar la información
              proporcionada; y autorizo que mis datos personales sean compartidos / distribuidos a
              empresas que presten servicios de información personal: según los artículos 9 numeral
              y 64 Ley de Acceso a la Información Pública, 19, 21, 22, 28, 46. Ley contra Lavado de
              Dinero y Otros Activos y 12 y 20 de su Reglamento: 50, 55, 56, 58. Ley de Bancos y
              Grupos Financieros entre otros. Doy fe que la información proporcionada es verdadera y
              queda a disposición de ser verificada por UMANA RH.
            </p>
          </div>
          <div className="col-md-12">
            <Button type="dahsed" htmlType="submit">
              Guardar
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default Economic;
