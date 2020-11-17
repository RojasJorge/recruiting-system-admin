import { Select, Button } from 'antd';
import xhr from '../../xhr';
import { useEffect, useState } from 'react';
import { delay, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

const Filters = ({ filters, setFilters, setApplications, applications, getApply }) => {
  const router = useRouter();

  const [companies, updateCompanies] = useState([]);
  const [jobs, updateJobs] = useState([]);

  const [company, setCompany] = useState(router.query.c || null);
  const [job, setJob] = useState(router.query.j || null);
  const [fieldStatus, setFieldStatus] = useState(false);

  const getCompanies = () =>
    xhr()
      .get(`/company?page=${filters.page}&offset=${filters.offset}`)
      .then(resp => {
        updateCompanies(resp.data.items);

        if (router.query.c && router.query.j) {
          getJobs(router.query.c);
        }
      })
      .catch(err => console.log('Error get companies.', err));

  const getJobs = cid =>
    xhr()
      .get(`/job?company_id=${cid}`)
      .then(resp => {
        updateJobs(resp.data.items);
        setJob(null);
        setFieldStatus(false);
      })
      .catch(err => console.log('Error get jobs.', err));

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
      getApply(router.query.c, router.query.j);
    }
  }, []);

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
          <label>Plaza: {fieldStatus ? <Spin indicator={antIcon} /> : null}</label>
          <Select size="large" placeholder="Plaza" optionFilterProp="children" disabled={isEmpty(jobs)} value={router.query.j || job} onSelect={onJobSelect} showSearch>
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
