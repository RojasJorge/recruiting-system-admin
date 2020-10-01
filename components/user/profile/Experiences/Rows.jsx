import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {MinusCircleOutlined, PlusOutlined, SaveOutlined, UserAddOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, DatePicker, Divider, Form, Input, InputNumber, notification, Select, Switch} from "antd";
import "cleave.js/dist/addons/cleave-phone.gt";
import {filter, isEmpty} from "lodash";
import xhr from "../../../../xhr";
import styled from "styled-components";
import {useStoreActions, useStoreState} from "easy-peasy";
import moment from "moment";


const {Item, List} = Form;
const {Option} = Select;
const {TextArea} = Input;

const Wrap = styled.fieldset`
	margin-bottom: 30px;
	padding: 24px;
	background-color: #f5f5f5;
`

const Experience = _ => {
	
	/** Global state */
	let {
		profile: {
			id,
			fields: {
				working
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	/** Local state */
	const [careers, addCareers] = useState([]);
	const [dependents, switchDependents] = useState(false)
	
	/** On form success*/
	const onFinish = fields => {
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					working: {
						experiences: fields.experiences
					}
				}
			}))
			.then(resp => {
				updateProfile({type: 'working', fields: Object.assign(working, {experiences: fields.experiences})})
				
				/** Send notification success */
				notify('success', 'Experiencia laboral.', 'Actualizado correctamente..')
			})
			.catch(err => notify('error', 'Error', 'Ha ocurrido un error, intenta de nuevo más tarde'))
	};
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
	/** Get collection */
	const getCareers = p => xhr()
		.get(`/career?page=1&offset=1000`)
		.then(resp => {
			
			addCareers(filter(resp.data.items, o => o.parent === null))
		})
		.catch(err => console.log(err));
	
	useEffect(() => {
		getCareers()
	}, []);
	
	const dateFormat = 'DD/MM/YYYY'
	
	const initialValues = _ => {
		if (working && working.experiences.length > 0) {
			working.experiences.map((row, index) => {
				row.dateInit = moment(row.dateInit)
				row.dateEnd = moment(row.dateEnd)
				return row
			})
			return working
		} else {
			return {
				experiences: []
			}
		}
	}
	
	return (
		<>
			<Form
				name="experiences"
				onFinish={onFinish}
				initialValues={initialValues()}
			>
				{
					working && working.experiences.length > 0
						? <div className="row">
							<div className="col-md-12">
								<h3 style={{fontWeight: 'bold'}}>{working.experiences.length} registros</h3>
							</div>
						</div>
						: <p>No hay registros</p>
				}
				<List name="experiences">
					{(fields, {add, remove}) => {
						return (
							<>
								{
									fields.map(field => (
										<Wrap key={field.key}>
											<div className="row align-items-center">
												<div className="col-md-11">
													<div className="row">
														<div className="col-md-12">
															<label htmlFor="jobTitle">Nombre del puesto</label>
															<Item
																name={[field.name, 'jobTitle']}
																fieldKey={[field.fieldKey, 'jobTitle']}
																rules={[{
																	required: true,
																	message: 'El campo título es requerido'
																}]}
															>
																<Input/>
															</Item>
														</div>
														<div className="col-md-12">
															<label htmlFor="area">Área:</label>
															<Item
																{...field}
																name={[field.name, 'area']}
																fieldKey={[field.fieldKey, 'area']}
																rules={[{required: true, message: "Especifíque un área."}]}
															>
																<Select
																	style={{width: '100%'}}
																	size="large"
																	placeholder="Seleccione">
																	{
																		!isEmpty(careers) && careers.map((career, index) => (
																			<Option key={index} value={career.id}>
																				{career.name}
																			</Option>
																		))
																	}
																</Select>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="company">Empresa:</label>
															<Item
																{...field}
																name={[field.name, 'company']}
																fieldKey={[field.fieldKey, 'company']}
																// rules={[{required: true, message: "Especifíque una empresa."}]}
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className="col-md-6">
															<label htmlFor="companyPhone">Teléfono de la empresa:</label>
															<Item
																{...field}
																name={[field.name, 'companyPhone']}
																fieldKey={[field.fieldKey, 'companyPhone']}
																// rules={[{required: true, message: "El campo teléfono es requerido"}]}
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className="col-md-12">
															<label htmlFor="specializationCompany">¿A qué se dedica la empresa?:</label>
															<Item
																{...field}
																name={[field.name, 'specializationCompany']}
																fieldKey={[field.fieldKey, 'specializationCompany']}
																// rules={[{required: true, message: "Este campo es requerido"}]}
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className="col-md-12">
															<label htmlFor="workingNow">Actualmente trabajo aquí:</label>
															<Item
																{...field}
																name={[field.name, 'workingNow']}
																fieldKey={[field.fieldKey, 'workingNow']}
																valuePropName="checked"
															>
																<Switch/>
															</Item>
														</div>
														<div className="col-md-4">
															<label htmlFor="dateInit">Fecha de inicio:</label>
															<Item
																{...field}
																name={[field.name, 'dateInit']}
																fieldKey={[field.fieldKey, 'dateInit']}
																// rules={[{required: true, message: "Especifíque una fecha de inicio"}]}
															>
																<DatePicker
																	size="large"
																	format={dateFormat}
																	style={{width: '100%'}}/>
															</Item>
														</div>
														<div className="col-md-4">
															<label htmlFor="dateEnd">Fecha final:</label>
															<Item
																{...field}
																name={[field.name, 'dateEnd']}
																fieldKey={[field.fieldKey, 'dateEnd']}
																// rules={[{required: true, message: "Especifíque una fecha final."}]}
															>
																<DatePicker
																	format={dateFormat}
																	size="large" style={{width: '100%'}}
																/>
															</Item>
														</div>
														<div className="col-md-12">
															<fieldset>
																<legend>Sueldo final</legend>
																<div className="row">
																	<div className="col-md-4">
																		<label htmlFor="currency">Moneda:</label>
																		<Item
																			{...field}
																			name={[field.name, 'currency']}
																			fieldKey={[field.fieldKey, 'currency']}
																		>
																			<Select size="large" placeholder="Seleccione">
																				<Option value="GTQ">Quetzal</Option>
																				<Option value="USD">Dólar</Option>
																			</Select>
																		</Item>
																	</div>
																	<div className="col-md-8">
																		<label htmlFor="amount">Monto:</label>
																		<Item
																			{...field}
																			name={[field.name, 'amount']}
																			fieldKey={[field.fieldKey, 'amount']}
																		>
																			<InputNumber style={{width: '100%'}} min={0} size="large"/>
																		</Item>
																	</div>
																</div>
															</fieldset>
														</div>
														<div className="col-md-12">
															<label htmlFor="why_resignation">¿Cuál fue el motivo de retiro?:</label>
															<Item
																{...field}
																name={[field.name, 'whyResignation']}
																fieldKey={[field.fieldKey, 'whyResignation']}
															>
																<TextArea autoSize={{minRows: 4, maxRows: 30}}/>
															</Item>
														</div>
														<Divider orientation="left">Otros</Divider>
														<div className="col-md-12">
															<p>Esta información no se verá en tu perfil, pero la podrán ver futuros reclutadores de
																plazas en las que
																apliques.</p>
														</div>
														<div className="col-md-12">
															<label htmlFor="dependents">¿Tuvo personas a cargo?</label>
															<Item
																{...field}
																name={[field.name, 'dependents']}
																fieldKey={[field.fieldKey, 'dependents']}
																valuePropName="checked"
															>
																<Switch onChange={e => switchDependents(e)}/>
															</Item>
														</div>
														
														{
															dependents && <div className="col-md-12">
																<Item
																	name={[field.name, 'totalDependents']}
																	fieldKey={[field.fieldKey, 'totalDependents']}
																>
																	<InputNumber min={0}/>
																</Item>
															</div>
														}
														
														<Divider orientation="left">Referencias Laborales</Divider>
														<div className="col-md-12">
															<p>Indica aquí información de tus jefes inmediatos en este puesto. Esta información no se
																verá en tu
																perfil, pero la podrán ver futuros reclutadores de plazas en las que apliques.</p>
														
														</div>
														
														<List name={[field.name, 'immediateBoss']}>
															{(bosses, {add: addBoss, remove: removeBoss}) => {
																return (
																	<>
																		{
																			bosses.map(boss => (
																				<fieldset key={boss.key} style={{
																					padding: '15px',
																					backgroundColor: '#e7e7e7',
																					marginBottom: 24
																				}}>
																					<div className="row align-items-center">
																						<div className="col-md-11">
																							<div className="row">
																								<div className="col-md-12">
																									<label htmlFor="name">Nombre</label>
																									<Item
																										name={[boss.name, 'name']}
																										fieldKey={[boss.fieldKey, 'name']}
																										rules={[{
																											required: true,
																											message: 'El nombre del jefe es requerido'
																										}]}
																									>
																										<Input/>
																									</Item>
																								</div>
																								<div className="col-md-6">
																									<label htmlFor="titleJob">Puesto</label>
																									<Item
																										name={[boss.name, 'titleJob']}
																										fieldKey={[boss.fieldKey, 'titleJob']}
																										rules={[{
																											required: true,
																											message: 'Puesto'
																										}]}
																									>
																										<Input/>
																									</Item>
																								</div>
																								<div className="col-md-6">
																									<label htmlFor="phone">Número de teléfono</label>
																									<Item
																										name={[boss.name, 'phone']}
																										fieldKey={[boss.fieldKey, 'phone']}
																										rules={[{
																											required: true,
																											message: 'El número de teléfono es requrerido'
																										}]}
																									>
																										<Input/>
																									</Item>
																								</div>
																							</div>
																						</div>
																						<div className="col">
																							<MinusCircleOutlined
																								onClick={() => {
																									removeBoss(boss.name);
																								}}
																							/>
																						</div>
																					</div>
																				</fieldset>
																			))
																		}
																		<Button
																			size="small"
																			onClick={() => {
																				addBoss();
																			}}
																			block
																		>
																			<UserAddOutlined/> Agregar jefe
																		</Button>
																	</>
																)
															}}
														</List>
													</div>
												</div>
												<div className="col" style={{textAlign: 'right'}}>
													<DeleteOutlined
														title="Eliminar registro"
														style={{
															fontSize: 22,
															color: 'red'
														}}
														onClick={() => {
															remove(field.name);
														}}
													/>
												</div>
											</div>
										</Wrap>
									))
								}
								
								<Button.Group>
									<Button
										type="dashed"
										size="large"
										onClick={() => {
											add();
										}}
										icon={<PlusOutlined/>}
									>
										Agregar experiencia laboral
									</Button>
									<Button
										icon={<SaveOutlined/>}
										type="dashed"
										htmlType="submit"
									>Guardar</Button>
								</Button.Group>
							
							</>
						)
					}}
				</List>
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
