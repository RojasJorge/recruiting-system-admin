import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import { Button, Empty, Modal, notification, Skeleton, Alert, Steps, Tag } from 'antd';
import { useRouter } from 'next/router';
import xhr from '../../../xhr';
import Link from 'next/link';
import moment from 'moment';
import { delay } from 'lodash';
import SingleJobData from './data';
import { Can } from '../../../components/Can';
import MatchTable from '../../../components/Applications/MatchTable';

import SiteBarJob from './sitebar';

import FormJob from '../../jobs/Add';
import { useStoreActions, useStoreState } from 'easy-peasy';

const { confirm } = Modal;

const SingleJob = ({ query, privateCompany }) => {
  const router = useRouter();

  const [job, setJob] = useState(null);
  const [company, setInfoCompany] = useState();
  const [loading, switchLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [appyState, setApply] = useState(false);
  const [coinsidences, updateCoinsidences] = useState([]);

  /** Get profile status if exists */
  const profile = useStoreState(state => state.profile);
  // const collections = useStoreState(state => state.collections);

  /** Validate profile */
  const verifyProfileStatus = useStoreActions(actions => actions.profile.verify);

  /** Check auth */
  const auth = useStoreState(state => state.auth);

  const getJob = () => {
    xhr()
      .get(`/job/${query.id}`)
      .then(res => {
        res.type = false;
        setJob(res.data);
      })
      .catch(err => switchLoading(!loading));
  };

  useEffect(() => {
    getJob();
    delay(_ => {
      switchLoading(false);
    }, 2000);
  }, [query.id, job]);

  useEffect(() => {
    job && auth.user && getCompanyInfo();
  }, [job, auth.user]);

  const allSet = e => {
    notification.info({
      message: `Confirmación`,
      description: 'La plaza ha sido publicada con éxito',
      placement: 'bottomRight',
    });

    setTimeout(() => {
      router.push(`/admin/jobs/single/${e}`);
    }, 500);
  };

  const duplicateJob = async e => {
    delete e.id;
    delete e.company;
    delete e.created_at;
    delete e.expiration_date;
    delete e.updated_at;
    delete e.status;
    e.title = `${e.title} (copia)`;

    confirm({
      icon: <i className="material-icons">info</i>,
      title: 'Duplicar plaza',
      cancelText: 'Cancelar',
      okText: 'Duplicar plaza',
      content: (
        <div>
          <p>Al duplicar la plaza se guardará como borrador para que puedas editarla</p>
          <p>¿Estas seguro de duplicar esta plaza?</p>
        </div>
      ),
      onOk() {
        xhr()
          .post(`/job`, JSON.stringify(e))
          .then(resp => {
            allSet(resp.data);
            setCurrent(0);
          })
          .catch(err => {
            notification.info({
              message: `Error`,
              description: 'Ha ocurrido un error, por favor inténtalo más tarde',
              placement: 'bottomRight',
            });
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

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
        description: 'Ya habías aplicado a esta plaza anteriormente, haz click en Ver mis aplicaciones',
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

  const getCompanyInfo = _ =>
    xhr()
      .get(`/company/${job.company_id}`)
      .then(resp => setInfoCompany(resp.data))
      .catch(err => err);

  const applyJob = _ => {
    const user = auth.user;
    const data = {
      uid: user.id,
      companyId: job.company_id,
      jobId: job.id,
      mailing: {
        job: job.title,
        company: {
          name: company.name,
          contactName: company.contact.name,
          contactEmail: company.contact.email,
        },
        candidate: {
          name: `${user.profile.fields.personal.name} ${user.profile.fields.personal.lastname}`,
          email: user.profile.fields.personal.email,
        },
      },
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

  const expire = e => {
    const startdate = moment();
    startdate.subtract(1, 'days');
    startdate.format();

    const data = {
      expiration_date: startdate,
      contact: e.contact,
      status: 'expired',
    };
    confirm({
      icon: <i className="material-icons">info</i>,
      title: 'Expirar plaza',
      okText: 'Expirar plaza',
      content: 'Una vez que expires no podras regresar esta acción. ¿Estas seguro que deseas expirar esta plaza?',
      onOk() {
        xhr()
          .put(`/job/${e.id}`, JSON.stringify(data))
          .then(resp => {
            notification.info({
              message: `Esta plaza ha expirado`,
              description: 'Se expiro la plaza ',
              placement: 'bottomRight',
            });
            updateJob();
          })
          .catch(err => {
            notification.info({
              message: `Error`,
              description: 'No se pudo expirar la plaza',
              placement: 'bottomRight',
            });
          });
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  const publish = e => {
    const startdate = moment();
    startdate.format();

    const data = {
      created_at: startdate,
      contact: e.contact,
      status: 'public',
    };
    confirm({
      icon: <i className="material-icons">info</i>,
      title: 'Publicar plaza',
      cancelText: 'Cancelar',
      okText: 'Publicar plaza',
      content: (
        <div>
          <p>Una vez publicada la plaza ya no podras editarla.</p>
          <p>¿Estas seguro de publicar esta plaza?</p>
        </div>
      ),
      onOk() {
        xhr()
          .put(`/job/${e.id}`, JSON.stringify(data))
          .then(resp => {
            notification.info({
              message: `Plaza publica`,
              description: 'La plaza se ha publicada correctamente ',
              placement: 'bottomRight',
            });
            updateJob();
          })
          .catch(err => {
            notification.info({
              message: `Error`,
              description: 'No se pudo publicar la plaza',
              placement: 'bottomRight',
            });
          });
      },
      onCancel() {
        // console.log('Cancel');
      },
    });
  };

  const checkProfile = _ => {
    if (!profile.personal || !profile.academic || !profile.economic || !profile.lookingFor || !profile.others || !profile.working) {
      return false;
    } else {
      return true;
    }
  };

  const onChange = o => {
    setCurrent(o);
  };

  useEffect(() => {
    if (auth.user) {
      delay(_ => {
        verifyProfileStatus(auth.user.profile.fields);
      }, 1000);
    }
  }, [auth.user]);

  const updateJob = () => {
    onChange(0);
    setCurrent(0);
    getJob();
    window.scroll({
      top: 80,
      behavior: 'smooth',
    });
  };

  const switchContent = _ => {
    switch (current) {
      case 0:
        return (
          <>
            <SingleJobData job={job} />
          </>
        );
        break;
      case 1:
        return (
          <>
            <div className="umana-title">
              <h2>{`Editar plaza`}</h2>
            </div>
            <FormJob data={job} needCompanySelect={false} setCurrent={setCurrent} type="edit" id={query.id} updateJob={updateJob} companyData={job.company} />
          </>
        );
        break;
      case 2:
        return (
          <>
            {job && job.status === 'public' ? (
              <>
                <MatchTable data={coinsidences} />
                {coinsidences.length === 0 ? 'No se han encontrado coincidencia' : null}
              </>
            ) : (
              <SingleJobData job={job} />
            )}
          </>
        );
        break;

      default:
        return <SingleJobData job={job} privateCompany={privateCompany ? privateCompany : false} />;
        break;
    }
  };

  const getCoinsidences = jobid => {
    if (job && job.status === 'public') {
      xhr()
        .get(`/match/${query.id}`)
        .then(resp => updateCoinsidences(resp.data))
        .catch(err => err);
    } else {
      setCurrent(0);
      return false;
    }
  };

  useEffect(() => {
    getCoinsidences();
  }, [query.id]);

  if (job) {
    return (
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small">
          <SiteBarJob
            job={job}
            current={current}
            onChange={onChange}
            applyJob={applyJob}
            appyState={appyState}
            duplicate={duplicateJob}
            publish={publish}
            expire={expire}
            checkProfile={checkProfile}
            privateCompany={privateCompany ? privateCompany : false}
          />
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">
          {switchContent()}
          <Can I="apply" a="JOBS">
            {appyState ? (
              <Link href={`/admin/requests`} passHref>
                <Button type="orange" size="small" style={{ marginLeft: 'auto' }}>
                  Ver solicitud
                </Button>
              </Link>
            ) : (
              <Button type="orange" size="small" className="fix-botton" onClick={applyJob} style={{ marginLeft: 'auto' }} disabled={!checkProfile()}>
                <i className="material-icons">send</i>
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
              action: 'replay',
              titleAction: 'Volver',
              urlAction: 'back',
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
      <div className="umana-layout-cl__flex bg-white">{loading ? <Skeleton active /> : <Empty />}</div>
    </div>
  );
};

export default SingleJob;
