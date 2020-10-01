import { Avatar } from 'antd';
import { isEmpty } from 'lodash';
import locale from '../../../data/translates/spanish';

const General = props => {
  return (
    <div className="umana-content" style={{ marginTop: 50 }} id="general">
      <div className="umana-content-title-over">
        <Avatar icon={<i className="material-icons">person</i>} src={null} size={130} />

        <h2>{props.data.name ? `${props.data.name} ${props.data.lastname}` : `${props.defaultData.name} ${props.defaultData.lastname}`}</h2>
      </div>
      {!isEmpty(props.data.currentJobTitle) ? (
        <div className="umana-content__item item-lg" style={{ textAlign: 'center' }}>
          <label>Puestos a los que aplica</label>
          {/* <p>{props.data.currentJobTitle.map((e, idx) => (idx !== 0 ? `, ${e}` : e))}</p> */}
          <p>{props.data.currentJobTitle}</p>
        </div>
      ) : null}
      {props.data.location.city && props.data.location.country ? (
        <div className="umana-content__item item-lg" style={{ textAlign: 'center' }}>
          <label>Ubicación Actual</label>
          <p>{`${props.data.location.city}, ${props.data.location.country}`}</p>
        </div>
      ) : null}
      {props.data.nationality || props.data.birthday || props.data.age || props.data.gender || props.data.religion || props.data.maritalStatus || props.data.children ? (
        <div className="umana-content__item item-lg">
          <hr />
          <h3>Información General</h3>
        </div>
      ) : null}
      {props.data.nationality ? (
        <div className="umana-content__item item-sm">
          <label>Nacionalidad</label>
          <p>{props.data.nationality}</p>
        </div>
      ) : null}
      {props.data.birthday ? (
        <div className="umana-content__item item-sm">
          <label>Fecha de nacimiento</label>
          <p>{props.data.birthday}</p>
        </div>
      ) : null}
      {props.data.age ? (
        <div className="umana-content__item item-sm">
          <label>Edad</label>
          <p>{`${props.data.age} años`}</p>
        </div>
      ) : null}
      {props.data.gender ? (
        <div className="umana-content__item item-sm">
          <label>Sexo</label>
          <p>{locale(props.data.gender)}</p>
        </div>
      ) : null}
      {props.data.religion ? (
        <div className="umana-content__item item-sm">
          <label>Religión</label>
          <p>{locale(props.data.religion)}</p>
        </div>
      ) : null}
      {props.data.maritalStatus ? (
        <div className="umana-content__item item-sm">
          <label>Estado civil</label>
          <p>{locale(props.data.maritalStatus)}</p>
        </div>
      ) : null}
      {props.data.children ? (
        <div className="umana-content__item item-sm">
          <label>Hijos</label>
          <p>{props.data.children === 0 ? 'Ninguno' : props.data.children}</p>
        </div>
      ) : null}
    </div>
  );
};

export default General;
