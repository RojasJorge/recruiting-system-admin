import { Card } from 'antd'

const Catalogs = _ => (
  <div className="umana-list">
    <Card title="Niveles académicos" link="/admin/catalogs/academic-levels" />
    <Card title="Profesiones" link="/admin/catalogs/professions" />
  </div>
)

export default Catalogs
