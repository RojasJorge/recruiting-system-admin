import { Avatar } from 'antd';
import { isEmpty } from 'lodash';
import { Skeleton } from 'antd';

const SingleData = props => {
  const getAvatarFromProps = _ => {
    let result = null;

    if (props && props.company) {
      const avatar = props.company.avatar;

      if (!isEmpty(avatar)) {
        result = process.env.NEXT_PUBLIC_APP_FILE_STORAGE + avatar[0].response.url;
      }
    }

    return result;
  };

  if (!isEmpty(props.company)) {
    return (
      <div className="umana-section-contenct">
        <div className="section-avatar">
          <Avatar icon={<i className="material-icons">location_city</i>} src={getAvatarFromProps()} size={120} />
        </div>
        <div className="section-title">
          <h1>{props.company.name ? props.company.name : 'nombre de la empresa'}</h1>
        </div>
        <h5>Acerca de la empresa</h5>
        <p>{props.company.description ? <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: props.company.description }}></div> : 'Descripción de la empresa'}</p>
        {props.company.location ? (
          <>
            <h5>Ubicación</h5>
            <p>
              {`${props.company.location.address}, zona ${props.company.location.zone},`}
              <br></br> {`${props.company.location.city}, ${props.company.location.country}`}
            </p>
          </>
        ) : null}
        <h5>Sitio web</h5>
        <p>{props.company.website}</p>
        <h5>Fundación</h5>
        <p>{props.company.experience}</p>
        <h5>Números de empleados</h5>
        <p>{props.company.employees}</p>
      </div>
    );
  }

  return (
    <div className="umana-section-contenct">
      <div className="section-avatar">
        <Skeleton.Image />
      </div>
      <div className="section-title">
        <Skeleton active />
      </div>
      <Skeleton active />
    </div>
  );
};

export default SingleData;
