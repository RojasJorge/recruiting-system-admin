import locale from '../../../data/translates/spanish';
import Label from '../../../data/labels';
import { Tag, Progress, Avatar } from 'antd';
// import { Avatar, Button, Empty, Modal, notification, Progress, Skeleton, Tag, Alert } from 'antd';
const SingleJobData = ({ job, company }) => {
  return (
    <>
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
            <Label term={job.jobposition} />
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
          <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: job.description }}></div>
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
                  <Label term={e.id} />
                </div>
                <div style={{ width: '40%' }}>
                  <label>Especialidad</label>
                  {e.children && e.children.name ? <p>{e.children.name}</p> : null}
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
            <label>Conocimientos Técnicos y Software.</label>
            <div>
              {job.skills.map((e, idx) => (
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
                <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.comprehension} format={percent => `Comprensión ${percent}%`} />
                <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.write} format={percent => `Lectura ${percent}%`} />
                <Progress width={150} strokeWidth={2} strokeColor="#585858" type="circle" percent={e.speak} format={percent => `Hablado ${percent}%`} />
              </div>
            ))}
          </div>
        ) : null}
        {job.responsibilities ? (
          <div className="umana-content__item item-lg">
            <label>Atribuciones</label>
            <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: job.responsibilities }}></div>
            {/* <p>{job.responsibilities}</p> */}
          </div>
        ) : null}
        {job.requirements ? (
          <div className="umana-content__item item-lg">
            <label>Requerimientos adicionales</label>
            {/* <p>{job.requirements}</p> */}
            <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: job.requirements }}></div>
          </div>
        ) : null}
        {job.vehicle ? (
          <div className="umana-content__item item-md">
            <label>Vehículos</label>
            {job.vehicle.map(e => (
              <p key={e}>{locale(e)}</p>
            ))}
          </div>
        ) : null}
        {job.type_license ? (
          <div className="umana-content__item item-md">
            <label>Tipo de licencia</label>
            {job.type_license.map(e => (
              <p key={e}>{locale(e)}</p>
            ))}
          </div>
        ) : null}
      </div>
      {/* compensaciones y beneficios */}
      <div className="umana-content">
        <div className="umana-content__item item-lg">
          <h2>Compensaciones y beneficios</h2>
        </div>
        <div className="umana-content__item item-lg">
          <h3>Salario promedio</h3>
        </div>

        <div className="umana-content__item item-md">
          <label>Mínimo</label>
          <h2>
            {job.salary && job.salary.currency && job.salary.currency.symbol ? job.salary.currency.symbol + ' ' : 'Q. '}{' '}
            {job.salary
              ? job.salary.base_min && job.salary.commission_min
                ? parseInt(job.salary.base_min + job.salary.commission_min).toLocaleString('en') + '.00'
                : parseInt(job.salary.base_min).toLocaleString('en') + '.00'
              : 0}
          </h2>
        </div>
        <div className="umana-content__item item-md">
          <label>Máximo</label>
          <h2>
            {job.salary && job.salary.currency && job.salary.currency.symbol ? job.salary.currency.symbol + ' ' : 'Q. '}{' '}
            {job.salary
              ? job.salary.base_max && job.salary.commission_max
                ? parseInt(job.salary.base_max + job.salary.commission_max).toLocaleString('en') + '.00'
                : parseInt(job.salary.base_max).toLocaleString('en') + '.00'
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
            <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: job.benefits_other }}></div>
          </div>
        ) : null}
      </div>
      {/* company info */}
      {company ? (
        <div className="umana-content" style={{ marginTop: 80 }}>
          <div className="umana-section-contenct">
            <div className="section-avatar">
              <Avatar icon={<i className="material-icons">location_city</i>} src={company.avatar || ''} size={120} />
            </div>
            <div className="section-title">
              <h1>{company.name}</h1>
            </div>
            {company.location ? (
              <>
                <h5>Ubicación</h5>
                <p>
                  {`${company.location.address}, zona ${company.location.zone},`}
                  <br></br> {`${company.location.city}, ${company.location.country}`}
                </p>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="umana-content" style={{ marginTop: 80 }}>
          {job && job.company && job.company_state === 'public' ? (
            <div className="umana-section-contenct">
              <div className="section-avatar">
                <Avatar icon={<i className="material-icons">location_city</i>} src={job.company.avatar || ''} size={120} />
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
      )}
    </>
  );
};
export default SingleJobData;
