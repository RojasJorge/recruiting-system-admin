import { useEffect, useState } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { Table, Pagination, Avatar } from 'antd';
import { PageTitle } from '../../elements';
import xhr from '../../xhr';
import Link from 'next/link';
import ListCandidate from './archive/candidates';
import ListCompanies from './archive/companies';

const UsersList = () => {
  const users = useStoreState(state => state.users);
  const fill = useStoreActions(actions => actions.users.fill);

  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const onChange = async (page, limit) => {
    await get(page, limit);
    updatePager({ ...pager, page, limit });
  };

  const get = async (page, limit) =>
    xhr()
      .get(`/user?page=${page}&offset=${limit}`)
      .then(res => {
        res.type = true;
        /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(console.error);

  const onRow = (record, index) => {
    return {
      onClick: _ => {},
    };
  };

  useEffect(() => {
    get(pager.page, pager.limit);
  }, []);

  return (
    <div className="">
      <PageTitle title="Lista de usuarios" />

      <ListCandidate />
      <ListCompanies />
    </div>
  );
};

export default UsersList;
