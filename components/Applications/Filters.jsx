import { Button, Select, Spin } from 'antd';
import xhr from '../../xhr';
import { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

const Filters = ({ filters, setApplications, applications, getApply }) => {
  const router = useRouter();
  const [status, setStatus] = useState(true);
  const [companies, updateCompanies] = useState([]);
  const [jobs, updateJobs] = useState([]);
  const [hasJobs, setHaveJobs] = useState('');

  const [company, setCompany] = useState(router.query.c || null);
  const [job, setJob] = useState(router.query.j || null);
  const [fieldStatus, setFieldStatus] = useState(false);

  const getCompanies = () =>
    xhr()
      .get(`/company?page=${filters.page}&offset=${filters.offset}`)
      .then(resp => {
        updateCompanies(resp.data.items);
        setStatus(false);
        if (router.query.c && router.query.j) {
          getJobs(router.query.c);
        }
      })
      .catch(err => {
        console.log('Error get companies.', err);
        setStatus(false);
      });

  const getJobs = cid =>
    xhr()
      .get(`/job?company_id=${cid}`)
      .then(resp => {
        updateJobs(resp.data.items);
        setJob('');
        setFieldStatus(false);
        resp.data.items.length <= 0 ? setHaveJobs('No hay plazas para esa empresa.') : setHaveJobs('');
      })
      .catch(err => {
        console.log('Error get jobs.', err);
        resp.data.items.length <= 0 && setHaveJobs('');
      });

  const onJobSelect = e => {
    router.push({
      query: {
        c: company,
        j: e,
      },
    });

    setJob(e);
    getApply(company, e);
  };

  const onCompanySelect = e => {
    getJobs(e);
    setCompany(e);
    setFieldStatus(true);
    setJob(null);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  useEffect(() => {
    if (router.query.c && router.query.j) {
      // setJob(router.query.j)
      getApply(router.query.c, router.query.j);
    }
  }, []);

  if (isEmpty(companies) && !status) {
    router.replace('/admin/welcome');
  }

  return (
    <>
      <div className="umana-form">
        <div className="ant-form-item form-item--lg">
          <label>Empresa:</label>
          <Select size="large" placeholder="Empresa" optionFilterProp="children" onSelect={onCompanySelect} value={company} showSearch>
            {!isEmpty(companies) &&
              companies.map(company => (
                <Option value={company.id} key={company.id}>
                  {company.name}
                </Option>
              ))}
          </Select>
        </div>
        <div className="ant-form-item form-item--lg">
          <label>
            Plaza: {fieldStatus ? <Spin indicator={antIcon} /> : null}
            <small style={{ display: 'inline-block', marginRight: 8, color: 'orange' }}>{hasJobs}</small>
          </label>
          <Select size="large" placeholder="Seleccione" optionFilterProp="children" disabled={isEmpty(jobs)} value={router.query.j || job} onSelect={onJobSelect} showSearch>
            {!isEmpty(jobs) &&
              jobs.map(job => (
                <Option key={job.id} value={job.id}>
                  {job.title}
                </Option>
              ))}
          </Select>
        </div>
        <div className="ant-form-item form-item-lg">
          <Button
            type="link-reset"
            onClick={_ => {
              setCompany(null);
              setJob(null);
              // updateCompanies([])
              updateJobs([]);

              setApplications({ ...applications, list: [], total: 0 });
              router.push({ query: null });
            }}
          >
            Restablecer filtros
          </Button>
        </div>
      </div>

      {/*<pre>{JSON.stringify(COMPANIES.jobs, false, 2)}</pre>*/}
    </>
  );
};

export default Filters;
