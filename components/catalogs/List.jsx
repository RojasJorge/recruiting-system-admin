import { useEffect, useState } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Empty, Spin, Icon, Button } from "antd";
import { isEmpty } from "lodash";
import SortableTree from "react-sortable-tree";
import PageTitle from "../Misc/PageTitle";
import EditModal from "./EditModal";
import "react-sortable-tree/style.css";
import "./index.scss";

const List = ({ type, title }) => {
  useEffect(() => {
    get({ token, type });
  }, []);

  const get = useStoreActions(action => action.collections.get);
  const update = useStoreActions(action => action.collections.update);
  const token = useStoreState(state => state.auth.token);
  const data = useStoreState(state => state.collections);

  const [list, setList] = useState([]);
  const [add, switchEdit] = useState(false);

  useEffect(() => {
    setList(data.list);
  }, [data.list]);

  const onChange = treeData => setList(treeData);

  const onMoveNode = ({
    treeData,
    node,
    nextParentNode,
    prevPath,
    prevTreeIndex,
    nextPath,
    nextTreeIndex
  }) => {
    update({
      id: node.id,
      parent: nextParentNode ? nextParentNode.id : null,
      token,
      type
    });
  };

  return (
    <div className="umana-layout">
      <div className="row align-items-center">
        <div className="col">
          <PageTitle tag="h1" className="title--main title--page">
            {title}{" "}
            {data.loading ? (
              <Spin indicator={<Icon type="sync" spin />} />
            ) : null}
          </PageTitle>
        </div>
        <div className="col col--contents-right">
          <Button
            icon="plus"
            shape="circle"
            type="primary"
            size="large"
            onClick={() => switchEdit(!add)}
            ghost
          />
        </div>
      </div>
      {!data.loading ? (
        !isEmpty(list) ? (
          <SortableTree
            style={{ height: "100vh", overflow: "hidden" }}
            treeData={list}
            onChange={onChange}
            onMoveNode={onMoveNode}
            switchEdit={switchEdit}
          />
        ) : (
          <Empty description="No hay datos" />
        )
      ) : null}
      <EditModal add={add} switchEdit={switchEdit} />
    </div>
  );
};

export default List;
