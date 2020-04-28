
import { Drawer } from "antd";
import { Form, Input, Button} from "../../elements";
const {Item} = Form;

const EditModal = ({ add, switchEdit }) => {
  const onFinish = field => {
    console.log(field)
  }
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => switchEdit(!add)}
      visible={add}
      width={550}
    >
      <div className="umana-drawer">
        <h3>Agregar</h3>
        <Form onFinish={onFinish}>
          <Item 
          label="Título"
          name="title"
          rules={[{
            required: true,
            message: "Campo requerido"
          }]}
          >
            <Input />
          </Item>
          <Button type="primary" size="large">Agregar</Button>

        </Form>
      </div>
      
    </Drawer>
  );
};

export default EditModal;
