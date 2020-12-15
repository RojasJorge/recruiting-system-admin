import { useState } from 'react';
import PropTypes from 'prop-types';
import { DeleteOutlined, EnterOutlined } from '@ant-design/icons';
import { Form, Input, DatePicker, Button } from 'antd';
import { filter, remove } from 'lodash';

const { Item } = Form;

const Course = ({ course, counter, addCourses, courses }) => {
  /** Current default level */
  const [_course, _setCourse] = useState(course);

  const onChange = e => _setCourse({ ..._course, [e.target.name]: e.target.value });

  const onDatePickerChange = (date, dateString) => _setCourse({ ..._course, year: date.toString() });

  const onFinish = data => {
    remove(courses, o => o.id === course.id);
    addCourses([...courses, _course]);
  };

  return (
    <>
      <Form onFinish={onFinish} validateTrigger="onBlur" scrollToFirstError={true}>
        <fieldset>
          <legend>
            <Button shape="circle">{counter}</Button>{' '}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => {
                const rm = filter(courses, o => o.id !== course.id);
                addCourses(rm);
              }}
              type="link"
            />{' '}
            <small style={{ color: '#c7c7c7' }}>{course._id}</small>
          </legend>
          <div className="row">
            <div className="col-md-12">
              <label htmlFor="establishment">Establecimiento:</label>
              <Item name="establishment" rules={[{ required: true, message: 'Establecimiento es requerido.' }]}>
                <Input name="establishment" value={_course.establishment} onChange={onChange} />
              </Item>
            </div>
            <div className="col-md-12">
              <label htmlFor="collegiate">Título:</label>
              <Item name="title" rules={[{ required: true, message: 'Título del curso es requerido.' }]}>
                <Input onChange={onChange} name="title" value={_course.title} />
              </Item>
            </div>
            <div className="col-md-6">
              <label htmlFor="country">País:</label>
              <Item name="country" rules={[{ required: true, message: 'País es requerido.' }]}>
                <Input onChange={onChange} name="country" value={_course.country} />
              </Item>
            </div>
            <div className="col-md-6">
              <label htmlFor="year">Año:</label>
              <Item name="year" rules={[{ required: true, message: 'Año es requerido' }]}>
                <DatePicker allowClear={false} picker="year" value={_course.year.toString()} style={{ width: '100%' }} size="large" onChange={onDatePickerChange} />
              </Item>
            </div>
          </div>
          <Button htmlType="submit" icon={<EnterOutlined />}>
            Confirmar agregar
          </Button>
        </fieldset>
      </Form>
    </>
  );
};

Course.propTypes = {
  course: PropTypes.object,
  courses: PropTypes.array,
  counter: PropTypes.number,
};

Course.defaultProps = {
  course: {},
  courses: [],
  counter: 0,
};

export default Course;
