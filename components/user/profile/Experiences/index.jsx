import { useState } from 'react';
import { useStoreActions } from 'easy-peasy';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Affix } from 'antd';
import { isEmpty } from 'lodash';
import Experience from './Experience';
import Rows from './Rows';

const Experiences = ({ switchCurrent, current }) => {
  /** Local state */
  const [experiences, addExperiences] = useState([]);
  const [counter, setCounter] = useState(1);

  /** Global state */
  const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId);

  const o = {
    id: counter,
    _id: makeRandomId(10),
    area: '',
    company: '',
    company_phone: '',
    currency: 'GTQ',
    start_date: '',
    end_date: '',
    dependents: true,
    dependents_number: 0,
    inmediate_boss: [],
    job_title: '',
    profession: '',
    salary: 0,
    specialization: '',
    specialization_company: '',
    why_resignation: '',
    working_now: false,
  };

  return <Rows switchCurrent={switchCurrent} current={current} />;
};

export default Experiences;
