import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Table, Button, Spin } from 'antd';
import { PlusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import xhr from '../../xhr';

import EditModal from './EditModal';

const List = ({ type, title }) => {
  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const [visible, switchEdit] = useState(false);
  const [item, setItem] = useState({});
  const [edit, setEdit] = useState(false);

  // /** Update single */
  const update = async (o, id) => {
    /** Extract id */
    const url = type.replace('_', '-') + '/' + id;
    const token = localStorage.getItem('uToken');
    collectionsActions.update({ url, o, token });
    get();
    setTimeout(() => {
      switchEdit(false);
      setEdit(false);
      setItem({});
    }, 500);
  };

  const get = () => {
    collectionsActions.get({ type });
  };

  const addItem = o => {
    const url = type.replace('_', '-');
    const token = localStorage.getItem('uToken');
    collectionsActions.add({ url, o, token });
    setTimeout(() => {
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

  const openModale = (id, name, parent, type) => {
    setEdit(type);
    const item = {
      id: id,
      name: name,
      parent: parent,
    };
    setItem(item);
    switchEdit(true);
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <div className="row align-items-center">
        <div className="col">{data.loading ? <Spin indicator={<SyncOutlined spin />} /> : null}</div>
        <div className="umana-element__add">
          <Button icon={<i className="material-icons">add</i>} shape="circle" type="primary" className="circle-fixed" size="large" onClick={() => switchEdit(!visible)} ghost />
        </div>
      </div>
      <div className="umana-container">
        <Table
          expandable={{
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <i className="material-icons" onClick={e => onExpand(record, e)}>
                  expand_less
                </i>
              ) : (
                <i className="material-icons" onClick={e => onExpand(record, e)}>
                  expand_more
                </i>
              ),
          }}
          bordered
          size="middle"
          dataSource={data[type]}
          rowKey={record => record.id}
          pagination={false}
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
                <Button id={e.id} onClick={o => openModale(e.id, e.name, e.parent, true)} type="link">
                  <i className="material-icons">edit</i>
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
