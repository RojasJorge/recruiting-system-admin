import { Form, Input, notification, Button } from 'antd';
import PropTypes from 'prop-types';
import Locations from '../Location';
import xhr from '../../xhr';
import ContactInfo from './add/contact';
import Router from 'next/router';
import { UploadAvatar } from '../../elements';

const { TextArea } = Input;

const FormCompany = props => {
  const openNotification = placement => {
    notification.info({
      message: `Confirmación`,
      description: 'La empresa ha sido creada con éxito',
      placement,
    });
  };

  const allSet = data => {
    openNotification('bottomRight');
    setTimeout(() => {
      Router.replace(`/admin/companies/${data}`);
    }, 500);
  };
  const add = async e => {
    xhr()
      .post(`/company`, e)
      .then(resp => {
        allSet(resp.data);
      })
      .catch(err => console.log(err));
  };
  const onFinish = e => {
    add(e);
  };

  console.log('new data', props.data);
  return (
    <div className="col">
      <h2 style={{ width: '100%' }}>Información general</h2>
      <UploadAvatar type="company" />
      <Form scrollToFirstError={true} onFinish={onFinish}>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'El nombre de la empresa es requerido.',
            },
          ]}
          name="name"
          label="Nombre de la empresa"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: 'La descripción de la empresa es requerida',
            },
          ]}
          name="description"
          label="Descripción de la empresa"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="typeBusness"
          label="Tipo de negocio de la empresa"
          className="form-item--md"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item name="socialreason" label="Razón Social" className="form-item--md">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="nit" label="NIT" className="form-item--sm">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="employees" label="Números de empleos" className="form-item--sm">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="experience" label="Año de fundación" className="form-item--sm">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="website" label="Sitio Web">
          <Input size="large" />
        </Form.Item>
        <Form.Item name="location" label="Ubicación">
          <Locations />
        </Form.Item>
        <div className="umana-form--group">
          <h2 style={{ width: '100%' }}>Información de contacto</h2>
          <br />
          <Form.Item name="contact" className="form-item--lg">
            <ContactInfo />
          </Form.Item>
        </div>
        <Form.Item className="umana-form--footer">
          <Button htmlType="submit" type="primary">
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

FormCompany.propTypes = {
  data: PropTypes.object,
};

FormCompany.defaultProps = {
  data: {},
};

export default FormCompany;
