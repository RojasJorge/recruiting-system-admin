import { Form, Button } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';

import Languages from '../../Languages';
import Compensation from './compensation';
import AcademicLevels from '../../Academic';
import GeneralJob from './general';
import Requirements from './requirements';
import LocationJob from './locations';
import xhr from '../../../xhr';
import { useRouter } from 'next/router';

const FormJob = () => {
  const router = useRouter();
  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const [career, setCareer] = useState([]);
  const [academic, setAcademic] = useState(true);
  /** Get collection */
  const get = () =>
    xhr()
      // .get(`/${type}?pager=${JSON.stringify({ page: 1, limit: 1000 })}`)
      .get(`/career`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setCareer(data.list);
  }, [data.list]);

  useEffect(() => {
    collectionsActions.get({ type: 'career', token: localStorage.getItem('uToken') });
    collectionsActions.get({ type: 'academic-level', token: localStorage.getItem('uToken') });
  }, []);

  const add = async e => {
    xhr()
      .post(`/job`, e)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));
  };

  const onFinish = e => {
    const id = { company_id: router.query.id };
    const age = { min: e.age[0], max: e.age[1] };
    e.age = age;
    const newObj = Object.assign(e, id);

    console.log(newObj);
    add(newObj);
  };

  return (
    <div>
      <Form
        scrollToFirstError={true}
        onFinish={onFinish}
        className="umana-form umana-max-witdh"
        initialValues={{
          locationState: 'public',
          interviewPlace: 'office',
          gender: 'indifferent',
          vehicle: 'indifferent',
          type_license: 'indifferent',
          age: [18, 60],
          isBranch: false,
          company_state: 'public',
        }}
      >
        <div className="umana-form--section" id="maininfo">
          <h2 style={{ width: '100%' }}>Información general</h2>
          <GeneralJob career={data.career} />
        </div>
        <div className="umana-form--section" id="location">
          <h2 style={{ width: '100%', margin: 0 }}>Ubicación</h2>
          <LocationJob />
        </div>
        <div className="umana-form--section" id="requirements">
          <h2 style={{ width: '100%' }}>Requerimientos</h2>
          <br />
          <Requirements />
        </div>
        <div className="umana-form--section" id="languages">
          <h2 style={{ width: '100%', margin: 0 }}>Idiomas</h2>
          <Languages />
        </div>
        <div className="umana-form--section" id="academic-level">
          <h2 style={{ width: '100%', margin: 0 }}>Niveles Académicos</h2>
          <AcademicLevels acLevel={data.academic_level} />
        </div>
        <div className="umana-form--section" id="compensation">
          <h2 style={{ width: '100%', margin: 0 }}>Compensaciones</h2>
          <Compensation />
        </div>

        {/* end group */}
        <Form.Item className="umana-form--footer">
          <Button htmlType="submit" type="primary">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormJob;
