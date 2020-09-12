import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pagination, Alert } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../xhr';

const List = _ => {
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);

  const [pager, updatePager] = useState({
    page: 1,
    limit: 10,
  });

  const onChange = async (page, limit) => {
    updatePager({ page, limit });
    await get({ page, limit });
  };

  const get = async p =>
    xhr()
      .get(`/company?pager=${JSON.stringify(p ? p : pager)}`)
      .then(res => {
        res.type = true; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(console.error);

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="umana-layout row">
      <div className="col-md-12">
        <Pagination
          className="pager--bottom"
          total={data.total}
          onShowSizeChange={onChange}
          onChange={onChange}
          showSizeChanger
          default={pager.page}
          defaultCurrent={pager.page}
          defaultPagesize={pager.limit}
          pageSizeOptions={['10', '20', '30', '40', '50', '100']}
          hideOnSinglePage
        />
      </div>
      <div className="col-md-6">
        <div className="box box--standard">
          <PlusCircleOutlined />
        </div>
      </div>
      {data.list.length > 0
        ? data.list.map(company => (
            <div key={company.id} className="col-md-6">
              <div className="box--standard">
                <h3>
                  <Link href={`/admin/companies/${company.id}`} passHref>
                    <a>{company.name}</a>
                  </Link>
                </h3>
                <p>
                  <small>{company.category.name || null}</small>
                </p>
                <p>{`${company.location.address} ${company.location.zone}, ${company.location.province} ${company.location.city}`}</p>
                <p>{company.description}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default List;
