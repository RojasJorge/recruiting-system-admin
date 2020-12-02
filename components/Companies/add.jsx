import { Form, Input, notification, Button } from 'antd';
import PropTypes from 'prop-types';
import Locations from '../Location';
import xhr from '../../xhr';
import ContactInfo from './add/contact';
import Router from 'next/router';
import TynyEditor from '../Misc/TinyEditor';
import { UploadAvatar } from '../../elements';
import AvatarCropper from '../Misc/AvatarCropper';
import { useState } from 'react';
import { isEmpty } from 'lodash';

const { TextArea } = Input;

const FormCompany = props => {
  const [avatar, updateAvatar] = useState([]);
  const [toDelete, updateToDelete] = useState(null);

  const openNotification = placement => {
    notification.info({
      message: `Confirmación`,
      description: 'La empresa ha sido creada con éxito',
      placement,
    });
  };
  const user = JSON.parse(localStorage.getItem('uUser'));
  // console.log(user.id);

  const allSet = (data, type) => {
    if (type && type === 'edit') {
      notification.info({
        message: `Confirmación`,
        description: 'La empresa ha sido actualizada con éxito',
        placement: 'bottomRight',
      });
      setTimeout(() => {
        // Router.replace(`/admin/companies/${data}`);
        Router.push(`/admin/companies/${props.id}`);
      }, 500);
    } else {
      openNotification('bottomRight');
      setTimeout(() => {
        Router.replace(`/admin/companies/${data}`);
      }, 500);
    }
  };
  const add = async e => {
    xhr()
      .post(`/company`, e)
      .then(resp => {
        allSet(resp.data);
      })
      .catch(err =>
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor intentelo más tarde',
          placement: 'bottomRight',
        }),
      );
  };
  const update = async e => {
    xhr()
      .put(`/company/${props.id}`, JSON.stringify(e))
      .then(resp => {
        allSet(resp.data, 'edit');
      })
      .catch(err => {
        console.log(err);
        notification.info({
          message: `Error`,
          description: 'Ha ocurrido un error, por favor intentelo más tarde',
          placement: 'bottomRight',
        });
      });
  };
  const onFinish = e => {
    !isEmpty(avatar)
      ? avatar.map(o => {
          o.thumbUrl = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + o.response.url;
          return o;
        })
      : null;

    const newAvatar = { avatar: avatar };

    const newObj = Object.assign(e, newAvatar);
    console.log('avatar', newObj);
    if (props.action === 'edit') {
      update(newObj);
    } else {
      add(newObj);
    }
  };

  /** avatar */

  console.log('props', props.data);
  return (
    <>
      <h2 style={{ width: '100%' }}>Información general</h2>

      {/*AVATAR UPLOADER*/}
      <AvatarCropper personal={props.data} avatar={avatar} updateAvatar={updateAvatar} updateToDelete={updateToDelete} />

      <Form scrollToFirstError={true} onFinish={onFinish} initialValues={props.data} validateTrigger="onBlur">
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
          {/*<TextArea rows={4} />*/}
          <TynyEditor />
        </Form.Item>
        <Form.Item name="typeBusiness" label="Tipo de negocio de la empresa" className="form-item--md">
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
    </>
  );
};

FormCompany.propTypes = {
  data: PropTypes.object,
  action: PropTypes.string,
  id: PropTypes.string,
};

FormCompany.defaultProps = {
  data: {},
  action: 'add',
  id: '',
};

export default FormCompany;
