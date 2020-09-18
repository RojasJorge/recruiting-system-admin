import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Skeleton, Tag, Progress } from 'antd';
import { useRouter } from 'next/router';
import xhr from '../../../xhr';

const SingleJob = () => {
  const router = useRouter();
  const data = useStoreState(state => state.jobs);
  const fill = useStoreActions(actions => actions.jobs.fill);
  const [job, setJob] = useState({});
  useEffect(() => {
    xhr()
      .get(`/job/${router.query.id}`)
      .then(res => {
        res.type = false;
        fill(res);
        setJob(res.data[0]);
      })
      .catch(err => isMissing(true));
  }, []);

  const header = {
    title: job && job.company ? job.company.name : 'Plaza',
    icon: 'location_city',
    action: 'edit',
    titleAction: 'Editar Plaza',
    urlAction: '/admin/jobs/edit/',
    urlDinamic: router.query.id,
  };

  console.log('single', data);
  if (job) {
    return (
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small ">
          <Sitebar header={header} />
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">
          <div className="umana-content">
            <div className="umana-content__item item-lg">
              <h2>{job && job.title ? job.title : null}</h2>
            </div>
            <div className="umana-content__item item-md">
              <label>Tipo de plaza</label>
              <p>{job.availability}</p>
            </div>
            <div className="umana-content__item item-md">
              <label>Horario</label>
              <p>{`${job.schedule_type}, ${job.schedule}`}</p>
            </div>
            <div className="umana-content__item item-md">
              <label>Puesto</label>
              <p>{job.jobposition}</p>
            </div>
            <div className="umana-content__item item-md">
              <label>Años de experiencia</label>
              <p>{`${job.experience} años`}</p>
            </div>
            <div className="umana-content__item item-lg">
              <label>Descripción de la plaza</label>
              <p>{job.description}</p>
            </div>
            {job.location ? (
              <div className="umana-content__item item-lg">
                <label>Ubicación</label>
                <p>
                  {`${job.location.address ? job.location.address : ''} ${job.location.zone ? 'zona ' + job.location.zone : ''}.
                  ${job.location.city ? job.location.city : ''},  ${job.location.country ? job.location.country : ''}`}
                </p>
              </div>
            ) : null}
          </div>
          {/* requerimets */}
          <div className="umana-content">
            <div className="umana-content__item item-lg">
              <h2>Requerimientos</h2>
            </div>
            <div className="umana-content__item item-sm">
              <label>Sexo</label>
              <p>{job.gender}</p>
            </div>
            <div className="umana-content__item item-sm">
              <label>Edad</label>
              {job.age ? <p>{`${job.age.min} - ${job.age.max} años`}</p> : null}
            </div>
            <div className="umana-content__item item-sm">
              <label>Religión</label>
              <p>{job.religion}</p>
            </div>
            <div className="umana-content__item item-lg">
              <label>Habilidades</label>
              {job.skills ? (
                <div>
                  {job.skills.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="umana-content__item item-lg">
              <label>Softwares</label>
              {job.softwares ? (
                <div>
                  {job.softwares.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="umana-content__item item-lg">
              <br />
              <h3>Idiomas</h3>
              {job.languages
                ? job.languages.map((e, idx) => (
                    <div key={idx} style={{ padding: '0 20px 10px', display: 'flex', justifyContent: 'space-between' }}>
                      <p>{e.language}</p>
                      <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.comprehension} format={percent => `Comprensión ${percent}%`} />
                      <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.write} format={percent => `Escritura ${percent}%`} />
                      <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.speak} format={percent => `Hablado ${percent}%`} />
                    </div>
                  ))
                : null}
            </div>
            <div className="umana-content__item item-lg">
              <label>Atribuciones</label>
              <p>{job.responsibilities}</p>
            </div>
            <div className="umana-content__item item-lg">
              <label>Requerimientos adicionales</label>
              <p>{job.requirements}</p>
            </div>
            <div className="umana-content__item item-md">
              <label>Vehículos</label>
              <p>{job.vehicle}</p>
            </div>
            <div className="umana-content__item item-md">
              <label>Tipo de licencia</label>
              <p>{job.type_license}</p>
            </div>
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
            <div className="umana-content__item item-lg">
              <label>Beneficios</label>
              {job.benefits ? (
                <div>
                  {job.benefits.map((e, idx) => (
                    <Tag key={idx}>{e}</Tag>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="umana-content__item item-lg">
              <label>Otros beneficios</label>
              <p>{job.benefits_other}</p>
            </div>
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
      <div className="umana-layout-cl__flex width-section bg-white">
        <Skeleton />
      </div>
    </div>
  );
};

export default SingleJob;
