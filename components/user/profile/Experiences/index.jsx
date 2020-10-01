import {useState} from "react";
import {useStoreActions} from "easy-peasy";
import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Affix} from "antd";
import {isEmpty} from "lodash";
import Experience from "./Experience";
import Rows from './Rows'

const Experiences = _ => {
	
	/** Local state */
	const [experiences, addExperiences] = useState([]);
	const [counter, setCounter] = useState(1);
	
	/** Global state */
	const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId);
	
	const o = {
		id: counter,
		_id: makeRandomId(10),
		area: "",
		company: "",
		company_phone: "",
		currency: "GTQ",
		start_date: "",
		end_date: "",
		dependents: true,
		dependents_number: 0,
		inmediate_boss: [],
		job_title: "",
		profession: "",
		salary: 0,
		specialization: "",
		specialization_company: "",
		why_resignation: "",
		working_now: false
	};
	
	return (
		<>
			<div className="row">
				<div className="col-md-12">
					<h2>Experiencia laboral</h2>
				</div>
				{/*<div className="col-md-12">*/}
				{/*	<Affix offsetTop={10}>*/}
				{/*		<Button*/}
				{/*			type="primary"*/}
				{/*			size="large"*/}
				{/*			icon={<PlusCircleOutlined/>}*/}
				{/*			onClick={() => {*/}
				{/*				setCounter((counter + 1));*/}
				{/*				addExperiences([...experiences, o]);*/}
				{/*			}}>Agregar experiencia</Button>*/}
				{/*	</Affix>*/}
				{/*</div>*/}
				
				<div className="col-md-12">
					<Rows/>
				</div>
				
				{/*<div className="col-md-12">*/}
				{/*	{*/}
				{/*		!isEmpty(experiences)*/}
				{/*			? experiences.map((experience, i) => (*/}
				{/*				<Experience*/}
				{/*					key={(i + 1)}*/}
				{/*					experiences={experiences}*/}
				{/*					addExperiences={addExperiences}*/}
				{/*					experience={experience}*/}
				{/*					count={(i + 1)}*/}
				{/*				/>*/}
				{/*			))*/}
				{/*			: <p>No hay registros</p>*/}
				{/*	}*/}
				{/*</div>*/}
				
				{/*<div className="col-md-12">*/}
				{/*	<pre>{JSON.stringify(experiences, false, 2)}</pre>*/}
				{/*</div>*/}
			</div>
		</>
	);
};

export default Experiences;
