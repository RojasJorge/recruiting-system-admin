import {useEffect, useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {PlusCircleOutlined, EnterOutlined} from "@ant-design/icons";
import {Button, Alert, Affix, notification} from "antd";
import {isEmpty} from "lodash";
import Level from "./Level";
import Courses from "../Courses";
import xhr from "../../../../xhr";
import router from "next/router";

const AcademicLevels = _ => {
	
	/** Global state */
	const {
		profile: {
			id: ID,
			fields: {
				academic
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId);
	
	const [levels, addLevels] = useState(academic.studies);
	const [careers, addCareers] = useState([]);
	const [academicLevels, addAcademicLevels] = useState([]);
	
	/** Counter id */
	const [id, setId] = useState(1);
	
	/** Get collection */
	const getCareers = p => xhr()
		.get(`/career?page=1&offset=1000`)
		.then(resp => addCareers(resp.data.items))
		.catch(err => console.log(err));
	
	const getAcademicLevels = p => xhr()
		.get(`/academic-level?page=1&offset=1000`)
		.then(resp => addAcademicLevels(resp.data.items))
		.catch(err => console.log(err));
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
	const onSave = _ => {
		let merged = Object.assign(academic.studies, levels)
		
		// console.log('Merged academic levels:', merged)
		// return false
		
		xhr()
			.put(`/profile/${ID}`, JSON.stringify({
				fields: {
					academic
				}
			}))
			.then(resp => {
				updateProfile({type: 'academic', academic})
				
				/** Send notification success */
				notify('success', 'Ficha Niveles academicos (Estudios) actualizada.', 'Vamos al siguiente paso...')
				// switchCurrent((current + 1))
				// router.push(`${router.router.pathname}?current=${(current + 1)}`)
			})
			.catch(err => console.log('Error:', err))
	}
	
	useEffect(() => {
		getCareers()
		getAcademicLevels()
	}, []);
	
	
	const o = {
		id,
		_id: makeRandomId(10),
		establishment: "",
		academic_level: "",
		specialization: "",
		start_date: "",
		end_date: "",
		collegiate: "",
		currently: false
	};
	
	return (
		<>
			<div className="row" id="levelsContainer">
				<div className="col-md-12">
					<Alert
						message="Por cada formulario"
						description={<div>Completalo y presiona Enter <EnterOutlined/></div>}
						style={{marginBottom: 24}}
						type="info"
						banner
					/>
				</div>
				<div className="col-md-12" style={{marginBottom: 24}}>
					<Affix offsetTop={10}>
						<Button
							type="primary"
							size="large"
							onClick={() => {
								setId((id + 1));
								addLevels([...levels, o])
							}}
							icon={<PlusCircleOutlined/>}>Agregar nivel académico</Button>
					</Affix>
				</div>
				<div className="col-md-12">
					{
						!isEmpty(levels)
							? levels.map((level, index) => (
								<Level
									academicLevels={academicLevels}
									careers={careers}
									key={index}
									level={level}
									addLevels={addLevels}
									levels={levels}
									counter={(index + 1)}
								/>
							))
							: <p>No hay niveles agregados.</p>
					}
				</div>
				<div className="col-md-12">
					<Button
						type="dashed"
						size="large"
						onClick={() => onSave()}
						block>Guardar los niveles académicos
					</Button>
				</div>
				<div className="col-md-12">
					
					<pre>{JSON.stringify(levels, false, 2)}</pre>
					<Courses />
				</div>
			</div>
		</>
	);
};

export default AcademicLevels;
