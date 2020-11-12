import { Button, Form, Input, notification } from 'antd';
import { useStoreActions, useStoreState } from 'easy-peasy';
import xhr from '../../../../xhr';
import router from 'next/router';
import TynyEditor from '../../../Misc/TinyEditor';

const { Item } = Form;

const About = ({ switchCurrent, current }) => {
  /** Global state */
  const {
    profile: {
      id,
      fields: { personal },
    },
  } = useStoreState(state => state.auth.user);

  /** Personal info */
  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  /** Notifications */
  const notify = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: 'bottomRight',
    });
  };

  return (
    <div className="umana-form--section">
      <h2>Acerca de ti</h2>
      <Item name="about" className="form-item--lg" label="Cuentanos acerca de ti y tu experiencia" rules={[{ required: true, message: 'Este campo es requerido.' }]}>
        <TynyEditor />
      </Item>
    </div>
  );
};

export default About;
