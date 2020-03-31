import {useState} from "react";
import {useStoreActions} from "easy-peasy";
import {PlusCircleOutlined, EnterOutlined} from "@ant-design/icons";
import {Button, Divider, Affix} from "antd";
import {isEmpty} from "lodash";
import Course from "./Course";

const Courses = _ => {
	
	const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId);
	
	/** Counter id */
	const [id, setId] = useState(1);
	const [courses, addCourses] = useState([]);
	
	const o = {
		id,
		_id: makeRandomId(10),
		establishment: "",
		title: "",
		country: "",
		year: ""
	};
	
	return (
		<>
			<div className="row">
				<div className="col-md-12" style={{marginBottom: 24}}>
					<Divider orientation="left">Otros cursos</Divider>
					<Affix offsetTop={60}>
						<Button
							type="primary"
							onClick={() => {
								setId((id + 1));
								addCourses([...courses, o]);
							}}
							icon={<PlusCircleOutlined/>}>Agregar curso</Button>
					</Affix>
				</div>
				<div className="col-md-12">
					{
						!isEmpty(courses)
							? courses.map((course, index) => (
								<Course
									key={index}
									course={course}
									addCourses={addCourses}
									courses={courses}
									counter={(index + 1)}
								/>
							))
							: <p>No hay cursos agregados.</p>
					}
				</div>
				<div className="col-md-12">
					{/*<pre>{JSON.stringify(courses, false, 2)}</pre>*/}
				</div>
			</div>
		</>
	);
};

export default Courses;
