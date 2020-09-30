import { isEmpty } from 'lodash';
const Contact = props => {
  return (
    <div className="umana-content" id="contact">
      <div className="umana-content__item item-lg">
        <h2>Información de contacto</h2>
      </div>
      <div className="umana-content__item item-md">
        <label>Correo electrónico</label>
        <p>{props.data.email ? props.data.email : props.defaultData.email}</p>
      </div>
      {!isEmpty(props.data.phones) ? (
        <div className="umana-content__item item-md">
          <label>Teléfono</label>
          {props.data.phones.map((e, idx) => (
            <p>{e}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Contact;