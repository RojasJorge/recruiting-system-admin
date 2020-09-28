import { Form, Button, InputNumber, Select, Space } from 'antd';
import languages from '../../data/language.json';

const Languages = props => {
  return (
    <Form.List name="languages" className="form-item--lg">
      {(fields, { add, remove }) => {
        return (
          <div style={{ width: '100%', marginTop: 20 }}>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', paddingBottom: 5 }} align="start" className="umana-form--group">
                <Form.Item {...field} name={[field.name, 'language']} fieldKey={['language' + field.fieldKey, 'language']} label="Idioma">
                  <Select showSearch>{languages ? languages.map(l => <Select.Option key={l}>{l}</Select.Option>) : null}</Select>
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'comprehension']} fieldKey={['comprehension' + field.fieldKey, 'comprehension']} label="Comprensión">
                  <InputNumber formatter={value => `${value}%`} max={100} min={0} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'speak']} fieldKey={['speak' + field.fieldKey, 'speak']} label="Hablado">
                  <InputNumber formatter={value => `${value}%`} max={100} min={0} />
                </Form.Item>
                <Form.Item {...field} name={[field.name, 'write']} fieldKey={['write' + field.fieldKey, 'write']} label="Escrito">
                  <InputNumber formatter={value => `${value}%`} max={100} min={0} />
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
                  add();
                }}
                block
              >
                <i className="material-icons">add</i> Agregar idioma
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default Languages;
