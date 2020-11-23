import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button, Table } from 'antd';
import EditModal from './EditModal';

const List = ({ type, title }) => {
  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const [visible, switchEdit] = useState(false);
  const [item, setItem] = useState({});
  const [edit, setEdit] = useState(false);

  /** Global store */
  const auth = useStoreState(state => state.auth);

  const order = () => {
    if (data && data[type]) {
      data[type].map(e => (e.children ? e.children.sort((a, b) => (a.order > b.order ? 1 : -1)) : e));
    }
  };

  /** Update single */
  const update = async (o, id) => {
    // console.log('Edit single career:', o, id)
    // return false;

    /** Extract id */
    const url = type.replace('_', '-') + '/' + id;

    collectionsActions.update({ url, o, token: auth.token });

    setTimeout(() => {
      collectionsActions.get({ type: type, token: auth.token });
      switchEdit(false);
      setEdit(false);
      setItem({});
    }, 500);
  };

  const addItem = o => {
    const url = type.replace('_', '-');
    const token = auth.token;
    collectionsActions.add({ url, o, token });
    setTimeout(() => {
      collectionsActions.get({ type: type, token: auth.token });
      switchEdit(false);
      setEdit(false);
      setItem({});
    }, 500);
    get();
  };

  // onSubmit
  const onSubmit = (e, edit, id) => {
    if (edit) {
      update(e, id);
    } else {
      addItem(e);
    }
  };

  const openModale = (id, name, parent, status, type, order) => {
    setEdit(type);
    const item = {
      id,
      name,
      parent,
      status,
      order,
    };
    setItem(item);
    switchEdit(true);
  };

  const rowClassName = (record, index) => {
    if (!record.status) return 'row-disabled';
  };

  useEffect(() => {
    order();
  }, [data[type]]);

  console.log(data);

  return (
    <>
      <div className="row align-items-center">
        {/* <div className="col">
				 {data.loading ? (
				 <div className="app--spinner animated fadeIn">
				 <Spin size="large" />
				 </div>
				 ) : null}
				 </div> */}
        <div className="umana-element__add">
          <Button icon={<i className="material-icons">add</i>} shape="circle" type="primary" className="circle-fixed" size="large" onClick={() => switchEdit(!visible)} ghost />
        </div>
      </div>
      <div className="umana-container">
        <Table
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                record.children ? (
                  <i className="material-icons" onClick={e => onExpand(record, e)}>
                    expand_less
                  </i>
                ) : (
                  <span style={{ marginRight: 35 }}></span>
                )
              ) : record.children ? (
                <i className="material-icons" onClick={e => onExpand(record, e)}>
                  expand_more
                </i>
              ) : (
                <span style={{ marginRight: 35 }}></span>
              ),
          }}
          bordered
          size="middle"
          dataSource={data[type].sort((a, b) => (a.order > b.order ? 1 : -1))}
          rowKey={record => record.id}
          pagination={true}
          rowClassName={rowClassName}
          columns={[
            {
              title: 'Titulo',
              dataIndex: 'name',
              key: 'name',
            },
            {
              key: 'operation',
              fixed: 'right',
              width: 50,
              render: e => (
                <Button id={e.id} onClick={o => openModale(e.id, e.name, e.parent, e.status, true, e.order)} type="link" style={{ padding: 0, textAlign: 'center' }}>
                  <i className="material-icons" style={{ marginRight: 0, lineHeight: '30px', fontSize: 18 }}>
                    edit
                  </i>
                </Button>
              ),
            },
          ]}
        />
      </div>
      <EditModal visible={visible} switchEdit={switchEdit} title={title} data={item} clear={setItem} treeData={data[type]} edit={edit} onSubmit={onSubmit} setEdit={setEdit} />
    </>
  );
};

List.propTypes = {
  type: PropTypes.string,
};

List.defaultProps = {
  type: 'career',
};

export default List;
