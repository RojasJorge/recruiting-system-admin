import Link from 'next/link';
import { Button } from 'antd';

const PageTitle = props => {
  return (
    <div className={`umana-page-title ${!props.back ? 'simple-title' : 'full-title'}`}>
      {props.back ? (
        <Link href={props.back} passHref>
          <a>
            <i className="material-icons">chevron_left</i>
          </a>
        </Link>
      ) : null}
      <h1>{props.title}</h1>
      {props.edit ? (
        <Link href={props.edit} passHref>
          <a className="edit">
            <i className="material-icons">edit</i>
          </a>
        </Link>
      ) : null}
    </div>
  );
};

export default PageTitle;
