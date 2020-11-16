import { Button, Input, notification, Pagination, Select, Table, Spin } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Card, EmptyElemet } from '../../elements';
import { delay, find, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import ExpiredJobs from './Archive/expired';
import Moment from 'react-moment';
import { Can } from '../Can';
import Link from 'next/link';
import xhr from '../../xhr';

const { Option } = Select;
const { Search } = Input;

const buttonStyle = {
  display: 'flex',
  alignItem: 'center',
  color: '#019688',
  textTransform: 'uppercase',
};

const Jobs = props => {
  const columns = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      render: (text, record) => <>{record.company.name}</>,
    },
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Fecha de expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text, record) => (
        <>
          <Moment locale="es" format="D MMMM YYYY">
            {record.expiration_date}
          </Moment>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <Link Link href={`/admin/jobs/single/[id]`} as={`/admin/jobs/single/${record.id}`}>
            <a style={buttonStyle}>
              <i className="material-icons">chevron_right</i> Ver plaza
            </a>
          </Link>
        );
      },
    },
  ];
  const columnsDraft = [
    {
      title: 'Empresa',
      dataIndex: 'company',
      key: 'company',
      render: (text, record) => <>{record.company.name}</>,
    },
    {
      title: 'Plaza',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Fecha de expiración',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
      render: (text, record) => (
        <>
          <Moment locale="es" format="D MMMM YYYY">
            {record.expiration_date}
          </Moment>
        </>
      ),
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      fixed: 'right',
      width: 150,
      render: (text, record) => {
        return (
          <Link Link href={`/admin/jobs/single/[id]`} as={`/admin/jobs/single/${record.id}`}>
            <a style={buttonStyle}>
              <i className="material-icons">chevron_right</i> Ver plaza
            </a>
          </Link>
        );
      },
    },
  ];

  // FIlter
  const initFilters = {
    page: 1,
    offset: 10,
    jobposition: null,
    title: null,
    country: {},
    city: null,
  };
  /** Get countries from store (tools) */
  const countries = useStoreState(state => state.tools.countries);
  const list = useStoreState(state => state.jobs.list);
  const auth = useStoreState(state => state.auth);
  const fill = useStoreActions(actions => actions.jobs.fill);

  /**
   * Job positions
   */
  const [separatedJobs, setSeparatedJobs] = useState({
    available: [],
    expired: [],
  });

  const [filters, setFilters] = useState(initFilters);
  const [loading, switchLoading] = useState(false);
  const collectionsState = useStoreState(state => state.collections);

  const getCollections = useStoreActions(actions => actions.collections.get);

  /** Get/Set catalogs */
  useEffect(() => {
    if (isEmpty(collectionsState.career) || isEmpty(collectionsState.academic_level)) {
      getCollections({ type: 'career' });
      getCollections({ type: 'academic-level' });
    }
  }, [auth.user]);

  useEffect(() => {
    getJobs();
  }, [filters.page, filters.offset, filters.jobposition, filters.title, filters.country, filters.city]);

  const renderDate = date => {
    const today = new Date();
    const jobDate = new Date(date);

    return today < jobDate;
  };

  const getJobs = async () => {
    switchLoading(true);

    let url = `/job?page=${filters.page}&offset=${filters.offset}`;

    if (filters.jobposition) {
      url += `&jobposition=${filters.jobposition}`;
    }

    if (filters.title) {
      url += `&title=${filters.title}`;
    }

    if (!isEmpty(filters.country)) {
      url += `&province=${filters.country.department}`;
    }

    if (filters.city) {
      url += `&city=${filters.city}`;
    }

    await xhr()
      .get(url)
      .then(res => {
        if (isEmpty(res.data.items)) {
          notification.warning({
            message: '404',
            description: 'No hay resultados',
          });

          delay(() => switchLoading(false), 1000, 'Filtered');

          return false;
        }

        /** Store data from response */
        fill(res);

        const available = res.data.items.reduce((acc, current) => {
          if (current.status === 'public') {
            acc.push(current);
          }

          return acc;
        }, []);

        const expired = res.data.items.reduce((acc, current) => {
          if (!renderDate(current.expiration_date) || current.status === 'expired') {
            acc.push(current);
          }

          return acc;
        }, []);

        const draft = res.data.items.reduce((acc, current) => {
          if (current.status === 'draft') {
            acc.push(current);
          }

          return acc;
        }, []);

        setSeparatedJobs({ ...separatedJobs, available, expired, draft });

        delay(() => switchLoading(false), 1000, 'Filtered');
      })
      .catch(err => {
        console.log(err);
        delay(() => switchLoading(false), 1000, 'Filtered');
      });
  };

  /** Pagination handler */
  const paginationChange = (page, offset) =>
    setFilters({
      ...filters,
      page,
      offset,
    });

  if (!isEmpty(list)) {
    return (
      <div className="umana-jobs">
        <div className="umana-layout-cl">
          <Can I="guest" a="JOBS">
            <div className="umana-layout-cl__small">
              <div className="umana-form">
                <div className="ant-row ant-form-item item-lg">
                  <label htmlFor="areatype">Seleccione Puesto</label>
                  <Select size="large" onSelect={e => setFilters({ ...filters, jobposition: e })} value={filters.jobposition} disabled={loading} showSearch>
                    {!isEmpty(collectionsState.career) ? (
                      collectionsState.career.sort((a, b) => (a.order > b.order ? 1 : -1)).map(e => (e.status ? <Select.Option key={e.id}>{e.name}</Select.Option> : null))
                    ) : (
                      <Option>No data</Option>
                    )}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg">
                  <label>Departamento</label>
                  <Select
                    size="large"
                    placeholder="Seleccione departamento"
                    value={filters.country.id}
                    onSelect={e =>
                      setFilters({
                        ...filters,
                        country: find(countries[0].data, o => o.id === e),
                        city: '',
                      })
                    }
                    showSearch
                  >
                    {countries[0].data.map(country => (
                      <Option key={country.id} value={country.id}>
                        {country.department}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg">
                  <label>Ciudad</label>
                  <Select size="large" placeholder="Seleccione ciudad" disabled={isEmpty(filters.country)} onSelect={e => setFilters({ ...filters, city: e })} value={filters.city} showSearch>
                    {!isEmpty(filters.country)
                      ? filters.country.municipalities.map((city, index) => (
                          <Option key={index} value={city}>
                            {city}
                          </Option>
                        ))
                      : null}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg" style={{ marginLeft: 'auto' }}>
                  <Button
                    size="small"
                    style={{ marginLeft: 'auto' }}
                    type="dashed"
                    disabled={!filters.jobposition && !filters.title && isEmpty(filters.country)}
                    onClick={() => setFilters(initFilters)}
                    loading={loading}
                  >
                    Restablecer filtros
                  </Button>
                </div>
              </div>
            </div>
          </Can>
          <Can I="apply" a="JOBS">
            <div className="umana-layout-cl__small">
              <div className="umana-form">
                <div className="ant-row ant-form-item item-lg">
                  <label htmlFor="areatype">Seleccione Puesto</label>
                  <Select size="large" onSelect={e => setFilters({ ...filters, jobposition: e })} value={filters.jobposition} disabled={loading} showSearch>
                    {!isEmpty(collectionsState.career) ? collectionsState.career.map(e => (e.children ? <Select.Option key={e.id}>{e.name}</Select.Option> : null)) : <Option>No data</Option>}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg">
                  <label>Departamento</label>
                  <Select
                    size="large"
                    placeholder="Seleccione departamento"
                    value={filters.country.id}
                    onSelect={e =>
                      setFilters({
                        ...filters,
                        country: find(countries[0].data, o => o.id === e),
                        city: '',
                      })
                    }
                    showSearch
                  >
                    {countries[0].data.map(country => (
                      <Option key={country.id} value={country.id}>
                        {country.department}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg">
                  <label>Ciudad</label>
                  <Select size="large" placeholder="Seleccione ciudad" disabled={isEmpty(filters.country)} onSelect={e => setFilters({ ...filters, city: e })} value={filters.city} showSearch>
                    {!isEmpty(filters.country)
                      ? filters.country.municipalities.map((city, index) => (
                          <Option key={index} value={city}>
                            {city}
                          </Option>
                        ))
                      : null}
                  </Select>
                </div>
                <div className="ant-row ant-form-item item-lg" style={{ marginLeft: 'auto' }}>
                  <Button
                    size="small"
                    style={{ marginLeft: 'auto' }}
                    type="dashed"
                    disabled={!filters.jobposition && !filters.title && isEmpty(filters.country)}
                    onClick={() => setFilters(initFilters)}
                    loading={loading}
                  >
                    Restablecer filtros
                  </Button>
                </div>
              </div>
            </div>
          </Can>
          <div className="umana-layout-cl__flex width-section bg-white">
            <div className="umana-form">
              <div className="ant-row ant-form-item item-lg">
                {/*SEARCH/FILTER COMPONENT*/}
                <label htmlFor="search">Buscar por nombre (plaza)</label>
                <Search size="small" disabled={loading} onSearch={e => setFilters({ ...filters, title: e })} />
              </div>
            </div>

            <div className="umana-list">
              {loading ? (
                <div className="app--spinner animated fadeIn in-section">
                  <Spin size="large" />
                </div>
              ) : (
                separatedJobs.available.length > 0 &&
                separatedJobs.available.map((e, idx) => {
                  return (
                    <Card
                      key={idx}
                      title={e.title}
                      link={`${auth && auth.token ? '/admin/jobs/single/' : '/jobs/single/'}`}
                      dinamicLink={e.id}
                      description={e.description}
                      theme="green"
                      parentInfo={e.company}
                      date={{ date: e.expiration_date, type: 'Expira' }}
                      align="left"
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="row" style={{ marginLeft: 'auto', marginTop: 40 }}>
          <div className="col-md-12">
            <Pagination current={filters.page} total={separatedJobs.available.length} defaultPageSize={8} pageSize={8} onChange={paginationChange} onShowSizeChanger={paginationChange} />
          </div>
        </div>

        <Can I="edit" a="JOBS">
          {/* <ExpiredJobs /> */}
          <div className="umana-section">
            <h2>Plazas expiradas</h2>
            <Table columns={columns} dataSource={separatedJobs.expired} rowKey={record => record.id} pagination={true} />
          </div>
          <div className="umana-section">
            <h2>Borradores</h2>
            <Table columns={columnsDraft} dataSource={separatedJobs.draft} rowKey={record => record.id} pagination={true} />
          </div>
        </Can>
      </div>
    );
  }

  return (
    <div className="umana-list list-empty">
      <EmptyElemet data={props.empty} />
    </div>
  );
};

export default Jobs;
