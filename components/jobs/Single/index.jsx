import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import { Progress, Skeleton, Tag, Avatar } from 'antd';
import { useRouter } from 'next/router';
import locale from '../../../data/translates/spanish';
import { find } from 'lodash';
import { Button, notification } from 'antd';
import label from '../../../data/labels';
import xhr from '../../../xhr';
import Link from 'next/link';

import { Can } from '../../../components/Can';

const SingleJob = ({ query }) => {
  const router = useRouter();

  const [job, setJob] = useState({});
  const [missing, isMissing] = useState(false);
  const [Jobs, setJobs] = useState([]);

  const getJob = () =>
    xhr()
      .get(`/job/${query.id}`)
      .then(res => {
        res.type = false;
        setJob(res.data);
      })
      .catch(err => isMissing(true));

  const getFromLocal = _ => {
    const Jobs = JSON.parse(localStorage.getItem('Jobs'));
    const job = find(Jobs.list, o => query.id === o.id);

    if (Jobs) {
      if (!job) {
        getJob();
      } else {
        setJob(job);
      }
    } else {
      getJob();
    }
  };

  useEffect(() => {
    setJobs(localStorage.getItem('Jobs') || []);
    getFromLocal();
  }, []);

  const allSet = e => {
    notification.info({
      message: `Confirmación`,
      description: 'La plaza ha sido publicada con éxito',
      placement: 'bottomRight',
    });

    setTimeout(() => {
      router.push(`/admin/jobs/single/[id]`, `/admin/jobs/single/${e}`);
    }, 500);
  };

  const add = async e => {
    // console.log(e);
    delete e.id;
    delete e.company;
    delete e.created_at;
    delete e.expiration_date;
    delete e.updated_at;

    e.title = `${e.title} (copia)`;

    xhr()
      .post(`/job`, JSON.stringify(e))
      .then(resp => {
        allSet(resp.data);
      })
      .catch(err => {
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor inténtalo más tarde',
          placement: 'bottomRight',
        });
      });
  };
  const [appyState, setApply] = useState(false);

  const confirmApply = e => {
    notification.info({
      message: `Aplicación enviada`,
      description: 'Has aplicado a esta plaza con éxito.',
      placement: 'bottomRight',
    });
    setApply(true);
    localStorage.setItem(
      'jobApplications',
      JSON.stringify([
        {
          jobId: job.id,
          applicationId: e,
        },
      ]),
    );
  };

  const catchErrorApply = e => {
    if (e === 423) {
      notification.info({
        message: `Error`,
        description:
          'Ya habías aplicado a esta plaza anteriormente, haz click en Ver mis aplicaciones',
        placement: 'bottomRight',
      });
      setApply(true);
    } else {
      notification.info({
        message: `Error`,
        description: 'Ha ocurrido un error, por favor inténtalo más tarde',
        placement: 'bottomRight',
      });
    }
  };
  const applyJob = e => {
    const user = JSON.parse(localStorage.getItem('uUser'));
    const data = {
      uid: user.id,
      companyId: job.company_id,
      jobId: job.id,
    };

    xhr()
      .post(`/apply`, JSON.stringify(data))
      .then(resp => {
        confirmApply(resp);
      })
      .catch(err => {
        catchErrorApply(err.response.status);
      });
  };

  if (job) {
    return (
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small ">
          <Can I="edit" a="JOBS">
            <Sitebar
              header={{
                title: job && job.company ? job.company.name : 'Plaza',
                icon: 'location_city',
                action: 'edit',
                titleAction: 'Editar Plaza',
                urlAction: '/admin/jobs/edit/',
                urlDinamic: query.id,
              }}
            >
              <Button type="primary" size="small" onClick={() => add(job)}>
                <i className="material-icons">content_copy</i> Duplicar plaza
              </Button>
            </Sitebar>
          </Can>
          <Can I="apply" a="JOBS">
            <Sitebar
              header={{
                title: job && job.company ? job.company.name : 'Plaza',
                icon: 'location_city',
              }}
            >
              {appyState ? (
                <Link href={`/admin/requests`} passHref>
                  <Button type="orange" size="small">
                    <i className="material-icons">check</i> Ver Aplicaciones
                  </Button>
                </Link>
              ) : (
                <Button type="orange" size="small" onClick={applyJob}>
                  <i className="material-icons">send</i>
                  Aplicar a la plaza
                </Button>
              )}
            </Sitebar>
          </Can>
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">
          <div className="umana-content">
            <div className="umana-content__item item-lg">
              <h2>{job.title ? job.title : null}</h2>
            </div>
            {job.availability ? (
              <div className="umana-content__item item-md">
                <label>Tipo de plaza</label>
                <p>{locale(job.availability)}</p>
              </div>
            ) : null}
            {job.schedule_type ? (
              <div className="umana-content__item item-md">
                <label>Horario</label>
                <p>{`${locale(job.schedule_type)}, ${job.schedule}`}</p>
              </div>
            ) : null}
            {job.jobposition ? (
              <div className="umana-content__item item-md">
                <label>Puesto</label>
                <p>{label(job.jobposition)}</p>
              </div>
            ) : null}
            {job.experience ? (
              <div className="umana-content__item item-md">
                <label>Años de experiencia</label>
                <p>{`${job.experience} años`}</p>
              </div>
            ) : null}
            <div className="umana-content__item item-lg">
              <label>Descripción de la plaza</label>
              <p>{job.description}</p>
            </div>
            {job.location && job.locationState === 'public' ? (
              <div className="umana-content__item item-lg">
                <label>Ubicación</label>
                <p>
                  {`${job.location.address ? job.location.address : ''} ${
                    job.location.zone ? 'zona ' + job.location.zone : ''
                  }.
                  ${job.location.city ? job.location.city : ''},  ${
                    job.location.country ? job.location.country : ''
                  }`}
                </p>
                {job.isBranch ? <p>{`La plaza es en una sucursal.`}</p> : null}
              </div>
            ) : null}
            {job.isBranch && job.branch ? (
              <div className="umana-content__item item-lg">
                <label>Dirección de la sucursal</label>
                <p>
                  {`${job.branch.address ? job.branch.address : ''} ${
                    job.branch.zone ? 'zona ' + job.branch.zone : ''
                  }.
                  ${job.branch.city ? job.branch.city : ''},  ${
                    job.branch.country ? job.branch.country : ''
                  }`}
                </p>
                {job.interviewPlace !== 'office' ? (
                  <p>La entrevista se realizará en la sucursal</p>
                ) : null}
              </div>
            ) : null}
          </div>
          {/* requerimets */}
          <div className="umana-content">
            <div className="umana-content__item item-lg">
              <h2>Requerimientos</h2>
            </div>
            {job.gender ? (
              <div className="umana-content__item item-sm">
                <label>Sexo</label>
                <p>{locale(job.gender)}</p>
              </div>
            ) : null}
            {job.age ? (
              <div className="umana-content__item item-sm">
                <label>Edad</label>
                <p>{`${job.age.min} - ${job.age.max} años`}</p>
              </div>
            ) : null}
            {job.religion ? (
              <div className="umana-content__item item-sm">
                <label>Religión</label>
                <p> {job.religion.map(e => locale(e))} </p>
              </div>
            ) : null}
            {job.academic_level ? (
              <div className="umana-content__item item-lg">
                <label>
                  {job.academic_level.length > 1 ? 'Niveles académicos' : 'Nivel académico'}
                </label>

                {job.academic_level.map((e, idx) => (
                  <div key={idx} style={{ display: 'flex', flexWrap: 'wrap', margin: 10 }}>
                    <div style={{ width: '50%' }}>
                      <label>Nivel</label>
                      <p>{label(e.id)}</p>
                    </div>
                    <div style={{ width: '40%' }}>
                      <label>Especialidad</label>
                      <p>{e.children.name}</p>
                    </div>
                    {e.logic ? (
                      <div style={{ width: '10%', textAlign: 'center' }}>
                        <br />
                        <p>{e.logic && e.logic === true ? 'O' : null}</p>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            {job.skills ? (
              <div className="umana-content__item item-lg">
                <label>Habilidades</label>
                <div>
                  {job.skills.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
            {job.softwares ? (
              <div className="umana-content__item item-lg">
                <label>Softwares</label>
                <div>
                  {job.softwares.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
            {job.languages ? (
              <div className="umana-content__item item-lg">
                <br />
                <label>Idiomas</label>
                {job.languages.map((e, idx) => (
                  <div
                    key={idx}
                    className="umana-languages-inputs"
                    style={{
                      padding: '0 20px 10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <p>{e.language}</p>
                    <Progress
                      width={150}
                      strokeWidth={2}
                      strokeColor="#585858"
                      type="circle"
                      percent={e.comprehension}
                      format={percent => `Comprensión ${percent}%`}
                    />
                    <Progress
                      width={150}
                      strokeWidth={2}
                      strokeColor="#585858"
                      type="circle"
                      percent={e.write}
                      format={percent => `Escritura ${percent}%`}
                    />
                    <Progress
                      width={150}
                      strokeWidth={2}
                      strokeColor="#585858"
                      type="circle"
                      percent={e.speak}
                      format={percent => `Hablado ${percent}%`}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {job.responsibilities ? (
              <div className="umana-content__item item-lg">
                <label>Atribuciones</label>
                <p>{job.responsibilities}</p>
              </div>
            ) : null}
            {job.requirements ? (
              <div className="umana-content__item item-lg">
                <label>Requerimientos adicionales</label>
                <p>{job.requirements}</p>
              </div>
            ) : null}
            {job.vehicle ? (
              <div className="umana-content__item item-md">
                <label>Vehículos</label>
                <p>{locale(job.vehicle)}</p>
              </div>
            ) : null}
            {job.type_license ? (
              <div className="umana-content__item item-md">
                <label>Tipo de licencia</label>
                <p>{locale(job.type_license)}</p>
              </div>
            ) : null}
          </div>
          {/* compensaciones y beneficios */}
          <div className="umana-content">
            <div className="umana-content__item item-lg">
              <h2>Compensaciones y beneficios</h2>
            </div>
            <div className="umana-content__item item-lg">
              <h3>Saldo promedio</h3>
            </div>

            <div className="umana-content__item item-md">
              <label>Mínimo</label>
              <h2>
                {job.salary && job.salary.currency && job.salary.currency.symbol
                  ? job.salary.currency.symbol + ' '
                  : 'Q. '}{' '}
                {job.salary && job.salary.base_min && job.salary.commission_min
                  ? parseInt(job.salary.base_min + job.salary.commission_min).toLocaleString('en') +
                    '.00'
                  : 0}
              </h2>
            </div>
            <div className="umana-content__item item-md">
              <label>Máximo</label>
              <h2>
                {job.salary && job.salary.currency && job.salary.currency.symbol
                  ? job.salary.currency.symbol + ' '
                  : 'Q. '}{' '}
                {job.salary && job.salary.base_max && job.salary.commission_max
                  ? parseInt(job.salary.base_max + job.salary.commission_max).toLocaleString('en') +
                    '.00'
                  : 0}
              </h2>
            </div>
            {job.benefits ? (
              <div className="umana-content__item item-lg">
                <label>Beneficios</label>
                <div>
                  {job.benefits.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              </div>
            ) : null}
            {job.benefits_other ? (
              <div className="umana-content__item item-lg">
                <label>Otros beneficios</label>
                <p>{job.benefits_other}</p>
              </div>
            ) : null}
          </div>
          {/* company info */}
          <div className="umana-content" style={{ marginTop: 80 }}>
            {job && job.company && job.company_state === 'public' ? (
              <div className="umana-section-contenct">
                <div className="section-avatar">
                  <Avatar
                    icon={<i className="material-icons">location_city</i>}
                    src={job.company.avatar || ''}
                    size={120}
                  />
                </div>
                <div className="section-title">
                  <h1>{job.company.name}</h1>
                </div>
                {job.company.location ? (
                  <>
                    <h5>Ubicación</h5>
                    <p>
                      {`${job.company.location.address}, zona ${job.company.location.zone},`}
                      <br></br> {`${job.company.location.city}, ${job.company.location.country}`}
                    </p>
                  </>
                ) : null}
              </div>
            ) : (
              <p>Los datos de la empresa son privados.</p>
            )}
          </div>
          <Can I="apply" a="JOBS">
            {appyState ? (
              <Link href={`/admin/requests`} passHref>
                <Button type="orange" size="small" style={{ marginLeft: 'auto' }}>
                  Ver Aplicaciones
                </Button>
              </Link>
            ) : (
              <Button type="orange" size="small" onClick={applyJob} style={{ marginLeft: 'auto' }}>
                Aplicar a la plaza
              </Button>
            )}
          </Can>
        </div>
      </div>
    );
  }
  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Can I="edit" a="JOBS">
          <Sitebar
            header={{
              title: job && job.company ? job.company.name : 'Plaza',
              icon: 'location_city',
              action: 'edit',
              titleAction: 'Editar Plaza',
              urlAction: '/admin/jobs/edit/',
              urlDinamic: query.id,
            }}
          />
        </Can>
        <Can I="apply" a="JOBS">
          <Sitebar
            header={{
              title: job && job.company ? job.company.name : 'Plaza',
              icon: 'location_city',
              action: 'check',
              titleAction: 'Aplicar Plaza',
              urlAction: '/#',
            }}
          />
        </Can>
      </div>
      <div className="umana-layout-cl__flex bg-white">
        <Skeleton active />
      </div>
    </div>
  );
};

export default SingleJob;
