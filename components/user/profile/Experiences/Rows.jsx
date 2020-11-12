import {useEffect, useState, useRef, createRef } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import {Button, DatePicker, Divider, Form, Input, InputNumber, notification, Select, Switch} from "antd";
import "cleave.js/dist/addons/cleave-phone.gt";
import {filter, isEmpty} from "lodash";
import xhr from "../../../../xhr";
import {useStoreActions, useStoreState} from "easy-peasy";
import moment from "moment";
import router from 'next/router';
import  { AreaJob } from '../../../../elements';

const {Item, List} = Form;
const {Option} = Select;
const {TextArea} = Input;


const scrollToMyRef = ref => {
	if(ref === null && ref.current === null) {
		window.scroll({
			top: -80,
			behavior: 'smooth',
		});

	}
	if(ref && ref !== null && ref.current !== null) {
		const newref = ref.current + ref.current
		ref.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	} 
}



const Experience = ({switchCurrent, current}) => {	
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
	const [wnow, setWorking] = useState(working.experiences && working.experiences.length > 0 ? working.experiences[0].workingNow : false)
	
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
				window.scroll({
					top: 80,
					behavior: 'smooth',
				});
				/** Send notification success */
				notify('success', 'Experiencia laboral.', 'Actualizado correctamente..')
				
				router.push(`${router.router.pathname}?current=${parseInt(router.router.query.current, 10) + 1}`);
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
	const getCareers = p => {
		xhr()
			.get(`/career?page=1&offset=1000`)
			.then(resp => {
				
				addCareers(filter(resp.data.items, o => o.parent === null));
				// router.push(`${router.router.pathname}?current=${current + 1}`);
			})
			.catch(err => console.log(err));
	}
	
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

	const myRef = useRef(null);

	const scrollTopToELement = () =>  scrollToMyRef(myRef)
	

	return (
		<>
			<Form
				name="experiences"
				onFinish={onFinish}
				initialValues={initialValues()}
				validateTrigger="onBlur"
				scrollToFirstError={true}
			>
	
				 <div className="umana-form--section">
          <h2>Experiencia laboral</h2>
				<List name="experiences">
					{(fields, {add, remove}) => {
						return (
							<>
								{
									fields.map(field => (
										<fieldset key={field.key} id={field.key} >
											<div className="row align-items-center" style={{marginTop: 20}} id={field.key} >
									
												<div className="col-md-12">
											
													<div className="row">
														<div className="col-md-12" style={{display: 'flex'}} >
																{field.key > 0 ? 
																		<h3 style={{fontWeight: 'bold'}}>{field.key} registros</h3>	
																	:  null	}
																	<a
																		style={{textAlign: 'right', marginLeft: 'auto'}}
																		key={field.key + 'add'}
																		className="form-item--delete"
																		onClick={() => {
																			remove(field.name);
																		}}
																	>
																		<i className="material-icons">cancel</i>
																	</a>
																	
														
														</div>
														<div className="col-md-12">
															<Item
																label="Nombre del puesto"
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
															<Item
																label="Área"
																{...field}
																name={[field.name, 'area']}
																fieldKey={[field.fieldKey, 'area']}
																rules={[{required: true, message: "Especifíque un área."}]}
															>
																<AreaJob />
															</Item>
														</div>
														<div className="col-md-12">
															<br />
															<h3>Información de la empresa</h3>
														</div>
														<div className="col-md-6">
															<Item
																label="Empresa"
																{...field}
																name={[field.name, 'company']}
																fieldKey={[field.fieldKey, 'company']}
																rules={[{required: true, message: "El campo teléfono es requerido"}]}
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className="col-md-6">
															<Item
																label="Teléfono de la empresa"
																{...field}
																name={[field.name, 'companyPhone']}
																fieldKey={[field.fieldKey, 'companyPhone']}
																// rules={[{required: true, message: "El campo teléfono es requerido"}]}
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className="col-md-12" id={field.key} ref={myRef}>
															<Item
																label="¿A qué se dedica la empresa?"
																{...field}
																name={[field.name, 'specializationCompany']}
																fieldKey={[field.fieldKey, 'specializationCompany']}
															
															>
																<Input size="large"/>
															</Item>
														</div>
														<div className={`${field.key}-fied col-md-12`} style={{display: 'flex', marginTop: 15 }} >
															<label style={{width: '100%', }} htmlFor="workingNow">Actualmente trabajo aquí:</label>
															<Item
																style={{marginLeft: 'auto', width: 'auto'}}
																{...field}
																name={[field.name, 'workingNow']}
																fieldKey={[field.fieldKey, 'workingNow']}
																valuePropName="checked"
																rules={[{required: true, message: "El campo teléfono es requerido"}]}
															>
																
																<Switch onChange={e => setWorking(e)} checkedChildren="SI" unCheckedChildren="NO"/>
															</Item>
														</div>
														<div className="col-md-6">
															<Item
																label="Fecha de inicio"
																{...field}
																name={[field.name, 'dateInit']}
																fieldKey={[field.fieldKey, 'dateInit']}
																rules={[{required: true, message: "El campo teléfono es requerido"}]}
															>
																<DatePicker
																	size="large"
																	format={dateFormat}
																	style={{width: '100%'}}/>
															</Item>
														</div>
														<div className="col-md-6">
														{!wnow ? 
															<Item
															label="Fecha final"
														
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
															: <Item label="Fecha final">
																<Input value="Presente" disabled={true} />
															</Item> }
													
														</div>
														
														<div className="col-md-12" style={{ marginTop: 15 }}>
															<fieldset>
																<h3>Sueldo final</h3>
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
														{!wnow ? 
														<div className="col-md-12">
															<Item
																label="¿Cuál fue el motivo de retiro?"
																{...field}
																name={[field.name, 'whyResignation']}
																fieldKey={[field.fieldKey, 'whyResignation']}
															>
																<TextArea autoSize={{minRows: 4, maxRows: 30}}/>
															</Item>
														</div>
															: null}
														<div className="col-md-12" style={{ marginTop: 15 }} >
															<h3 orientation="left" >Otros</h3>
															<p>Esta información no se verá en tu perfil, pero la podrán ver futuros reclutadores de
																plazas en las que
																apliques.</p>
														</div>
														<div className="col-md-12" style={{display: 'flex' }}>
															<label htmlFor="dependents" style={{width: '100%' }}>¿Tuvo personas a cargo?</label>
															<Item
																style={{marginLeft: 'auto', width: 'auto'}}
																{...field}
																name={[field.name, 'dependents']}
																fieldKey={[field.fieldKey, 'dependents']}
																valuePropName="checked"
															>
																<Switch onChange={e => switchDependents(e)} checkedChildren="SI" unCheckedChildren="NO"/>
															</Item>
														</div>
														{	dependents && <div className="col-md-12">
																<Item
																	name={[field.name, 'totalDependents']}
																	fieldKey={[field.fieldKey, 'totalDependents']}
																>
																	<InputNumber min={0}/>
																</Item>
															</div>
														}
														<div className="col-md-12" style={{ marginTop: 15}}  >
															<h3>Referencias Laborales</h3>
															<p>Indica aquí información de tus jefes inmediatos en este puesto. Esta información no se
																verá en tu
																perfil, pero la podrán ver futuros reclutadores de plazas en las que apliques.</p>
														</div>														
														<div className="col-md-12" style={{	border: '1px solid #f1f1f1'}}>
														<List name={[field.name, 'immediateBoss']} >
															{(bosses, {add: addBoss, remove: removeBoss}) => {
																return (
																	<>
																		{
																			bosses.map(boss => (
																				<fieldset key={boss.key} style={{
																					padding: '10px 5px 20px',
																					borderBottom: '1px solid #f1f1f1'
																				}}>
																					<div className="row align-items-center">
																						<div className="col-md-11">
																							<div className="row">
																								<div className="col-md-12">
																									<Item
																										label="Nombre"
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
																									<Item
																										label="Puesto"
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
																									<Item
																										label="Número de teléfono"
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
																						<a
																								key={field.key + 'add'}
																								className="form-item--delete"
																								onClick={() => {
																									removeBoss(boss.name);
																								}}
																							>
																								<i className="material-icons">cancel</i>
																							</a>
																						</div>
																					</div>
																				</fieldset>
																			))
																		}
																			<div className="col-md-6" style={{margin: '0 auto'}}>
																		<Button
																				style={{ width: '100%' }}
																				type="dashed"
																				size="large"
																				onClick={() => {
																					addBoss();
																				}}
																				block
																			>
																				<i className="material-icons">add</i> Agregar jefe inmediato
                    								</Button>
																			</div>
																	</>
																)
															}}
														</List>
													
														</div>
													</div>
												</div>
													
											</div>
								
										</fieldset>
									))
								}
								
								<Item>
									<Button
										type="dashed"
										size="large"
										style={{width: '100%'}}
										onClick={() => {
											add();
											scrollTopToELement()
										}}
										icon={<PlusOutlined/>}
									>
										Agregar experiencia laboral
									</Button>
									
								</Item>
							
							</>
						)
					}}
				</List>
				</div>
				<Item>
					<Button
						style={{marginLeft: 'auto'}}
						type="orange"
						size="small"
						htmlType="submit"
					>Guardar y continuar</Button>
				</Item>
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
