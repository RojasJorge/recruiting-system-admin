import { isEmpty } from 'lodash';
import { Can } from '../../Can';
import locale from '../../../data/translates/spanish';
import Link from 'next/link';
const Contact = props => {
  return (
    <div className="umana-content" id="contact">
      <Can I="apply" a="JOBS">
        <Link href={`/admin/profile/edit?current=0`} passHref>
          <a className="umana-section-edit">
            <i className="material-icons">edit</i>
          </a>
        </Link>
      </Can>
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
            <p key={idx}>{`${locale(e.type)}: +(${e.area}) ${e.number}`}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Contact;
