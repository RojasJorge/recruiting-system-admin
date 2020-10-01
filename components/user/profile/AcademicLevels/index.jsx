import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { CheckOutlined, FileDoneOutlined, FileSearchOutlined } from '@ant-design/icons';
import { notification, Tabs } from 'antd';
import Courses from '../Courses';
import xhr from '../../../../xhr';
import Rows from './Rows';

const { TabPane } = Tabs;

const AcademicLevels = _ => {
  /** Global state */
  const {
    profile: {
      id: ID,
      fields: { academic },
    },
  } = useStoreState(state => state.auth.user);

  const updateProfile = useStoreActions(actions => actions.auth.updateProfile);

  // const [levels, addLevels] = useState(academic.studies);
  const [careers, addCareers] = useState([]);
  const [academicLevels, addAcademicLevels] = useState([]);

  /** Get collection */
  const getCareers = p =>
    xhr()
      .get(`/career?page=1&offset=1000`)
      .then(resp => addCareers(resp.data.items))
      .catch(err => console.log(err));

  const getAcademicLevels = p =>
    xhr()
      .get(`/academic-level?page=1&offset=1000`)
      .then(resp => addAcademicLevels(resp.data.items))
      .catch(err => console.log(err));

  useEffect(() => {
    getCareers();
    getAcademicLevels();
  }, []);

  return (
    <>
      <div className="row" id="levelsContainer">
        <Tabs type="card" className="col-md-12">
          <TabPane
            tab={
              <span>
                <FileDoneOutlined /> Niveles Académicos
              </span>
            }
            key={1}
          >
            <Rows academicLevels={academicLevels} careers={careers} />
          </TabPane>
          <TabPane
            tab={
              <span>
                <FileSearchOutlined /> Otros cursos
              </span>
            }
            key={2}
          >
            <Courses />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default AcademicLevels;
