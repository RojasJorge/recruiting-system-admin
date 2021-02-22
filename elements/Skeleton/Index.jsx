import { Skeleton, Switch, List, Avatar, Table } from 'antd';

const SkeletonList = () => {
  const listData = [{ id: '1' }, { id: '2' }, { id: '3' }];
  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      render: (text, record) => <Skeleton.Avatar active size="large" />,
    },
    {
      title: '...',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => <Skeleton active paragraph={false} />,
    },
  ];
  return (
    <>
      <Table style={{ width: '100%' }} columns={columns} bordered size="small" dataSource={listData} rowKey={record => record.id} pagination={false} />
    </>
  );
};

export default SkeletonList;
