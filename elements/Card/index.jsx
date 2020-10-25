import Link from 'next/link';
import { Avatar } from 'antd';
import Moment from 'react-moment';
import { Can } from '../../components/Can';

const Card = props => {
  return (
    <div
      className={`umana-card card-theme-${props.theme} card-content-align-${props.align} card-${props.size} card-type-${props.type}`}
    >
      <div className="umana-card__options">
        {props.edit ? (
          <Link href={props.edit} passHref>
            <a className="umana-card--button edit">
              <i className="material-icons">mode_edit</i>
            </a>
          </Link>
        ) : null}
        {props.favorite ? (
          <Link href={props.edit} passHref>
            <a className="umana-card--button favorite">
              <i className="material-icons">star_border</i>
            </a>
          </Link>
        ) : null}
        {props.save ? (
          <Link href={props.edit} passHref>
            <a className="umana-card--button save">
              <i className="material-icons">turned_in_not</i>
            </a>
          </Link>
        ) : null}
      </div>
      {props.parentInfo ? (
        <div className="umana-card__parent-info">
          <Can I="guest" a="JOBS">
            <>
              {props.parentInfo.avatar ? (
                <Avatar size={80} src={props.parentInfo.avatar} />
              ) : (
                <Avatar
                  className="avatar-icon"
                  size={80}
                  icon={<i className="material-icons">location_city</i>}
                />
              )}

              {props.parentInfo.title ? (
                <div className="title-hidden">
                  <h5 className="hidden-text">Empresa</h5>
                </div>
              ) : null}
              {props.parentInfo.name ? (
                <div className="title-hidden">
                  <h5 className="hidden-text">Empresa</h5>
                </div>
              ) : null}
            </>
          </Can>
          <Can I="view" a="JOBS">
            <>
              {props.parentInfo.avatar ? (
                <Avatar size={80} src={props.parentInfo.avatar} />
              ) : (
                <Avatar
                  className="avatar-icon"
                  size={80}
                  icon={<i className="material-icons">location_city</i>}
                />
              )}

              {props.parentInfo.title ? (
                <div className="title">
                  <h5>{props.parentInfo.title}</h5>
                </div>
              ) : null}
              {props.parentInfo.name ? (
                <div className="title">
                  <h5>{props.parentInfo.name}</h5>
                </div>
              ) : null}
            </>
          </Can>
          {props.parentInfo.location ? (
            <p>{`${props.parentInfo.location.city}, ${props.parentInfo.location.country}`}</p>
          ) : null}
          {props.parentInfo.description ? <p>{props.parentInfo.description}</p> : null}
        </div>
      ) : null}
      <h3 className="umana-card__title">{props.title}</h3>
      {props.subtitle ? <p className="card-subtitle">{props.subtitle}</p> : null}

      {props.description ? <p className="umana-card__description">{props.description}</p> : null}
      {props.date ? (
        <div className="date">
          <i className="material-icons">access_time</i>
          <span> {props.date.type}</span>
          <Moment locale="es" format="D MMM YYYY">
            {props.date.date}
          </Moment>
        </div>
      ) : null}
      {props.link ? (
        props.dinamicLink ? (
          <Link href={`${props.link}[id]`} as={`${props.link}${props.dinamicLink}`}>
            <a className="umana-card__link">
              <i className="material-icons">arrow_forward</i>
            </a>
          </Link>
        ) : (
          <Link href={props.link} passHref>
            <a className="umana-card__link">
              <i className="material-icons">arrow_forward</i>
            </a>
          </Link>
        )
      ) : null}
    </div>
  );
};

export default Card;

/*
props que acepta 
--------------------
edit = link a la pagina de edit
favorite
save
title
description
link

 */
