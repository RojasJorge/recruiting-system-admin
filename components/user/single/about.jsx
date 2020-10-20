import locale from '../../../data/translates/spanish';
import { Can } from '../../Can';
import Link from 'next/link';

const About = props => {
  return (
    <>
      {props.defaultData.about ? (
        <div className="umana-content" id="aboutme">
          <Can I="apply" a="JOBS">
            <Link href={`/admin/profile/edit?current=2`} passHref>
              <a className="umana-section-edit">
                <i className="material-icons">edit</i>
              </a>
            </Link>
          </Can>
          <div className="umana-content__item item-lg">
            <h2>{`Acerca de ${props.defaultData.name}`}</h2>
          </div>
          <div className="umana-content__item item-lg">
            <p>{props.defaultData.about}</p>
          </div>
        </div>
      ) : null}
      {props.data.availability ||
      props.data.relocate ||
      props.data.travel ||
      props.data.workplace ? (
        <div className="umana-content" id="whatsearch">
          <Can I="apply" a="JOBS">
            <Link href={`/admin/profile/edit?current=3`} passHref>
              <a className="umana-section-edit">
                <i className="material-icons">edit</i>
              </a>
            </Link>
          </Can>
          <div className="umana-content__item item-lg">
            <h2>Qué estas buscando</h2>
          </div>
          {props.data.availability ? (
            <div className="umana-content__item item-md">
              <label>Tipo de plaza</label>
              <p>{locale(props.data.availability)}</p>
            </div>
          ) : null}
          {props.data.relocate ? (
            <div className="umana-content__item item-md">
              <label>¿Estás dispuesto(a) a reubicarte?</label>
              <p>{locale(props.data.relocate)}</p>
            </div>
          ) : null}
          {props.data.travel ? (
            <div className="umana-content__item item-md">
              <label>¿Disponibilidad de viajar?</label>
              <p>{locale(props.data.travel)}</p>
            </div>
          ) : null}
          {props.data.workplace ? (
            <div className="umana-content__item item-md">
              <label>Preferencia de ubicación</label>
              <p>{locale(props.data.workplace)}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default About;
