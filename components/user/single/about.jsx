import locale from '../../../data/translates/spanish';
import { Can } from '../../Can';
import Link from 'next/link';
import { Tag } from 'antd';

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
            <div className="umana-content-custom" dangerouslySetInnerHTML={{ __html: props.defaultData.about }}></div>
          </div>
        </div>
      ) : null}
      {props.data.availability || props.data.relocate || props.data.travel || props.data.workplace ? (
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
          {props.data && props.data.availability && props.data.availability.length > 0 ? (
            <div className="umana-content__item item-md">
              <label>Tipo de plaza</label>
              <p>
                {props.data.availability.map((e, id) => (
                  <span key={id}>
                    {id > 0 ? ', ' : null} {locale(e)}
                  </span>
                ))}
              </p>
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
              <div>
                {props.data.workplace.map((e, id) => (
                  <Tag key={id}>{locale(e)}</Tag>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default About;
