import { Sitebar } from '../../../elements';
import { useEffect, useState } from 'react';
import FormJob from '../Add';
import { Progress, Skeleton, Tag } from 'antd';
import { useRouter } from 'next/router';
import locale from '../../../data/translates/spanish';
import { find } from 'lodash';
// import label from '../../../data/labels';
import xhr from '../../../xhr';

const EditJob = () => {
  const router = useRouter();
  // const data = useStoreState(state => state.jobs);
  const [job, setJob] = useState({});
  const [missing, isMissing] = useState(false);

  const getJob = () =>
    xhr()
      .get(`/job/${router.query.id}`)
      .then(res => {
        res.type = false;

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

  const header = {
    title: job && job.company && job.company.name ? job.company.name : 'Empresa',
    icon: 'location_city',
    action: 'remove_red_eye',
    titleAction: 'Ver plaza',
    urlAction: '/admin/jobs/single/',
    urlDinamic: router.query.id,
  };

  const menuItem = [
    {
      icon: 'turned_in',
      title: 'Información General',
      url: '#maininfo',
    },
    {
      icon: 'edit_location',
      title: 'Ubicación',
      url: '#location',
    },
    {
      icon: 'grade',
      title: 'Requerimientos',
      url: '#requirements',
    },
    {
      icon: 'language',
      title: 'Idiomas',
      url: '#languages',
    },
    {
      icon: 'school',
      title: 'Nivel Académicos',
      url: '#academic-level',
    },
    {
      icon: 'account_balance_wallet',
      title: 'Compensación y beneficios',
      url: '#compensation',
    },
  ];

  if (job && job.title) {
    if (job.age) {
      job.age = [job.age.min, job.age.max];
    }
    return (
      <div className="umana-layout-cl">
        <div className="umana-layout-cl__small ">
          <Sitebar header={header} data={menuItem} />
        </div>
        <div className="umana-layout-cl__flex width-section bg-white">
          <FormJob data={job} type="edit" id={router.query.id} />
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

export default EditJob;
