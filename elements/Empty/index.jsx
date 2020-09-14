import imgLogin from '../../images/empty.png';
import { Button } from 'antd';
import Link from 'next/link';

const EmptyElemet = props => {
  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small">
        <div className="umana-layout--content">
          <h2>No tienes ninguna plaza publicada</h2>
          <p>Publica una plaza para poder ver candidatos que se ajusten al perfil que necesitas.</p>
          <br />
          <Button size="small" type="green" icon={<i className="material-icons">add</i>}>
            <Link href={`jobs/add`}>
              <a>Agregar Plaza</a>
            </Link>
          </Button>
        </div>
      </div>
      <div className="umana-layout-cl__flex">
        <div className="umana-layout--img">
          <img src={imgLogin} alt="" />
        </div>
      </div>
    </div>
  );
};

export default EmptyElemet;
