import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { Sitebar } from '../../elements';
import Moment from 'react-moment';
import SingleProfile from '../user/single';

const Single = ({ record }) => {
  const header = {
    title: record.company.name,
    subtitle: record.job.title,
  };

  return (
    <div className="umana-layout-cl">
      <div className="umana-layout-cl__small ">
        <Sitebar header={header} theme="orange">
          <p className="date">
            <i className="material-icons">access_time</i>
            {record.job.expiration_date}
          </p>
        </Sitebar>
      </div>
      <div className="umana-layout-cl__flex width-section bg-white">
        <SingleProfile data={record.candidate} />
        {/* <pre>{JSON.stringify(record.candidate, false, 2)}</pre> */}
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
