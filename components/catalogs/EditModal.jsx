import { Form, Input, Button, Drawer, Select } from 'antd';
// const { TreeNode } = TreeSelect;

const EditModal = ({ visible, switchEdit, title, data, clear, treeData, edit, setEdit, onSubmit }) => {
  const onFinish = field => {
    if (edit) {
      onSubmit(field, edit, data.id);
    } else {
      onSubmit(field, false);
    }
  };

  const onReset = () => {
    clear({});
    switchEdit(false);
    setEdit(false);
  };

  return (
    <Drawer placement="right" closable={true} onClose={() => onReset()} visible={visible} width={600} title={title} destroyOnClose={true}>
      <div className="umana-drawer">
        <h3>{edit ? 'Editar' : 'Agregar'}</h3>
        {data && data.name ? (
          <Form onFinish={onFinish} initialValues={data}>
            <Form.Item
              label="Título"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Campo requerido',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Padre" name="parent">
              <Select style={{ width: '100%' }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="Seleccione un padre">
                {treeData
                  ? treeData.map(e => (
                      <Select.Option key={e.id} value={e.id}>
                        {e.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
            <div className="umana-form--footer columns">
              <Button type="cancel" size="large" htmlType="button" onClick={onReset}>
                Cancelar
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                {edit ? 'Editar' : 'Agregar'}
              </Button>
            </div>
          </Form>
        ) : (
          <Form onFinish={onFinish}>
            <Form.Item
              label="Título"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Campo requerido',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Padre" name="parent">
              <Select style={{ width: '100%' }} dropdownStyle={{ maxHeight: 400, overflow: 'auto' }} placeholder="Seleccione un padre">
                {treeData
                  ? treeData.map(e => (
                      <Select.Option key={e.id} value={e.id}>
                        {e.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
            <div className="umana-form--footer columns">
              <Button type="cancel" size="large" onClick={onReset}>
                Cancelar
              </Button>
              <Button type="primary" size="large" htmlType="submit">
                {edit ? 'Editar' : 'Agregar'}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </Drawer>
  );
};

export default EditModal;
