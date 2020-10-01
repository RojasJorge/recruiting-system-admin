import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { Progress, Skeleton, Tag } from 'antd';
import { useRouter } from 'next/router';
import locale from '../../../data/translates/spanish';
import { find } from 'lodash';
import label from '../../../data/labels';
import xhr from '../../../xhr';

const SingleJob = () => {
  const router = useRouter();
  // const data = useStoreState(state => state.jobs);
  const [job, setJob] = useState({});
  const [missing, isMissing] = useState(false);

  const getJob = () =>
    xhr()
      .get(`/job/${router.query.id}`)
      .then(res => {
        res.type = false;
        console.log('res job', res);
        setJob(res.data);
      })
      .catch(err => isMissing(true));

  const getFromLocal = _ => {
    const Jobs = JSON.parse(localStorage.getItem('Jobs'));
    const job = find(Jobs.list, o => router.query.id === o.id);

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
    getFromLocal();
  }, []);

  const getScope = () => {
    if (localStorage.getItem('uToken')) {
      const _scope = localStorage.getItem('uScopes') ? JSON.parse(localStorage.getItem('uScopes')) : ['candidate'];
      if (_scope[0] === 'candidate') {
        return {
          title: job && job.company ? job.company.name : 'Plaza',
          icon: 'location_city',
          action: 'check',
          titleAction: 'Aplicar a plaza',
          // urlAction: '/#',
          // urlDinamic: router.query.id,
        };
      } else {
        return {
          title: job && job.company ? job.company.name : 'Plaza',
          icon: 'location_city',
          action: 'edit',
          titleAction: 'Editar Plaza',
          urlAction: '/admin/jobs/edit/',
          urlDinamic: router.query.id,
        };
      }
    } else {
      return {
        title: job && job.company ? job.company.name : 'Plaza',
        icon: 'location_city',
        action: 'check',
        titleAction: 'Iniciar sesión',
        urlAction: '/',
      };
    }
  };

  const header = getScope();

  if (job) {
    return (
      <div className="umana-layout-cl">
        {/*<pre>{JSON.stringify(job, false, 2)}</pre>*/}
        <div className="umana-layout-cl__small ">
          <Sitebar header={header} />
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
                  {`${job.location.address ? job.location.address : ''} ${job.location.zone ? 'zona ' + job.location.zone : ''}.
                  ${job.location.city ? job.location.city : ''},  ${job.location.country ? job.location.country : ''}`}
                </p>
                {job.isBranch ? <p>{`La plaza es en una sucursal.`}</p> : null}
              </div>
            ) : null}
            {job.isBranch && job.branch ? (
              <div className="umana-content__item item-lg">
                <label>Dirección de la sucursal</label>
                <p>
                  {`${job.branch.address ? job.branch.address : ''} ${job.branch.zone ? 'zona ' + job.branch.zone : ''}.
                  ${job.branch.city ? job.branch.city : ''},  ${job.branch.country ? job.branch.country : ''}`}
                </p>
                {job.interviewPlace !== 'office' ? <p>La entrevista se realizará en la sucursal</p> : null}
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
                <label>{job.academic_level.length > 1 ? 'Niveles académicos' : 'Nivel académico'}</label>

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
                  <div key={idx} style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between' }}>
                    <p>{e.language}</p>
                    <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.comprehension} format={percent => `Comprensión ${percent}%`} />
                    <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.write} format={percent => `Escritura ${percent}%`} />
                    <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.speak} format={percent => `Hablado ${percent}%`} />
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
                {job.salary && job.salary.currency && job.salary.currency.symbol ? job.salary.currency.symbol + ' ' : 'Q. '}{' '}
                {job.salary && job.salary.base_min && job.salary.commission_min ? parseInt(job.salary.base_min + job.salary.commission_min).toLocaleString('en') + '.00' : 0}
              </h2>
            </div>
            <div className="umana-content__item item-md">
              <label>Máximo</label>
              <h2>
                {job.salary && job.salary.currency && job.salary.currency.symbol ? job.salary.currency.symbol + ' ' : 'Q. '}{' '}
                {job.salary && job.salary.base_max && job.salary.commission_max ? parseInt(job.salary.base_max + job.salary.commission_max).toLocaleString('en') + '.00' : 0}
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
        </div>
      </div>
    );
  }
  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar header={header} />
      </div>
      <div className="umana-layout-cl__flex bg-white">
        <Skeleton />
      </div>
    </div>
  );
};

export default SingleJob;
