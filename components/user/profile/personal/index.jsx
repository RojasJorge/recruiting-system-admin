import { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Alert, Button, Form, notification } from 'antd';
import Names from './Names';
import router from 'next/router';
import Locations from '../../../Location';
import General from './General';
import Contact from './Contact';
import About from './About';
import Documents from '../Documents';
import xhr from '../../../../xhr';
import AvatarCropper from '../../../Misc/AvatarCropper';
import storage from '../../../../storage';
import { isEmpty } from 'lodash';

/** Import form sections */
const FormItem = Form.Item;

const Personal = ({ switchCurrent, current }) => {
  /** Global state */
  const {
    profile: {
      id,
      fields: { personal },
    },
  } = useStoreState(state => state.auth.user);

  /** Birthday handler */
  const [birthday, setBirthday] = useState(personal.birthday);

  /** Avatar info */
  const [avatar, updateAvatar] = useState([]);

  /** Avatar info */
  const [toDelete, updateToDelete] = useState(null);

  /** Phones */
  const [phones, setPhones] = useState([]);

  /** Personal info */
  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  const onFinish = fields => {
    avatar.map(o => {
      o.thumbUrl = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + o.response.url;
      return o;
    });

    fields.location.zone = !fields.location.zone ? 0 : fields.location.zone;

    fields = { ...fields, birthday, avatar };

    xhr()
      .put(
        `/profile/${id}`,
        JSON.stringify({
          fields: {
            personal: fields,
          },
        }),
      )
      .then(resp => {
        /** Update current profile */
        updateProfile({ type: 'personal', fields });

        /** Checks if is necessary to delete file from storage */
        if (toDelete) confirmRemoveAvatarFromStorage(toDelete);

        window.scroll({
          top: 80,
          behavior: 'smooth',
        });
        /** Switch to the next tab */
        // switchCurrent(current + 1);

        /** Updates query params on router */
        router.push(`${router.router.pathname}?current=${parseInt(router.router.query.current, 10) + 1}`);

        /** Send notification success */
        notify('success', 'Ficha personal actualizada.', 'Vamos al siguiente paso...');
      })
      .catch(err => console.log('Error:', err));
  };

  /** Removes the avatar from server if avatar is an empty array */
  const confirmRemoveAvatarFromStorage = file => {
    storage()
      .delete(`/delete/${file.response.url.split('/')[2]}`)
      .then(resp => updateToDelete(null))
      .catch(err => console.log(err));
  };

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  return (
    <>
      <Form name="basic" onFinish={onFinish} initialValues={personal} validateTrigger="onBlur" scrollToFirstError={true}>
        <div className="umana-form--section">
          <div style={{ width: '100%', marginBottom: 30 }}>{isEmpty(avatar) && <Alert message="Debes agregar una imagen de perfil" type="error" showIcon />}</div>

          {/*AVATAR UPLOADER*/}
          <AvatarCropper personal={personal} avatar={avatar} updateAvatar={updateAvatar} updateToDelete={updateToDelete} />

          {/*SIMPLE DIVIDER*/}
          <h2 style={{ width: '100%', marginTop: 20 }}>Información personal</h2>

          {/*NAMES FRAGMENT*/}
          <Names />

          {/*CUSTOM LOCATIONS FIELD*/}
          <Form.Item name="location" label="Ubicación actual">
            <Locations />
          </Form.Item>
        </div>

        {/*GENERAL INFO LIKE NATIONALITY, AGE, MARITAL STATUS, ETC...*/}
        <General birthday={birthday} setBirthday={setBirthday} />

        {/*SIMPLE CONTACT INFO*/}
        <Contact phones={phones} setPhones={setPhones} />
        <About />
        <Documents />
        <FormItem>
          {/* <Button type="orange" htmlType="submit" size="small" disabled={isEmpty(avatar)} style={{ marginLeft: 'auto' }}> */}
          <Button type="orange" htmlType="submit" size="small" style={{ marginLeft: 'auto' }}>
            Guardar y continuar
          </Button>
        </FormItem>
      </Form>
    </>
  );
};

export default Personal;
