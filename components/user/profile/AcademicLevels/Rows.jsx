import PropTypes from 'prop-types';
import {Button, Checkbox, DatePicker, Form, Input, notification, Select, Space, Switch} from 'antd';
import {delay, filter, find, isEmpty} from 'lodash';
import {useEffect, useState} from 'react';
import {useStoreActions, useStoreState} from 'easy-peasy';
import xhr from '../../../../xhr';
import moment from 'moment';
import router from 'next/router';
import FormOverlay from "../../../Misc/FormOverlay";

const {Item, List} = Form;
const {Option} = Select;

const Level = _ => {
	
	/** Global state */
	let {
		profile: {
			id,
			fields: {
				academic
			},
		},
	} = useStoreState(state => state.auth.user)
	
	const [status, switchStatus] = useState('')
	
	/** Update current object action */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	/** Get catalogs */
	const catalogs = useStoreState(state => state.collections)
	
	/** Set parent level */
	const academicParent = filter(catalogs.academic_level, o => o.parent === null || o.parent === '')
	
	/** Switch level & children as local */
	const [levels, setLevels] = useState({})
	
	const switchChildren = (e, k) => {
		setLevels({...levels, [k]: find(catalogs.academic_level, o => o.id === e)})
	}
	
	const onFinish = fields => {
		switchStatus('loading')
		xhr()
			.put(
				`/profile/${id}`,
				JSON.stringify({
					fields: {
						academic: {
							studies: fields.studies,
						},
					},
				}),
			)
			.then(resp => {
				updateProfile({
					type: 'academic',
					fields: Object.assign(academic, {studies: fields.studies})
				})
				
				
				/** Send notification success */
				notify('success', 'Niveles académicos.', 'Actualizado correctamente..')
				
				switchStatus('ready')
				
				// router.push(`${router.router.pathname}?current=${parseInt(router.router.query.current, 10) + 1}`);
				
				delay(_ => {
					location.href = `${router.router.pathname}?current=${parseInt(router.router.query.current, 10) + 1}`
				}, 1000)
				
				// window.scroll({
				// 	top: 80,
				// 	behavior: 'smooth',
				// });
				
			})
			.catch(err => {
				switchStatus('ready')
				console.log('Error:', err)
			})
	}
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
	const initialValues = _ => {
		if (academic && academic.studies.length > 0) {
			academic.studies.map((row, index) => {
				row.dateInit = moment(row.dateInit);
				row.dateEnd = moment(row.dateEnd);
				return row;
			});
			return academic;
		} else {
			return {
				studies: [
					{
						currently: false,
					},
				],
			};
		}
	}
	
	const dateFormat = 'DD/MM/YYYY'

	
	useEffect(() => {
		initialValues()
	},[])
	

	/** validation */
	const [validate, setValidate] = useState([]);
	const getAllvalidations = () => {
		let setVal = [];
		if(academic.studies && academic.studies.length > 0) {
			setVal = academic.studies.map(e => e.currently )
		}
		setValidate(setVal);
	}

	const switchValidate = (e, idx ) => {
		const newValidate = validate.map((o, i)=> {
			if(i === idx) {
				return e
			}
			else {
				return o
			}
		})
		setValidate(newValidate);
	}

	useEffect(() => {
		getAllvalidations()
	}, [academic]);

	return (
		<>
			<Form
				initialValues={initialValues()}
				onFinish={onFinish}
				validateTrigger="onBlur"
				scrollToFirstError={true}
			>
				
				{/*
				 | USE THIS TO DISABLE FORM WHILE REQUEST
				 | --------------------------------------
				 */}
				<FormOverlay active={status === 'loading'}/>
				
				<div className="umana-form--section">
					<h2>Niveles académicos</h2>
					<List name="studies" className="form-item--lg">
						{(fields, {add, remove}) => {
							return (
								<>
									{fields.map(field => {
										
										/** Set default specializations list */
										const current = initialValues().studies.reduce((acc, current, index, collection) => {
											if (index === field.key) {
												acc = find(academicParent, o => o.id === current.academicLevel)
											}
											return acc
										}, {})
										
										return (
											<Space key={field.key} className="umana-form--group two-columns group-academic">
												<Item
													label="Establecimiento"
													{...field}
													name={[field.name, 'establishment']}
													fieldKey={[field.fieldKey, 'establishment']}
													rules={[{required: true, message: 'Establecimiento es requerido.'}]}
												>
													<Input/>
												</Item>
												
												<Item
													label="Nivel Académico"
													{...field}
													name={[field.name, 'academicLevel']}
													fieldKey={[field.fieldKey, 'academicLevel']}
													rules={[{required: true, message: 'Debes escoger un nivel académico'}]}
												>
													<Select
														placeholder="Seleccione"
														onChange={e => switchChildren(e, field.key)}
														optionFilterProp="children"
														filterOption={(input, option) =>
															option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
														}
														showSearch
													>
														{!isEmpty(academicParent) ? (
															academicParent.sort((a, b) => a.order > b.order ? 1 : -1).map((o, i) => (
																o.status ?
																<Option value={o.id} key={i}>
																	{o.name}
																</Option>
																: null
															))
														) : (
															<Option value="0">No hay listado para mostrar</Option>
														)}
													</Select>
												</Item>
												
												<Item
													label="Especialización"
													rules={[{required: true, message: 'Debes escoger una especialidad'}]}
													{...field}
													name={[field.name, 'specialization']}
													fieldKey={[field.fieldKey, 'specialization']}
												>
													<Select
														placeholder="Seleccione"
														optionFilterProp="children"
														filterOption={(input, option) =>
															option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
														}
														showSearch
													>
														{
															typeof levels[field.key] === 'undefined'
																? current && Object.keys(current).length > 0 && !isEmpty(current.children) ? (
																	current.children.sort((a, b) => a.order > b.order ? 1 : -1).map((o, i) => (
																		o.status ?
																		<Option value={o.id} key={i}>
																			{o.name}
																		</Option>
																		 : null
																	))
																) : (
																	<Option value="0">No hay listado para mostrar</Option>
																) : typeof levels[field.key] !== 'undefined' ? (
																	levels[field.key].children.map((o, i) => (
																		o.status ?
																		<Option value={o.id} key={i}>
																			{o.name}
																		</Option>
																		: null
																	))
																) : (
																	<Option value="0">No hay listado para mostrar</Option>
																)
														}
													</Select>
												</Item>
												<Item
												
													{...field}
													name={[field.name, 'currently']}
													fieldKey={[field.fieldKey, 'currently']}
													valuePropName="checked"
													label="¿Estudia aquí actualmente?"
												>
												
													<Switch onChange={e => switchValidate(e, field.key)} checkedChildren="SI" unCheckedChildren="NO"/>
												</Item>
												
												<Item
													label="Fecha de inicio"
													{...field}
													name={[field.name, 'dateInit']}
													fieldKey={[field.fieldKey, 'dateInit']}
													rules={[{required: true, message: 'Fecha de inicio es requerida'}]}
												>
													<DatePicker
														format={dateFormat}
														style={{width: '100%'}}
														size="large"
														allowClear={false}
														// onChange={(date, dateString) =>
														// 	onDatePickerChange(date, dateString, 'start_date')
														// }
													/>
												</Item>
												{!validate[field.fieldKey] ? 
												<Item
													label="Fecha de fin"
													{...field}
													name={[field.name, 'dateEnd']}
													fieldKey={[field.fieldKey, 'dateEnd']}
													rules={[{required: true, message: 'Fecha final es requerida'}]}
												>
													<DatePicker
														style={{width: '100%'}}
														size="large"
														format={dateFormat}
														allowClear={false}
												
													/>
												</Item>
											:
												<Item label="Fecha final">
													<Input value="Presente" disabled={true} />
												</Item> 
												}
												
												
												<Item
													label="Número de colegiado"
													{...field}
													name={[field.name, 'collegiate']}
													fieldKey={[field.fieldKey, 'collegiate']}
												>
													<Input/>
												</Item>
												
												
												<a
													key={field.key + 'add'}
													className="form-item--delete"
													onClick={() => {
														remove(field.name);
													}}
												>
													<i className="material-icons">cancel</i>
												</a>
											</Space>
										)
									})}
									<Form.Item>
										<Button
											style={{width: '100%'}}
											type="dashed"
											size="large"
											onClick={() => {
												add({currently : false});
												setValidate( [...validate, false])
											}}
											block
										>
											<i className="material-icons">add</i> Agregar nivel académico
										</Button>
									</Form.Item>
								</>
							)
						}}
					</List>
				</div>
				<Form.Item>
					<Button type="orange" size="small" htmlType="submit" style={{marginLeft: 'auto'}}>
						Guardar y continuar
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}

export default Level;
