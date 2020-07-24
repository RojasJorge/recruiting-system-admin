import { Form, Input, Button, Drawer, TreeSelect } from 'antd';
const { Item } = Form;

const { TreeNode } = TreeSelect;

const EditModal = ({ add, switchEdit, title }) => {
  const onFinish = field => {
    console.log(field);
  };

  const treeData = [
    { id: 1, pId: 0, value: '1', title: 'Expand to load' },
    { id: 2, pId: 0, value: '2', title: 'Expand to load' },
    { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
  ];

  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={() => switchEdit(!add)}
      visible={add}
      width={600}
      title={title}
      destroyOnClose={true}
    >
      <div className="umana-drawer">
        <h3>Agregar</h3>
        <Form onFinish={onFinish}>
          <Item
            label="Título"
            name="title"
            rules={[
              {
                required: true,
                message: 'Campo requerido',
              },
            ]}
          >
            <Input />
          </Item>
          <Item label="Padre" name="parent">
            {/* <TreeSelect
							treeDataSimpleMode
							style={{ width: '100%' }}
							dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
							placeholder="Seleccione un padre"
							// onChange={onChange}
							treeData={treeData}
						/> */}
          </Item>
          <Button type="primary" size="large">
            Agregar
          </Button>
        </Form>
      </div>
    </Drawer>
  );
};

export default EditModal;
