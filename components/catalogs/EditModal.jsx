import { Drawer } from "antd";

const EditModal = ({ add, switchEdit }) => {
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      closable={false}
      onClose={() => switchEdit(!add)}
      visible={add}
      width={550}
    >
      ...
    </Drawer>
  );
};

export default EditModal;
