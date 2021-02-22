import { Form, Button, notification, Radio, Select, Alert, Modal, Input } from 'antd';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Languages from '../../Languages';
import PageLoader from '../../Misc/PageLoader';
import Compensation from './compensation';
import AcademicLevels from '../../Academic';
import GeneralJob from './general';
import Requirements from './requirements';
import LocationJob from './locations';
import xhr from '../../../xhr';
import router from 'next/router';
import moment from 'moment';
import { isEmpty, find } from 'lodash';
import { SearchApi } from '../../../elements';
// import Jobs from '../index';

const { confirm } = Modal;

const FormJob = props => {
  const [form] = Form.useForm();
  const data = useStoreState(state => state.collections);
  const companies = useStoreState(state => state.companies);
  const [companySelect, setCompany] = useState('');
  const [statuState, setStatus] = useState('draft');
  const auth = useStoreState(state => state.auth.token);
  const [validation, setValidation] = useState(false);
  const [loader, setLoader] = useState(false);

  const [companyInfo, setCompanyInfo] = useState({
    value: '',
    id: '',
    location: {},
  });

  let isBranch = props.data && props.data.isBranch ? props.data.isBranch : false;
  let positionAlt = true;

  const allSet = e => {
    setLoader(false);
    if (props.type && props.type === 'edit') {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha sido actualizado con éxito',
        placement: 'bottomRight',
      });
    }
    if (statuState === 'public') {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha sido publicada con éxito',
        placement: 'bottomRight',
      });
    }
    if (statuState === 'draft' && props.type && props.type !== 'edit') {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha guardado como borrador con éxito',
        placement: 'bottomRight',
      });
    }
    if (statuState === 'draft' && !props.type && props.type !== 'edit') {
      notification.info({
        message: `Confirmación`,
        description: 'La plaza ha guardado como borrador con éxito',
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
        setLoader(false);
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
        setLoader(false);
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
    console.log(statuState);
  };
  const draft = e => {
    setLoader(false);
    setStatus('draft');
    console.log(statuState);
  };
  const saveChange = e => {
    setLoader(false);
    setStatus('draft');
    console.log(statuState);
  };

  const onSelectOption = obj => {
    setValidation(false);
    setCompanyInfo(obj);
    setCompany(obj.id);
  };

  const onClear = () => {
    setCompanyInfo({
      value: '',
      id: '',
      location: {},
    });
    setCompany('');
  };

  const onFinish = e => {
    const statusState = { status: statuState };
    if (e.dependents === null) {
      e.dependents = 0;
    }
    let newObj = e;
    newObj = Object.assign(e, statusState);

    if (props.type && props.type === 'edit') {
      delete newObj.company_id;
      confirm({
        icon: <i className="material-icons">info</i>,
        title: 'Editar plaza',
        cancelText: 'Cancelar',
        okText: 'Guardar',
        content: (
          <div>
            <p>Los cambios se guardarán pero la plaza aún no será visible ni recibirá solicitudes hasta que la publiques.</p>
          </div>
        ),
        onOk() {
          edit(newObj);
        },
        onCancel() {
          setLoader(false);
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
            setLoader(false);
            console.log('Cancel');
          },
        });
      } else {
        add(newObj);
      }
    }
  };

  const companyValidatio = e => {
    setLoader(true);
    // si necesita un select
    if (props.needCompanySelect) {
      // validar que se selecciono una empresa
      if (!isEmpty(companySelect)) {
        let company = { company_id: companySelect };
        delete companyInfo.location.latitude;
        delete companyInfo.location.longitude;
        //enviar ubicacion de la empresa
        if (!e.isBranch) {
          company = { company_id: companySelect, branch: companyInfo.location };
        }
        const newObj = Object.assign(e, company);
        console.log(newObj);
        onFinish(newObj);
      } else {
        setValidation(true);
        window.scroll({
          top: 80,
          behavior: 'smooth',
        });
      }
    } else {
      // si no requeiere select
      if (props.type !== 'edit') {
        let company = { company_id: router.query.id };
        // enviar ubicacion de la empresa
        if (!e.isBranch) {
          delete props.companyData.location.latitude;
          delete props.companyData.location.longitude;
          company = { company_id: router.query.id, branch: props.companyData.location };
        }
        const newObj = Object.assign(e, company);
        onFinish(newObj);
      } else {
        console.log(props.type, e);
        let company = { company_id: props.data.company_id };
        // enviar ubicacion de la empresa
        if (!e.isBranch) {
          delete props.companyData.location.latitude;
          delete props.companyData.location.longitude;
          company = { branch: props.companyData.location };
        }
        const newObj = Object.assign(e, company);
        onFinish(newObj);
      }
    }
  };

  return (
    <div>
      <div className="umana-form--section" style={{ marginBottom: 0, paddingBottom: 0 }} id="company">
        <h2 style={{ width: '100%', margin: 0 }}>Información de Empresa</h2>

        {props.needCompanySelect && props.needCompanySelect === true ? (
          <div className={`form-item--lg validation-${validation}`} style={{ width: '100%', padding: 10 }}>
            <SearchApi validation={validation} onSelectOption={onSelectOption} onClear={onClear} />
          </div>
        ) : null}
      </div>
      {loader ? <PageLoader active={loader} /> : null}
      <Form className="umana-form umana-max-witdh" initialValues={props.data} onFinish={companyValidatio} scrollToFirstError={true} validateTrigger="onBlur" form={form}>
        <div className="umana-form--section" style={{ marginTop: 0, paddingTop: 0 }}>
          <Form.Item label="Confidencialidad de la empresa" className="form-item--lg" name="company_state" help="Seleccionar si desea que la información de la empresa sea pública">
            <Radio.Group>
              <Radio.Button value="public">Pública</Radio.Button>
              <Radio.Button value="confidential">Privada</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
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

        {/* end group */}
        <div className="umana-form--footer">
          {props.type === 'edit' ? (
            <Button htmlType="submit" onClick={saveChange} type="dashed" size="small" style={{ margin: 0, paddin: '0 20px', height: 45, marginRight: 10 }}>
              Guardar cambios
            </Button>
          ) : null}
          {!props.type ? (
            <Button htmlType="submit" onClick={draft} type="dashed" size="small" style={{ margin: 0, paddin: '0 20px', height: 45, marginRight: 10 }}>
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
  companyData: PropTypes.object,
};

FormJob.defaultProps = {
  data: {},
  companyData: {},
};

export default FormJob;
