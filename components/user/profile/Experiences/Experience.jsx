import {useState} from "react";
import {useStoreActions} from "easy-peasy";
import PropTypes from "prop-types";
import {DeleteOutlined, EnterOutlined, PlusCircleOutlined, PlusOutlined, MinusCircleOutlined} from "@ant-design/icons";
import {Alert, Button, DatePicker, Divider, Form, Input, InputNumber, Select, Switch} from "antd";
import "cleave.js/dist/addons/cleave-phone.gt";
import Cleave from "cleave.js/react";
import {filter, isEmpty} from "lodash";
import Boss from "./Boss";

const {Item} = Form;
const {Option} = Select;
const {TextArea} = Input;

const Experience = ({count, experience, experiences, addExperiences}) => {
	
	/** Local state */
	const [bosses, addBosses] = useState([]);
	const [counter, addCounter] = useState(1);
	const [_experience, setExperience] = useState(experience);
	
	/** Global state */
	const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId);
	
	/** On form success*/
	const onFinish = fields => {
		console.log('onFinish Experiences:', fields)
	};
	
	return (
		<>
			{/*<pre>{JSON.stringify(_experience, false, 2)}</pre>*/}
			<Form name="experiences" onFinish={onFinish} style={{marginTop: 24}}>
				<fieldset>
					<legend><Button shape="circle">{count}</Button> <small>{_experience._id}</small></legend>
					<div className="row">
						<div className="col-md-12" style={{textAlign: "right"}}>
							<Button
								type="link"
								icon={<DeleteOutlined/>}
								onClick={() => {
									// console.log(`id: ${_experience.id} - _id: ${_experience._id} - count: ${count}`)
									addExperiences(filter(experiences, o => {
										return o.id !== _experience.id || o._id !== _experience._id;
									}));
								}}
							/>
						</div>
						<div className="col-md-4">
							<label htmlFor="area">Área:</label>
							<Item
								name="area"
								rules={[{required: true, message: "Especifíque un área."}]}
							>
								<Select
									style={{width: '100%'}}
									size="large"
									placeholder="Seleccione">
								
								</Select>
							</Item>
						</div>
						<div className="col-md-4">
							<label htmlFor="area">Profesión:</label>
							<Item
								name="profession"
								rules={[{required: true, message: "Especifíque una profesión."}]}
							>
								<Select
									style={{width: '100%'}}
									size="large"
									placeholder="Seleccione">
								
								</Select>
							</Item>
						</div>
						<div className="col-md-4">
							<label htmlFor="specialization">Especialización:</label>
							<Item
								name="specialization"
								rules={[{required: true, message: "Especifíque una especialización."}]}
							>
								<Select
									style={{width: '100%'}}
									size="large"
									placeholder="Seleccione">
								
								</Select>
							</Item>
						</div>
						<div className="col-md-6">
							<label htmlFor="company">Empresa:</label>
							<Item
								name="company"
								rules={[{required: true, message: "Especifíque una empresa."}]}
							>
								<Input size="large"/>
							</Item>
						</div>
						<div className="col-md-6">
							<label htmlFor="company_phone">Teléfono de la empresa:</label>
							<Item
								name="company_phone"
								rules={[{required: true, message: "El campo teléfono es requerido"}]}
							>
								<Cleave
									className="ant-input ant-input-lg"
									options={{
										phone: true,
										phoneRegionCode: "GT"
									}}
									// name="company_phone"
									// onChange={e => console.log(e.target.value)}
								/>
							</Item>
						</div>
						<div className="col-md-12">
							<label htmlFor="specialization_company">¿A qué se dedica la empresa?:</label>
							<Item
								name="specialization_company"
								rules={[{required: true, message: "Este campo es requerido"}]}
							>
								<Input size="large"/>
							</Item>
						</div>
						<div className="col-md-12">
							<label htmlFor="specialization_company">Actualmente trabajo aquí:</label>
							<Item name="workingNow">
								<Switch name="workingNow" checked={_experience.working_now}/>
							</Item>
						</div>
						<div className="col-md-4">
							<label htmlFor="start_date">Fecha de inicio:</label>
							<Item
								name="start_date"
								rules={[{required: true, message: "Especifíque una fecha de inicio"}]}
							>
								<DatePicker size="large" style={{width: '100%'}}/>
							</Item>
						</div>
						<div className="col-md-4">
							<label htmlFor="end_date">Fecha final:</label>
							<Item
								name="end_date"
								rules={[{required: true, message: "Especifíque una fecha final."}]}
							>
								<DatePicker size="large" style={{width: '100%'}}/>
							</Item>
						</div>
						<div className="col-md-4">
							<label htmlFor="total_experience">Tiempo de experiencia:</label>
							<Item name="total_experience">
								<InputNumber
									size="large"
									style={{width: '100%'}}
									min={0}
								/>
							</Item>
						</div>
						<div className="col-md-12">
							<fieldset>
								<legend>Sueldo final</legend>
								<div className="row">
									<div className="col-md-4">
										<label htmlFor="currency">Moneda:</label>
										<Item name="currency">
											<Select size="large" placeholder="Seleccione">
											
											</Select>
										</Item>
									</div>
									<div className="col-md-8">
										<label htmlFor="amount">Monto:</label>
										<Item name="amount">
											<InputNumber style={{width: '100%'}} min={0} size="large"/>
										</Item>
									</div>
								</div>
							</fieldset>
						</div>
						<div className="col-md-12">
							<label htmlFor="why_resignation">¿Cuál fue el motivo de retiro?:</label>
							<Item name="why_resignation">
								<TextArea autoSize={{minRows: 4, maxRows: 30}}/>
							</Item>
						</div>
						<Divider orientation="left">Otros</Divider>
						<div className="col-md-12">
							<p>Esta información no se verá en tu perfil, pero la podrán ver futuros reclutadores de plazas en las que
								apliques.</p>
						</div>
						<div className="col-md-12">
							<label htmlFor="dependents">¿Tuvo personas a cargo?</label>
							<Item name="dependents">
								<Switch checked={_experience.dependents}/>
							</Item>
						</div>
						{
							_experience.dependents
								? <div className="col-md-12">
									<div className="row">
										<div className="col-md-6">
											<label htmlFor="dependents_number">¿Cuántas personas?:</label>
											<Item
												name="dependents_number"
												rules={[{
													required: _experience.dependents,
													message: "Debe especificar cuantas personas tuvo a su cargo."
												}]}
											>
												<InputNumber size="large" style={{width: '100%'}} min={1}/>
											</Item>
										</div>
									</div>
								</div>
								: null
						}
						
						<Divider orientation="left">Referencias Laborales</Divider>
						<div className="col-md-12">
							<p>Indica aquí información de tus jefes inmediatos en este puesto. Esta información no se verá en tu
								perfil, pero la podrán ver futuros reclutadores de plazas en las que apliques.</p>
							
							<p style={{textAlign: "right"}}>
								<Button
									icon={<PlusCircleOutlined/>}
									onClick={() => {
										addCounter((counter + 1));
										addBosses([...bosses, {
											id: counter,
											_id: makeRandomId(10),
											name: "",
											title: "",
											phone: ""
										}]);
									}}
								>Agregar jefe inmediato</Button>
							</p>
						
						</div>
						
						{
							!isEmpty(bosses)
								? <div className="col-md-11 offset-md-1">
									{
										bosses.map((boss, i) => (
											<Boss
												key={i}
												bosses={bosses}
												addBosses={addBosses}
												boss={boss}
												counter={(i + 1)}
												_experience={_experience}
												setExperience={setExperience}
											/>
										))
									}
								</div>
								: <div className="col-md-12">
									<Alert message="No hay jefes inmediatos registrados." type="info" banner/>
								</div>
						}
					
					</div>
					<Divider></Divider>
					<Button
						size="large"
						htmlType="submit"
						icon={<EnterOutlined/>}>Confirmar</Button>
				</fieldset>
			</Form>
		</>
	);
};

Experience.propTypes = {
	experiences: PropTypes.array,
	addExperiences: PropTypes.func
};

Experience.defaultProps = {
	experiences: [],
	addExperiences: () => {
	}
};

export default Experience;
