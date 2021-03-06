import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Empty, Spin, Table } from 'antd';
import { Button } from 'antd';
import { isEmpty } from 'lodash';
// import FileExplorerTheme from 'react-sortable-tree-theme-minimal'
import PageTitle from '../Misc/PageTitle';
import EditModal from './EditModal';
import xhr from '../../xhr';
import router from 'next/router';

const ListT = ({ type, title }) => {
  const token = useStoreState(state => state.auth.token);
  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const fill = useStoreActions(actions => actions.collections.fill);

  const [list, setList] = useState([]);
  const [add, switchEdit] = useState(false);

  /** Get collection */
  const get = p => {
    // collectionsActions.get({ type: 'academic_level', token: localStorage.getItem('uToken') });
    xhr()
      .get(`/${type}`)
      // .get(`/${type}`)
      .then(resp => {
        fill(resp.data);
        // console.log('response', resp);
      })
      .catch(err => console.log(err));
  };

  // /** Update single */
  // const update = async o => {
  //   /** Extract id */
  //   const id = o.id;
  //   delete o.id; /** Delete for api call */

  //   const url = `/${type}/${id}`;

  //   await xhr()
  //     .put(url, JSON.stringify(o))
  //     .then(resp => get())
  //     .catch(err => console.log(err));
  // };

  const show = id => {
    // console.log('=========', id);
    return <a id={id.id}>hola</a>;
  };

  // useEffect(() => {
  //   setList(data.list);
  // }, [data.list]);

  useEffect(() => {
    collectionsActions.get({ type });
  }, []);

  // console.log('cat list', data);

  return (
    <>
      {/*<pre>{JSON.stringify(data, false, 2)}</pre>*/}
      <div className="row align-items-center">
        <div className="col">
          <PageTitle tag="h1" className="title--main title--page">
            {data.loading ? (
              <div className="app--spinner animated fadeIn">
                <Spin size="large" />
              </div>
            ) : null}
          </PageTitle>
        </div>
        <div className="umana-element__add">
          <Button icon={<i className="material-icons">add</i>} shape="circle" type="primary" size="large" onClick={() => switchEdit(!add)} ghost />
        </div>
      </div>
      <div className="umana-container">
        <Table
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
              title: 'Action',
              key: 'operation',
              fixed: 'right',
              width: 100,

              render: e => <a id={e.id}>edit</a>,
            },
          ]}
        />
      </div>
      {/* <EditModal add={add} switchEdit={switchEdit} title={title} /> */}
    </>
  );
};

ListT.propTypes = {
  type: PropTypes.string,
};

ListT.defaultProps = {
  type: 'career',
};

export default ListT;
