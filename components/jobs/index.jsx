// import List from './List';
import Link from 'next/link';
import { Button } from 'antd';
import { EmptyElemet } from '../../elements';

const Jobs = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
    fontSize: 24,
    textDecoration: 'none',
  };
  return (
    <div className="umana-list list-empty">
      <EmptyElemet />
    </div>
  );
};

export default Jobs;
