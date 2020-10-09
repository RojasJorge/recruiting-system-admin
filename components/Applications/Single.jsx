import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Sitebar } from '../../elements';
import Moment from 'react-moment';
import SingleProfile from '../user/single';
import Link from 'next/link';

const Single = ({ record }) => {
  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar theme="orange">
          <Link href="/admin/applications" passHref>
            <a>
              <i
                className="material-icons"
                style={{ fontSize: 28, color: 'rgba(52, 52, 52, 0.5)' }}
              >
                arrow_back
              </i>
            </a>
          </Link>
          <h2>{record.company.name}</h2>
          <p>{record.job.title}</p>
          <p className="date">
            <i className="material-icons">access_time</i>
            <span style={{ marginRight: 5 }}>Expira</span>{' '}
            <Moment locale="es" format="D MMMM YYYY">
              {record.job.expiration_date}
            </Moment>
          </p>
        </Sitebar>
      </div>
      <div className="umana-layout-cl__flex width-section bg-white">
        <SingleProfile data={record.candidate} />
      </div>
    </div>
  );
};

Single.propTypes = {
  record: PropTypes.object,
};

Single.defaultProps = {
  record: {},
};

export default Single;
