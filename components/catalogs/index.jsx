import { Card } from '../../elements';

const Catalogs = _ => (
  <div className="umana-list">
    <Card title="Niveles académicos" link="/admin/catalogs/academic-level" />
    <Card title="Profesiones" link="/admin/catalogs/professions" />
  </div>
);

export default Catalogs;
