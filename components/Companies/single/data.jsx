import { Avatar } from 'antd';
const SingleData = props => {
  return (
    <div className="umana-section-contenct">
      <div className="section-avatar">
        <Avatar
          icon={<i className="material-icons">location_city</i>}
          src={props.company.avatar}
          size={120}
        />
      </div>
      <div className="section-title">
        <h1>{props.company.name ? props.company.name : 'nombre de la empresa'}</h1>
      </div>
      <h5>Acerca de la empresa</h5>
      <p>{props.company.description ? props.company.description : 'Descripción de la empresa'}</p>
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
};

export default SingleData;
