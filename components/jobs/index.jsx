import { Button, Input, notification, Select, Spin, Steps } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { EmptyElemet, Sitebar } from '../../elements';
import { delay, find, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import ExpiredJobs from './Archive/expired';
import PublicJobs from './Archive/public';
import { Can } from '../Can';
import xhr from '../../xhr';
import Moment from 'react-moment';
import { useRouter } from 'next/router';

const { Option } = Select;
const { Search } = Input;
const { Step } = Steps;

const Jobs = props => {
  const [current, setCurrent] = useState(0);

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
  // const [separatedJobs, setSeparatedJobs] = useState({
  //   available: [],
  //   expired: [],
  // });

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

  const renderDate = date => {
    const today = new Date();
    const jobDate = new Date(date);

    return today < jobDate;
  };

  // const getJobs = async () => {
  //   switchLoading(true);

  //   let url = `/job?page=${filters.page}&offset=${filters.offset}`;

  //   if (filters.jobposition) {
  //     url += `&jobposition=${filters.jobposition}`;
  //   }

  //   if (filters.title) {
  //     url += `&title=${filters.title}`;
  //   }

  //   if (!isEmpty(filters.country)) {
  //     url += `&province=${filters.country.department}`;
  //   }

  //   if (filters.city) {
  //     url += `&city=${filters.city}`;
  //   }

  //   await xhr()
  //     .get(url)
  //     .then(res => {
  //       if (isEmpty(res.data.items)) {
  //         notification.warning({
  //           message: '404',
  //           description: 'No hay resultados',
  //         });

  //         delay(() => switchLoading(false), 1000, 'Filtered');

  //         return false;
  //       }

  //       /** Store data from response */
  //       fill(res);

  //       const available = res.data.items.reduce((acc, current) => {
  //         if (current.status === 'public') {
  //           acc.push(current);
  //         }

  //         return acc;
  //       }, []);

  //       const expired = res.data.items.reduce((acc, current) => {
  //         if (!renderDate(current.expiration_date) || current.status === 'expired') {
  //           acc.push(current);
  //         }

  //         return acc;
  //       }, []);

  //       const draft = res.data.items.reduce((acc, current) => {
  //         if (current.status === 'draft') {
  //           acc.push(current);
  //         }

  //         return acc;
  //       }, []);

  //       setSeparatedJobs({ ...separatedJobs, available, expired, draft });

  //       delay(() => switchLoading(false), 1000, 'Filtered');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       delay(() => switchLoading(false), 1000, 'Filtered');
  //     });
  // };

  const switchContent = _ => {
    switch (current) {
      case 0:
        return <PublicJobs filters={filters} empty={props.empty} />;
        break;
      case 1:
        return <ExpiredJobs title="Borradores" type="draft" filters={filters} />;
        break;
      case 2:
        return <ExpiredJobs title="Plazas expiradas" type="expired" filters={filters} />;
        break;

      default:
        return <PublicJobs />;
        break;
    }
  };

  const onChange = o => {
    setCurrent(o);
  };

  return (
    <div className="umana-jobs">
      <div className="umana-layout-cl">
        <Sitebar>
          <Can I="guest" a="JOBS">
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
          <Can I="edit" a="JOBS">
            <Steps current={current} onChange={onChange} direction="vertical">
              <Step key={0} title="Plazas publicas" icon={<i className="material-icons">business_center</i>} />
              <Step key={1} title="Borradores" icon={<i className="material-icons">folder</i>} />
              <Step key={2} title="Plazas expiradas" icon={<i className="material-icons">timelapse</i>} />
            </Steps>
          </Can>
        </Sitebar>
        <div className="umana-layout-cl__flex width-section bg-white">
          <div className="umana-form">
            <div className="ant-row ant-form-item item-lg">
              {/*SEARCH/FILTER COMPONENT*/}
              <label htmlFor="search">Buscar por nombre (plaza)</label>
              <Search size="small" disabled={loading} onSearch={e => setFilters({ ...filters, title: e })} />
            </div>
          </div>
          <div style={{ padding: '20px 10px' }}>{switchContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
