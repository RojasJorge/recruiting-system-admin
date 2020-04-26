import Link from 'next/link';
import { RightCircleOutlined } from '@ant-design/icons';
import { Card, PageTitle } from '../../elements';

const Catalogs = _ => (
  <>
    <PageTitle title="Catalogos" />
    <div className="umana-list">
      <Card title="Niveles académicos" link="/admin/catalogs/academic-levels" />
      <Card title="Profesiones" link="/admin/catalogs/professions" />
    </div>
  </>
);

export default Catalogs;
