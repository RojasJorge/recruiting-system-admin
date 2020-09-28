import Link from 'next/link';
import img1 from '../../images/asset1.png';
import img2 from '../../images/asset2.png';

const Welcome = () => {
  return (
    <div className="umana">
      <div className="umana-welcome">
        <div className="umana-welcome__content">
          <h1>
            Bienvenido(a) <br />a Umana
          </h1>
          <p>
            Umana es una plataforma que conecta el talento ideal con las oportunidades adecuadas.
          </p>
        </div>
        <div className="umana-welcome__cards">
          <div className="umana-welcome-card">
            <Link href="/conoce-mas/talentos" passHref>
              <a className="umana-welcome-card--img overflow">
                <img src={img1} alt="image" />
              </a>
            </Link>
            <Link href="/conoce-mas/talentos" passHref>
              <a className="umana-welcome-card--content card-candidate">
                <h4>Encuentra trabajo</h4>
                <p>
                  Crea tu perfil y aplica a las oportunidades que se ajusten perfectamente a tus
                  capacidades.
                </p>
                <span>Leer más</span>
              </a>
            </Link>
          </div>

          <div className="umana-welcome-card">
            <Link href="/conoce-mas/empresas" passHref>
              <a className="umana-welcome-card--img">
                <img src={img2} alt="image" />
              </a>
            </Link>
            <Link href="/conoce-mas/empresas" passHref>
              <a className="umana-welcome-card--content card-company">
                <h4>Descubre talento</h4>
                <p>
                  Optimiza tu proceso de reclutamiento y encuentra al candidato ideal para tus
                  puestos disponibles más rapido.
                </p>
                <span>Leer más</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
