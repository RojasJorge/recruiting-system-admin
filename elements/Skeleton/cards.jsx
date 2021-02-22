import { Skeleton, Card, Avatar } from 'antd';

const { Meta } = Card;

const SkeletonCard = () => {
  const listData = [{ id: '1' }, { id: '2' }];

  return listData.map((e, id) => (
    <Card key={id} style={{ width: 330, margin: 10, padding: '20px 10px' }}>
      <Skeleton.Avatar active size={80} style={{ marginBottom: 10 }} />
      <Skeleton active />
    </Card>
  ));
};

export default SkeletonCard;
