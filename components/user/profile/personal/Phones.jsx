import {filter, map} from "lodash";
import {useStoreActions} from "easy-peasy";
import {Form, Button, Select, Input} from "antd";
import {PlusOutlined, CloseOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

const {Item} = Form;
const {Option} = Select;

const Phones = ({phones, setPhones}) => {
	/** Global tools */
	const makeRandomId = useStoreActions(actions => actions.tools.makeRandomId); /** Unique param is length (int) */
	
	/** Add/Remove phone handlers */
	const removePhone = id => setPhones(filter(phones, o => o.id !== id));
	
	/** Add phones -> global state */
	const addPhone = () =>
		setPhones([
			...phones,
			{
				area: "",
				number: "",
				type: "",
				id: makeRandomId(10)
			}
		]);
	
	/** Update single phone */
	const updatePhone = (e, field, phone) =>
		setPhones(
			map(phones, o => {
				if (o.id === phone.id) {
					if (field === "number") {
						o.number = e.target.value;
					}
					if (field === "area") {
						o.area = e;
					}
					if (field === "type") {
						o.type = e;
					}
				}
				return o;
			})
		);
	
	return (
		<>
			{phones.map((phone, index) => (
				<fieldset className="row no-gutters align-items-center" key={index}>
					<legend>{`Teléfono #${index + 1}`}</legend>
					<div className="row">
						<div className="col">
							<label htmlFor={`phone-${index}`}>Área</label>
							<Item>
								<Select
									placeholder="Seleccione"
									style={{width: "100%"}}
									value={phone.area}
									onSelect={e => updatePhone(e, "area", phone)}
								>
									<Option value={502}>(502) Guatemala</Option>
								</Select>
							</Item>
						</div>
						<div className="col">
							<label htmlFor="number">Número</label>
							<Item>
								<Input
									placeholder="0000-0000"
									value={phone.number}
									onChange={e => updatePhone(e, "number", phone)}
								/>
							</Item>
						</div>
						<div className="col">
							<label htmlFor="type">Tipo:</label>
							<Item>
								<Select
									placeholder="Seleccione"
									style={{width: "100%"}}
									value={phone.type}
									onSelect={e => updatePhone(e, "type", phone)}
								>
									<Option value="personal">Personal</Option>
									<Option value="work">Trabajo</Option>
									<Option value="home">Casa</Option>
								</Select>
							</Item>
						</div>
						<div className="close-action">
							<Button
								size="small"
								className="close-square"
								icon={<CloseOutlined/>}
								onClick={() => removePhone(phone.id)}
								danger={true}
							/>
						</div>
					</div>
				</fieldset>
			))}
			<div style={{marginTop: 24}}>
				<Button
					className="button--margin-24"
					size="large"
					icon={<PlusOutlined/>}
					onClick={addPhone}
				>
					Agregar
				</Button>
			</div>
		</>
	);
};

Phones.propTypes = {
	phones: PropTypes.array,
	setPhones: PropTypes.func
};

Phones.defaultProps = {
	phones: [],
	setPhones: () => {
	}
};

export default Phones;
