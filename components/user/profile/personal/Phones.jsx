import React, { useState } from "react";
import { filter, map } from "lodash";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Form, Input, Button, Modal, Select } from "antd";

const Phones = ({ update }) => {
  /** Global state */
  const personal = useStoreState(state => state.profile.steps.personal);

  /** Local state */
  const [phones, setPhones] = useState(personal.phones);
  const [visible, switchModal] = useState(false);

  /** Global tools */
  const makeRandomId = useStoreActions(
    actions => actions.tools.makeRandomId
  ); /** Unique param is length (int) */

  /** Add/Remove phone handlers */
  const removePhone = id => setPhones(filter(phones, o => o.id !== id));
  const addPhone = () =>
    setPhones([
      ...phones,
      {
        area: "",
        number: "",
        type: "",
        id: makeRandomId(10)
      }
    ]);

  /** Update single phone */
  const updatePhone = (e, field, phone) =>
    setPhones(
      map(phones, o => {
        if (o.id === phone.id) {
          if (field === "number") {
            o.number = e.target.value;
          }
          if (field === "area") {
            o.area = e;
          }
          if (field === "type") {
            o.type = e;
          }
        }
        return o;
      })
    );

  return (
    <>
      <h4>
        Teléfonos:{" "}
        <Button
          size="small"
          type="link"
          onClick={() => switchModal(true)}
        >
          Agregar
        </Button>
      </h4>
      <Modal
        title="Agregar números de teléfono"
        okText="Confirmar"
        cancelText="Cancelar"
        width={800}
        visible={visible}
        onCancel={() => switchModal(false)}
        okButtonProps={{
          disabled:
            phones.length <= 0 ||
            filter(phones, o => o.area === "").length > 0 ||
            filter(phones, o => o.number === "").length > 0 ||
            filter(phones, o => o.type === "").length > 0
        }}
        onOk={() => {
          update({
            field: "personal",
            value: {
              phones
            }
          });
          switchModal(false);
        }}
      >
        <Button
          className="button--margin-24"
          type="link"
          icon="plus"
          onClick={addPhone}
        >
          Agregar
        </Button>
        {phones.map((phone, index) => (
          <fieldset className="row no-gutters align-items-center" key={index}>
            <div className="row">
              <div className="col">
                <Form.Item label="Área">
                  <Select
                    placeholder="Seleccione"
                    style={{ width: "100%" }}
                    value={phone.area}
                    onSelect={e => updatePhone(e, "area", phone)}
                  >
                    <Select.Option value={502}>(502) Guatemala</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item label="Número">
                  <Input
                    placeholder="0000-0000"
                    value={phone.number}
                    onChange={e => updatePhone(e, "number", phone)}
                  />
                </Form.Item>
              </div>
              <div className="col">
                <Form.Item label="Tipo">
                  <Select
                    placeholder="Seleccione"
                    style={{ width: "100%" }}
                    value={phone.type}
                    onSelect={e => updatePhone(e, "type", phone)}
                  >
                    <Select.Option value="personal">Personal</Select.Option>
                    <Select.Option value="work">Trabajo</Select.Option>
                    <Select.Option value="home">Casa</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Button
                size="small"
                className="close"
                icon="close-square"
                type="link"
                onClick={() => removePhone(phone.id)}
              />
            </div>
          </fieldset>
        ))}
      </Modal>
    </>
  );
};

export default Phones;
