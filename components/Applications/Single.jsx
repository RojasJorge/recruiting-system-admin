import PropTypes from 'prop-types';
import { useStoreState } from 'easy-peasy';
import { Alert, Input, Modal, notification, Select, Skeleton, Steps, Empty } from 'antd';
import { Sitebar } from '../../elements';
import Moment from 'react-moment';
import SingleProfile from '../user/single';
import Link from 'next/link';
import { find } from 'lodash';
import { AbilityContext } from '../Can';
import { useContext, useEffect, useState } from 'react';
import xhr from '../../xhr';
import { useRouter } from 'next/router';
import SingleJobData from '../jobs/Single/data';
import ScoreMatching from './ScoreMatching';
import { Can } from '../Can';

const { Option } = Select;
const { Step } = Steps;

const STATUS = [
  {
    name: 'Pendiente',
    id: 'PENDING',
  },
  {
    name: 'En revisión',
    id: 'RECEIVED',
  },
  {
    name: 'Entrevista',
    id: 'IN_REVIEW',
  },
  {
    name: 'No aplica',
    id: 'CANCELLED',
  },
  {
    name: 'Finalizado',
    id: 'SUCCESS',
  },
];

const Single = ({ query }) => {
  const router = useRouter();
  const auth = useStoreState(state => state.auth);
  const ability = useContext(AbilityContext);

  const [status, setStatus] = useState('PENDING');

  /** Local state */
  const [record, updateRecord] = useState(null);

  const getRecord = async _ =>
    await xhr()
      .get(`/apply/${query.id}`)
      .then(resp => updateRecord(resp.data.items ? resp.data.items[0] : {}))
      .catch(err => console.log(err));

  useEffect(() => {
    getRecord();
  }, [query.id]);

  // console.log('record', record);
  // console.log('auth', auth.user.scope);

  const onStatusSelect = e =>
    Modal.confirm({
      title: '¿Confirma actualizar la solicitud?',
      okText: 'Si, Actualizar',
      cancelText: 'Cancelar',
      content: <Alert message="Esta operación enviará correos electrónicos a los involucrados" type="error" />,
      onOk: () => {
        xhr()
          .put(
            `/apply/${record.apply.id}`,
            JSON.stringify({
              status: e,
              company: record.company.name,
              job: record.job.title,
              email: record.candidate.email,
              name: record.candidate.name,
            }),
          )
          .then(resp => {
            showNotification('success', 'Exitoso', `El estado de la solicitud ha sido actualizado exitosamente a ${find(STATUS, o => o.id === e).name}`);
            setStatus(e);
          })
          .catch(err => {
            showNotification('error', 'Error', 'No se ha podido actualizar la solicitud actual, por favor intente de nuevo.');
            console.log(err);
          });
      },
    });

  const showNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const [current, setCurrent] = useState(0);

  const switchContent = _ => {
    switch (current) {
      case 0:
        return ability.can('edit', 'UPDATE_SINGLE_REQUEST') ? <SingleProfile data={record.candidate} /> : <SingleJobData job={record.job} company={record.company} />;
        break;
      case 1:
        return record ? <ScoreMatching data={record} /> : <Empty />;
        break;

      default:
        return null;
        break;
    }
  };

  const handleSteps = o => {
    setCurrent(o);
  };

  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar theme="orange">
          <Link
            href={{
              pathname: '/admin/requests',
              query: {
                c: router.query.c,
                j: router.query.j,
              },
            }}
          >
            <a>
              <i className="material-icons" style={{ fontSize: 28, color: 'rgba(52, 52, 52, 0.5)' }}>
                arrow_back
              </i>
            </a>
          </Link>
          {!record ? (
            <Skeleton paragraph={{ rows: 2 }} active />
          ) : (
            <>
              <h2>{record.company.name}</h2>
              <p>{record.job.title}</p>
              <p className="date">
                <i className="material-icons">access_time</i>
                <span style={{ marginRight: 5 }}>Expira</span>{' '}
                <Moment locale="es" format="D MMMM YYYY">
                  {record.job.expiration_date}
                </Moment>
              </p>
            </>
          )}

          {ability.can('edit', 'UPDATE_SINGLE_REQUEST') ? (
            <>
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{
                    marginTop: 50,
                  }}
                >
                  Actualizar estado:
                </h3>
                <Select value={status} disabled={!ability.can('edit', 'UPDATE_SINGLE_REQUEST') || !record} onSelect={onStatusSelect}>
                  {STATUS.map(status => (
                    <Option key={status.id} value={status.id}>
                      {status.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <Steps current={current} onChange={handleSteps} direction="vertical">
                <Step key={0} title="Perfil del aplicante" icon={<i className="material-icons">person</i>} />
                <Step key={1} title="Matching score" icon={<i className="material-icons">compare_arrows</i>} />
              </Steps>
            </>
          ) : (
            <>
              <div style={{ marginTop: 30, marginBottom: 20 }}>
                <h3>Estado actual:</h3>
                {record ? <Input value={find(STATUS, o => o.id === record.apply.status).name} size="large" /> : '...'}
              </div>
              <Steps current={current} onChange={handleSteps} direction="vertical">
                <Step key={0} title="Detalle de la plaza" icon={<i className="material-icons">business_center</i>} />
                <Can I="view" a="MATCH_SCORE_VIEW">
                  <Step key={1} title="Matching score" icon={<i className="material-icons">compare_arrows</i>} />
                </Can>
              </Steps>
            </>
          )}
        </Sitebar>
      </div>

      <div className="umana-layout-cl__flex width-section bg-white">{!record ? <Skeleton active /> : switchContent()}</div>
    </div>
  );
};

Single.propTypes = {
  record: PropTypes.object,
};

Single.defaultProps = {
  record: {},
};

export default Single;
