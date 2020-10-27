import {useState} from "react";
import PropTypes from "prop-types";
import {CheckOutlined, DeleteOutlined} from "@ant-design/icons";
import {Button, DatePicker, Form, Input, Select, Switch} from "antd";
import {filter, isEmpty, remove} from "lodash";

const {Item} = Form;
const {Option} = Select;

const Level = ({level, counter, careers, academicLevels, addLevels, levels}) => {
	
	// const careerParent = filter(careers, o => o.parent === null);
	const academicParent = filter(academicLevels, o => o.parent === null);
	
	const [children, setAcademicChildren] = useState([]);
	
	/** Current default level */
	const [_level, _setLevel] = useState(level);
	
	const switchChildren = (e, collection) => {
		const module = collection === "academicLevels" ? academicLevels : careers;
		const localModule = collection === "academicLevels" ? "academic_level" : "careers";
		const filtered = filter(module, o => o.parent === e);
		_setLevel({..._level, [localModule]: e});
		setAcademicChildren(filtered);
	};
	
	const switchSpecialization = (e) => {
		_setLevel({..._level, specialization: e});
	};
	
	const onChange = e =>
		_setLevel({..._level, [e.target.name]: e.target.value});
	
	const switchCurrently = e =>
		_setLevel({..._level, currently: e});
	
	const onDatePickerChange = (date, dateString, field) =>
		_setLevel({..._level, [field]: date.toString()});
	
	const onFinish = data => {
		remove(levels, o => o.id === level.id);
		addLevels([...levels, _level]);
	};
	
	return (
		<>
			<Form validateTrigger="onBlur" onFinish={onFinish}>
				<fieldset>
					<legend>
						<Button shape="circle">{counter}</Button> {" "}
						<Button icon={<DeleteOutlined/>} onClick={() => {
							const rm = filter(levels, o => o.id !== level.id);
							
							addLevels(rm);
						}} type="link"/>{" "}
						<small style={{color: '#c7c7c7'}}>{level._id}</small>
					</legend>
					<div className="row">
						<div className="col-md-12">
							<label htmlFor="establishment">Establecimiento:</label>
							<Item
								name="establishment"
								rules={[{required: true, message: "Establecimiento es requerido."}]}
							>
								<Input name="establishment" value={_level.establishment} onChange={onChange}/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="academicLevel"
								rules={[{required: true, message: "Debes escoger un nivel académico"}]}
							>
								<Select
									placeholder="Seleccione"
									onChange={e => switchChildren(e, 'academicLevels')}
									value={_level.academic_level}
									showSearch
								>
									{
										!isEmpty(academicParent)
											? academicParent.map((o, i) => (
												<Option value={o.id} key={i}>
													{o.name}
												</Option>
											))
											: <Option value="0">No hay listado para mostrar</Option>
									}
								</Select>
							</Item>
						</div>
						<div className="col-md-6">
							<Item name="specialization">
								<Select
									placeholder="Seleccione"
									disabled={isEmpty(children)}
									value={_level.specialization}
									onChange={switchSpecialization}
									value={_level.specialization}
									showSearch>
									{
										!isEmpty(children)
											? children.map((o, i) => (
												<Option value={o.id} key={i}>
													{o.name}
												</Option>
											))
											: <Option value="0">No hay listado para mostrar</Option>
									}
								</Select>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="start_date"
								rules={[{required: true, message: "Fecha de inicio es requerida"}]}
							>
								<DatePicker
									format="DD/MM/YYYY"
									value={_level.start_date.toString()}
									style={{width: '100%'}}
									size="large"
									onChange={(date, dateString) => onDatePickerChange(date, dateString, "start_date")}
								/>
							</Item>
						</div>
						<div className="col-md-6">
							<Item
								name="end_date"
								rules={[{required: true, message: "Fecha final es requerida"}]}
							>
								<DatePicker
									value={_level.end_date.toString()}
									style={{width: '100%'}}
									size="large"
									format="DD/MM/YYYY"
									onChange={(date, dateString) => onDatePickerChange(date, dateString, "end_date")}
								/>
							</Item>
						</div>
						<div className="col-md-12">
							<label htmlFor="collegiate">Número de colegiado:</label>
							<Item
								name="collegiate"
								rules={[{required: true, message: "Número de colegiado es requerido."}]}
							>
								<Input onChange={onChange} name="collegiate" value={_level.collegiate}/>
							</Item>
						</div>
						<div className="col-md-12">
							<label htmlFor="collegiate">Estudia aquí actualmente?:</label>
							<Item name="currently">
								<Switch checked={_level.currently} onChange={switchCurrently}/>
							</Item>
						</div>
						<div className="col">
							<Button
								type="link"
								size="small"
								htmlType="submit"
								// disabled
								icon={<CheckOutlined/>}>
								Confirmar agregar</Button>
						</div>
					</div>
				
				</fieldset>
			</Form>
		</>
	);
};

Level.propTypes = {
	level: PropTypes.object,
	levels: PropTypes.array,
	counter: PropTypes.number,
	careers: PropTypes.array,
	academicLevels: PropTypes.array
};

Level.defaultProps = {
	level: {},
	levels: [],
	counter: 0,
	careers: [],
	academicLevels: []
};

export default Level;
