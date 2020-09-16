import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Skeleton } from 'antd';
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
        setJob(res.data);
      })
      .catch(err => isMissing(true));
  }, []);

  const header = {
    title: job && job.title ? job.title : 'Plaza',
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
