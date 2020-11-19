import { Sitebar } from '../../../elements';
import { Button, Empty, Modal, notification, Skeleton, Alert, Steps, Tag } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { Can } from '../../../components/Can';
import locale from '../../../data/translates/spanish';
import { useStoreState } from 'easy-peasy';

const { Step } = Steps;

const SiteBarJob = ({ job, current, onChange, applyJob, appyState, duplicate, publish, expire, privateCompany }) => {
  const profile = useStoreState(state => state.profile);

  const today = moment();

  const checkProfile = _ => {
    if (profile.academic && profile.economic && profile.lookingFor && profile.others && profile.personal && profile.working) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Can I="edit" a="JOBS">
        <Sitebar
          header={{
            title: job && job.company ? job.company.name : 'Plaza',
            icon: 'location_city',
            action: 'replay',
            titleAction: 'Volver',
            urlAction: 'back',
          }}
        >
          <Steps current={current} onChange={onChange} direction="vertical">
            <Step key={0} title="Información de la plaza" icon={<i className="material-icons">business</i>} />
            <Step key={1} title="Editar plaza" icon={<i className="material-icons">edit</i>} disabled={job.status === 'draft' ? false : true} />
            {job.status === 'public' ? <Step key={2} title="Posibles Candidatos" disabled={job.status === 'draft' ? true : false} icon={<i className="material-icons">group</i>} /> : null}
          </Steps>
          {job.status === 'draft' ? (
            <Button type="primary" size="small" onClick={() => publish(job)}>
              <i className="material-icons">publish</i> Publicar plaza
            </Button>
          ) : null}
          <Button type="primary" size="small" onClick={() => duplicate(job)}>
            <i className="material-icons">content_copy</i> Duplicar plaza
          </Button>
          {job.expiration_date > today.format() ? (
            <Button type="primary" size="small" onClick={() => expire(job)}>
              <i className="material-icons">event_busy</i> Expirar plaza
            </Button>
          ) : null}

          <Alert description={`Estado de la plaza:  ${locale(job.status)}`} type={`${job.status === 'draft' ? 'warning' : 'success'}`} />
          {job.status === 'draft' ? (
            <Alert style={{ marginTop: 10 }} type="warning" description={`Esta plaza aún no puede recibir solicitudes, publica esta plaza para poder comenzar a recibir solicitudes.`} />
          ) : (
            <Alert style={{ marginTop: 10 }} type="warning" description={`Esta plaza ya no puede ser editada porque ya puede recibir solicitudes. `} />
          )}
        </Sitebar>
      </Can>
      <Can I="apply" a="JOBS">
        <Sitebar
          header={{
            title: !privateCompany && job && job.company ? job.company.name : 'Plaza',
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
            <>
              <Button type="orange" size="small" onClick={applyJob} disabled={!checkProfile()}>
                <i className="material-icons">send</i>
                Aplicar a la plaza
              </Button>
              {!checkProfile() && <Alert type="error" message="Debes completar tu perfil para poder aplicar a una plaza" banner />}
            </>
          )}
        </Sitebar>
      </Can>
      <Can I="guest" a="JOBS">
        <Sitebar
          header={{
            title: !privateCompany && job && job.company ? job.company.name : 'Plaza',
            icon: 'location_city',
          }}
        >
          <p>Para aplicar a la plaza debes contar con una cuenta, has click en iniciar sesión o crea una cuenta</p>
          <Button type="orange" size="small" disabled={true}>
            <i className="material-icons">send</i>
            Aplicar a la plaza
          </Button>
          <Button type="orange" size="small">
            <Link href={`/`} passHref>
              <a>
                <i className="material-icons">person</i>
                Iniciar sesión
              </a>
            </Link>
          </Button>
          <Button type="orange" size="small">
            <Link href={`/signup`} passHref>
              <a>
                <i className="material-icons">person_add</i>
                crear cuenta
              </a>
            </Link>
          </Button>
        </Sitebar>
      </Can>
    </>
  );
};

export default SiteBarJob;
