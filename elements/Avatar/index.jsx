import PropTypes from 'prop-types';
import { Avatar, Button } from 'antd';
const UploadAvatar = props => {
  return (
    <div className="umana-avatarUp">
      <div className="umana-avatarUp__content">
        <h3>{props.type === 'company' ? 'Logotipo de la empresa' : 'Foto de perfil'}</h3>
        <p>Sube una fotografía en JPG de no más de 800x800 pixeles.</p>
        <Button type={props.type === 'company' ? 'green' : 'orange'} size="small">
          subir fotografía
          <input type="file" id="uploadfield" accept="image/jpeg" />
        </Button>
      </div>
      <div className="umana-avatarUp__avatar">
        <Avatar
          className={props.type}
          icon={
            <i className="material-icons">
              {props.type === 'company' ? 'domain' : 'person_outline'}
            </i>
          }
          size={120}
        />
        <Button type={props.type === 'company' ? 'circle-green' : 'circle-orange'} size="small">
          <i className="material-icons">add</i>
        </Button>
        <input type="file" className="inputUploadfield" accept="image/jpeg" />
      </div>
    </div>
  );
};

UploadAvatar.propTypes = {
  type: PropTypes.string,
};

UploadAvatar.defaultProps = {
  type: 'company',
};

export default UploadAvatar;
