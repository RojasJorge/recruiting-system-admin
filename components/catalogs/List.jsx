import { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { orderBy, map, isEmpty, debounce } from "lodash";
import { Button, Icon, Empty, Spin } from "antd";
import Nestable from "react-nestable";
import styled from "styled-components";
import "./index.scss";

const Item = styled.div`
  position: relative;
  padding: 10px 20px;

  p {
    margin-bottom: 0px;
    line-height: normal;
  }

  &:hover {
    cursor: grab;
    &:before {
      opacity: 0.6;
    }
  }
`;

const List = ({ type }) => {
  const data = useStoreState(state => state.collections);
  const get = useStoreActions(action => action.collections.get);
  const update = useStoreActions(action => action.collections.update);
  const token = useStoreState(state => state.auth.token);

  /** Prepare the single item render */
  const renderItem = ({ item, index }) => (
    <Item
      className={
        item.parent === null || item.parent === "" ? "item-parent" : ""
      }
    >
      <p>{item.name}</p>
      <div className={`umana-catalogos--buttons`}>
        <Button type="link" size="small" className="item-hover">
          <Icon type="drag" />
        </Button>
        <Button
          type="link"
          size="small"
          // onClick={() => props.buttonEdit(item.id)}
        >
          <Icon type="edit" theme="filled" />
        </Button>
      </div>
    </Item>
  );

  const onChange = (items, item) => {
    items.map(cat =>
      cat.children.length > 0
        ? cat.children.map(child => {
            child.parent = cat.id;
            if (
              typeof child.children !== "undefined" &&
              child.children.length > 0
            )
              thirdLevel(child);
            return child;
          })
        : null
    );
  };

  const thirdLevel = o => {
    return o.children.map(item => {
      item.parent = o.id;
      return item;
    });
  };

  /** Listen the new position && parent destination */
  const confirmChange = async (dragItem, destinationParent) => {
    console.log("confirmChange:", dragItem, destinationParent);

    if (!destinationParent) {
      delete data.list.find(o => o.id === dragItem.id);
      dragItem.parent = null;

      setTimeout(async () => {
        return await update({
          id: dragItem.id,
          parent: dragItem.parent,
          name: dragItem.name,
          token
        }, () => get(token));
      }, 2000);
    }

    /** Always return true is required by plugin */
    return false;
  };

  useEffect(() => {
    get(token);
    // console.log("items....", data.list);
  }, []);

  const items = [
    { id: 0, text: "Andy" },
    {
      id: 1,
      text: "Harry",
      children: [{ id: 2, text: "David" }]
    },
    { id: 3, text: "Lisa" }
  ];

  // const renderItem = ({ item }) => item.name;

  return data.loading ? (
    <div
      className="row align-items-center justify-content-center"
      style={{ marginTop: 24 }}
    >
      <Spin size="large" />
    </div>
  ) : !isEmpty(data.list) ? (
    <div className="umana-layout">
      {/* <Nestable items={data.list} renderItem={renderItem} threshold={60} /> */}
      <Nestable
        items={orderBy(
          map(data.list, o => {
            if (!isEmpty(o.children)) {
              o.children = orderBy(o.children, ["name"], ["asc"]);
            }
            return o;
          }),
          ["name"],
          ["asc"]
        )}
        renderItem={renderItem}
        // onChange={onChange}
        // maxDepth={2}
        confirmChange={debounce(confirmChange, 100)}
        // confirmChange={throttle(confirmChange, 200)}
        // renderCollapseIcon={<Icon type="user" />}
        // collapsed
      />
    </div>
  ) : (
    <Empty description="No hay registros" />
  );
};

export default List;
