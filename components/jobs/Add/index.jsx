import { Form, Button, notification } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Languages from '../../Languages';
import Compensation from './compensation';
import AcademicLevels from '../../Academic';
import GeneralJob from './general';
import Requirements from './requirements';
import LocationJob from './locations';
import xhr from '../../../xhr';
import router from 'next/router';
import { isEmpty } from 'lodash';

const FormJob = props => {
  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  let initialState = {
    locationState: 'public',
    interviewPlace: 'office',
    gender: 'indifferent',
    vehicle: 'indifferent',
    type_license: 'indifferent',
    age: [18, 60],
    isBranch: false,
    company_state: 'public',
  };
  if (!isEmpty(props.data)) {
    initialState = props.data;
  }

  useEffect(() => {
    collectionsActions.get({ type: 'career', token: localStorage.getItem('uToken') });
    collectionsActions.get({ type: 'academic-level', token: localStorage.getItem('uToken') });
  }, []);

  const allSet = e => {
    console.log(e);
    notification.info({
      message: `Confirmación`,
      description: 'La plaza ha sido publicada con éxito',
      placement: 'bottomRight',
    });
    setTimeout(() => {
      router.push(`/admin/jobs/single/[id]`, `/admin/jobs/single/${e}`);
    }, 500);
  };

  const add = async e => {
    xhr()
      .post(`/job`, JSON.stringify(e))
      .then(resp => {
        allSet(resp.data);
        // fill(resp.data);
      })
      .catch(err => {
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor inténtalo más tarde',
          placement: 'bottomRight',
        });
      });
  };

  const onFinish = e => {
    const id = { company_id: router.query.id };
    const age = { min: e.age[0], max: e.age[1] };
    e.age = age;
    const newObj = Object.assign(e, id);

    add(newObj);
  };

  return (
    <div>
      <Form scrollToFirstError={true} onFinish={onFinish} className="umana-form umana-max-witdh" initialValues={initialState}>
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

FormJob.propTypes = {
  data: PropTypes.object,
};

FormJob.defaultProps = {
  data: {},
};

export default FormJob;
