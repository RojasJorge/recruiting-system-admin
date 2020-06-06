import Link from 'next/link';

const Card = props => {
  return (
    <div className="umana-card">
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
      <h1 className="umana-card__title">{props.title}</h1>
      {props.description ? <p className="umana-card__description">{props.description}</p> : null}
      <Link href={props.link} passHref>
        <a className="umana-card__link">
          <i className="material-icons">arrow_forward</i>
        </a>
      </Link>
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
