import { Form, Button, notification, Radio, Select, Alert } from 'antd';
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
import { isEmpty, find } from 'lodash';
// import Jobs from '../index';

const FormJob = props => {
  const [form] = Form.useForm();

  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const companies = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);
  const [missing, isMissing] = useState(false);
  const [company, setCompany] = useState('');
  const [statuState, setStatus] = useState('draft');
  const JobsList = useStoreState(state => state.jobs.list);
  const fillJobs = useStoreActions(actions => actions.jobs.fill);

  useEffect(() => {
    xhr()
      .get(`/company`)
      .then(res => {
        res.type = false; /** This param (if true) loads a collection, false => single object */
        fill(res);
      })
      .catch(err => isMissing(true));
  }, []);

  let isBranch = props.data && props.data.isBranch ? props.data.isBranch : false;
  let positionAlt = true;

  useEffect(() => {
    collectionsActions.get({ type: 'career', token: localStorage.getItem('uToken') });
    collectionsActions.get({ type: 'academic-level', token: localStorage.getItem('uToken') });
  }, []);

  const allSet = e => {
    if (props.type && props.type === 'edit') {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha sido actualizado con éxito',
        placement: 'bottomRight',
      });
    } else {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha sido publicada con éxito',
        placement: 'bottomRight',
      });
    }
    setTimeout(() => {
      if (props.setCurrent) {
        props.setCurrent(2);
      } else {
        router.push(`/admin/jobs/single/[id]`, `/admin/jobs/single/${e}`);
      }
    }, 500);
  };

  const add = async e => {
    xhr()
      .post(`/job`, JSON.stringify(e))
      .then(resp => {
        allSet(resp.data);
      })
      .catch(err => {
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor inténtalo más tarde',
          placement: 'bottomRight',
        });
      });
  };
  const edit = async e => {
    xhr()
      .put(`/job/${props.id}`, JSON.stringify(e))
      .then(resp => {
        let old = find(JobsList, { id: props.id });
        let updated = e;
        updated = { ...updated, id: props.id, company_id: old.company_id };
        let jobs = [...JobsList, updated];

        fillJobs({
          data: {
            items: jobs,
            total: jobs.length,
          },
        });

        allSet(props.id);
      })
      .catch(err => {
        console.log('Error:', err);
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor inténtalo más tarde',
          placement: 'bottomRight',
        });
      });
  };

  const saveDraft = e => {
    setStatus('public');
  };

  const onFinish = e => {
    let id = { company_id: router.query.id };
    if (props.company && props.company) {
      id = { company_id: company };
    }
    const statusState = { status: statuState };
    const age = { min: e.age[0], max: e.age[1] };
    e.age = age;
    const newObj = Object.assign(e, id, statusState);
    if (props.type && props.type === 'edit') {
      delete newObj.company_id;
      edit(newObj);
    } else {
      add(newObj);
    }
  };

  return (
    <div>
      <Form className="umana-form umana-max-witdh" initialValues={props.data} onFinish={onFinish} scrollToFirstError={true} validateTrigger="onBlur" form={form}>
        <div className="umana-form--section" id="maininfo">
          <h2 style={{ width: '100%' }}>Información general</h2>
          <GeneralJob career={data.career} position={positionAlt} />
        </div>
        <div className="umana-form--section" id="location">
          <h2 style={{ width: '100%', margin: 0 }}>Ubicación</h2>
          <LocationJob isBranch={isBranch} />
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
        <div className="umana-form--section" id="company">
          <h2 style={{ width: '100%', margin: 0 }}>Información de Empresa</h2>
          {props.company && props.company === true ? (
            <Form.Item
              label="¿De qué empresa es esta plaza?"
              className="form-item--lg"
              name="company_id"
              rules={[
                {
                  required: true,
                  message: 'La empresa es requerida',
                },
              ]}
            >
              <Select name="company_id" onChange={e => setCompany(e)}>
                {companies.company && companies.company.items
                  ? companies.company.items.map((e, idx) => (
                      <Select.Option key={idx} value={e.id}>
                        {e.name}
                      </Select.Option>
                    ))
                  : null}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item label="Confidencialidad de la empresa" className="form-item--lg" name="company_state" help="Seleccionar si desea que la información de la empresa sea pública">
            <Radio.Group>
              <Radio.Button value="public">Pública</Radio.Button>
              <Radio.Button value="confidential">Privada</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>

        {/* end group */}
        <div className="umana-form--footer">
          {!props.type ? (
            <Button htmlType="submit" type="dashed" size="small" style={{ margin: 0, paddin: '0 20px', height: 45, marginRight: 10 }}>
              Guardar como borrador
            </Button>
          ) : null}
          <Button htmlType="submit" onClick={saveDraft} type="primary" size="small" style={{ margin: 0, marginLeft: 10, paddin: '0 20px', height: 45 }}>
            Publicar
          </Button>
        </div>
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
