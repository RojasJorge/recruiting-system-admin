import { Sitebar } from '../../../elements';
import { Button, Empty, Modal, notification, Skeleton, Alert, Steps, Tag } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import { Can } from '../../../components/Can';
import locale from '../../../data/translates/spanish';

const { Step } = Steps;

const SiteBarJob = ({ job, current, onChange, applyJob, appyState, add, expire, checkProfile, privateCompany }) => {
  var today = moment();
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
            {job.status === 'draft' ? <Step key={1} title="Editar plaza" icon={<i className="material-icons">edit</i>} /> : null}
          </Steps>
          <Button type="primary" size="small" onClick={() => add(job)}>
            <i className="material-icons">content_copy</i> Duplicar plaza
          </Button>
          {job.expiration_date > today.format() ? (
            <Button type="primary" size="small" onClick={() => expire(job)}>
              <i className="material-icons">event_busy</i> Expirar plaza
            </Button>
          ) : null}

          <Alert description={`Estado de la plaza:  ${locale(job.status)}`} />
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
              <Alert type="error" message="Debes completar tu perfil para poder aplicar a una plaza" banner />
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
