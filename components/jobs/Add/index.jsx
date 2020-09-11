import { Form, Input, InputNumber, Button, Select, Tooltip, Radio, Slider, Checkbox } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';

import Languages from '../../Languages';
import Compensation from './compensation';
import AcademicLevels from '../../Academic';
import GeneralJob from './general';
import Requirements from './requirements';
import LocationJob from './locations';
import xhr from '../../../xhr';

const FormJob = () => {
  const data = useStoreState(state => state.collections);
  const fill = useStoreActions(actions => actions.collections.fill);
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
    get();
  }, []);
  /** Get collection */
  const getAcademic = () =>
    xhr()
      .get(`/academic-level`)
      .then(resp => fill(resp.data))
      .catch(err => console.log(err));

  useEffect(() => {
    setAcademic(data.list);
  }, [data.list]);

  useEffect(() => {
    getAcademic();
  }, []);

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const onFinish = e => {
    console.log(e);
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
          <GeneralJob career={career} />
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
          <AcademicLevels acLevel={academic} />
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
