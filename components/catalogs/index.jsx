import Link from "next/link";
import { Icon } from "antd";

const Catalogs = () => (
  <div className="row no-gutters">
    <div className="col-md-12">
      <ul className="no-bullets row">
        <li className="col">
          <div className="box box--standard box--centered">
            <Link href="/admin/catalogs/academic-levels" passHref>
              <a>
                <span>Niveles académicos</span>
                <Icon type="right-circle" style={{ fontSize: 60 }} />
              </a>
            </Link>
          </div>
        </li>
        <li className="col">
          <div className="box box--standard box--centered">
            <Link href="/admin/catalogs/professions" passHref>
              <a>
                <span>Profesiones</span>
                <Icon type="right-circle" style={{ fontSize: 60 }} />
              </a>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

export default Catalogs;
