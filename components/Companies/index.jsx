import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState, useContext } from 'react';
import { Card, EmptyElemet } from '../../elements';
import { Spin, Pagination, Table, Avatar } from 'antd';
import xhr from '../../xhr';
import { Can } from '../Can';
import { isEmpty } from 'lodash';
import { AbilityContext } from '../Can';
import { useRouter } from 'next/router';

const dataEmpty = {
  title: 'Crea el perfil de una empresa',
  content: 'Agregar una empresa para poder crear plazas y empezar tu proceso de reclutamiento.',
  buttonTitle: 'Agregar Empresa',
  url: '/admin/companies/add',
};
const dataEmpty1 = {
  title: 'No hay empresas disponibles',
  content: 'Esta vista esta restingida para tu usuario',
  buttonTitle: 'Volver a dashboard',
  url: '/admin',
};

const Companies = () => {
  const ability = useContext(AbilityContext);
  const [status, switchStatus] = useState('loading');
  const [missing, isMissing] = useState(false);
  const [loading, switchLoading] = useState(true);
  const data = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);
  const [total, setTotal] = useState(0);
  const [pager, updatePager] = useState({
    page: 1,
    limit: ability.can('view', 'ALL_MENUS') ? 15 : 8,
  });
  const router = useRouter();

  const getCompanies = (page, limit) => {
    xhr()
      .get(`/company?page=${page}&offset=${limit}`)
      .then(res => {
        res.type = false;
        /** This param (if true) loads a collection, false => single object */
        fill(res);
        setTotal(res.data.total);
        switchStatus('ready');
      })
      .catch(err => {
        isMissing(true);
        switchStatus('ready');
      });
  };

  useEffect(() => {
    getCompanies(pager.page, pager.limit);
  }, []);

  const onChange = async (page, limit) => {
    await getCompanies(page, limit);
    switchLoading(true);
    switchStatus('loading');
    updatePager({ ...pager, page, limit });
  };

  const getAvatarFromProps = avatar => {
    let result = null;

    if (!isEmpty(avatar)) {
      result = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + avatar[0].response.url;
    }

    // console.log('avatar', avatar);

    return result;
  };

  const columns = [
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 30,
      render: (text, record) => <Avatar size={25} src={getAvatarFromProps(record.avatar)} icon={<i className="material-icons">location_city</i>} />,
    },
    {
      title: 'Empresa',
      dataIndex: 'name',
      key: 'name',
      width: 350,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => <div className="umana-table_exerpt" dangerouslySetInnerHTML={{ __html: record.description }}></div>,
    },

    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (text, record) => {
        return <i className="material-icons">chevron_right</i>;
      },
    },
  ];

  // console.log('hssssss....', loading);
  const onRow = record => {
    return {
      onClick: _ => {
        router.push(`/admin/companies/${record.id}`);
      },
    };
  };

  return (
    <div className="umana-list">
      {/*SIMPLE LOADING*/}
      {status === 'loading' && <Spin size="large" />}

      {/*SHOW CONTENTS*/}
      {status === 'ready' &&
        !isEmpty(data.company.items) &&
        (ability.can('view', 'ALL_MENUS') ? (
          <div style={{ width: '100%' }}>
            <Table
              columns={columns}
              bordered
              size="small"
              dataSource={data.company ? data.company.items.sort((a, b) => (b.created_at > a.created_at ? 1 : -1)) : null}
              rowKey={record => record.id}
              onRow={onRow}
              pagination={{ pageSize: pager.limit, total: total, defaultCurrent: pager.page, onChange: onChange }}
            />
          </div>
        ) : (
          <>
            <div className="umana-list">
              {data.company.items
                .sort((a, b) => (b.created_at > a.created_at ? 1 : -1))
                .map((e, idx) => (
                  <Card key={idx} title={e.name} link={`/admin/companies/`} avatar={e.avatar} dinamicLink={e.id} description={e.description} align="left" type="company" />
                ))}
            </div>
            <Pagination current={pager.page} total={total} pageSize={pager.limit} total={total} defaultCurrent={pager.page} onChange={onChange} />
          </>
        ))}

      {/*EMPTY ALERT*/}
      {status === 'ready' && data.company.items.length <= 0 ? (
        <>
          <Can I="add" a="COMPANIES">
            <EmptyElemet data={dataEmpty} />
          </Can>
          <Can I="apply" a="JOBS">
            <EmptyElemet data={dataEmpty1} />
          </Can>
        </>
      ) : null}
    </div>
  );
};

export default Companies;
