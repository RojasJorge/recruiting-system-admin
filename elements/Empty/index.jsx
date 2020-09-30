import imgLogin from '../../images/empty.png';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { isEmpty } from 'lodash';

const EmptyElemet = props => {
  return (
    <div className={`umana-layout-cl theme-${props.type ? props.type : 'blue'}`}>
      <div className="umana-layout-cl__small">
        {!isEmpty(props.data) ? (
          <div className="umana-layout--content">
            <h2>{props.data.title}</h2>
            <p>{props.data.content}</p>
            <br />
            {props.data.url ? (
              <Button size="small" type={props.type ? props.type : 'blue'}>
                {props.data.id ? (
                  <Link href={`${props.data.url}[id]`} as={`${props.data.url}${props.data.id}`}>
                    <a>{props.data.buttonTitle}</a>
                  </Link>
                ) : (
                  <Link href={props.data.url}>
                    <a>{props.data.buttonTitle}</a>
                  </Link>
                )}
              </Button>
            ) : null}
          </div>
        ) : (
          <div className="umana-layout--content">
            <h2>No tienes ninguna plaza publicada</h2>
            <p>Publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.</p>
            <br />

            <Button size="small" type="blue" icon={<i className="material-icons">add</i>}>
              <Link href={`jobs/add`}>
                <a>Agregar Plaza</a>
              </Link>
            </Button>
          </div>
        )}
      </div>
      <div className="umana-layout-cl__flex">
        <div className="umana-layout--img">{!isEmpty(props.data) && props.data.img ? <img src={props.data.img} alt="" /> : <img src={imgLogin} alt="" />}</div>
      </div>
    </div>
  );
};

EmptyElemet.propTypes = {
  data: PropTypes.object,
};

EmptyElemet.defaultProps = {
  data: {},
};

export default EmptyElemet;
