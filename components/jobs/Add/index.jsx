import { Form, Button, notification, Radio, Select, Alert, Modal } from 'antd';
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
import moment from 'moment';
import { isEmpty, find } from 'lodash';
// import Jobs from '../index';

const { confirm } = Modal;

const FormJob = props => {
  const [form] = Form.useForm();

  const data = useStoreState(state => state.collections);
  const collectionsActions = useStoreActions(actions => actions.collections);
  const companies = useStoreState(state => state.companies);
  const fill = useStoreActions(actions => actions.companies.fill);
  const [missing, isMissing] = useState(false);
  const [companySelect, setCompany] = useState('');
  const [statuState, setStatus] = useState('draft');
  const auth = useStoreState(state => state.auth.token);

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
    collectionsActions.get({ type: 'career', token: auth });
    collectionsActions.get({ type: 'academic-level', token: auth });
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
    let newObj = e;
    if (statuState === 'public') {
      const startdate = moment();
      startdate.format();

      const data = {
        created_at: startdate,
        contact: e.contact,
        status: statuState,
      };
      newObj = Object.assign(e, data);
    }

    xhr()
      .put(`/job/${props.id}`, JSON.stringify(newObj))
      .then(resp => {
        props.updateJob();
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

  const publish = e => {
    setStatus('public');
  };
  const saveChange = e => {
    setStatus('draft');
  };

  const onFinish = e => {
    let id = { company_id: router.query.id };
    const statusState = { status: statuState };
    let newObj = e;
    if (props.needCompanySelect) {
      id = { company_id: companySelect };
    }
    if (props.type === 'edit') {
      id = { company_id: props.data.company_id };
    }

    if (!e.isBranch) {
      const objLocation = {
        address: '',
        zone: 0,
        country: '',
        province: '',
        city: '',
        latitude: 0,
        longitude: 0,
      };
      const companyLocation =
        companies && companies.company && companies.company.items && companies.company.items.length > 0 ? companies.company.items.filter(e => e.id === id.company_id)[0].location : objLocation;
      delete companyLocation.latitude;
      delete companyLocation.longitude;
      const addBranch = { branch: companyLocation };
      newObj = Object.assign(e, id, statusState, addBranch);
    }
    newObj = Object.assign(e, id, statusState);

    if (props.type && props.type === 'edit') {
      delete newObj.company_id;
      confirm({
        icon: <i className="material-icons">info</i>,
        title: 'Editar plaza',
        cancelText: 'Cancelar',
        okText: 'Guardar',
        content: (
          <div>
            <p>Los cambios se guardarán pero la plaza aun no sera visible, ni resivirá solicitudas hasta que la publiques. </p>
          </div>
        ),
        onOk() {
          edit(newObj);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      if (statuState === 'public') {
        confirm({
          icon: <i className="material-icons">info</i>,
          title: 'Publicar plaza',
          cancelText: 'Cancelar',
          okText: 'Publicar plaza',

          content: (
            <div>
              <p>Una vez publicada la plaza ya no podras editarla.</p>
              <br />
              <p>¿Estas seguro de publicar esta plaza?</p>
            </div>
          ),
          onOk() {
            if (props.type && props.type === 'edit') {
              edit(newObj);
            } else {
              add(newObj);
            }
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      } else {
        add(newObj);
      }
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
          {props.needCompanySelect && props.needCompanySelect === true ? (
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
          {props.type === 'edit' ? (
            <Button htmlType="submit" onClick={saveChange} type="dashed" size="small" style={{ margin: 0, paddin: '0 20px', height: 45, marginRight: 10 }}>
              Guardar cambios
            </Button>
          ) : null}
          {!props.type ? (
            <Button htmlType="submit" type="dashed" size="small" style={{ margin: 0, paddin: '0 20px', height: 45, marginRight: 10 }}>
              Guardar como borrador
            </Button>
          ) : null}
          <Button htmlType="submit" onClick={publish} type="primary" size="small" style={{ margin: 0, marginLeft: 10, paddin: '0 20px', height: 45 }}>
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
