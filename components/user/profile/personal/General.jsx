import {Form, DatePicker, InputNumber, Select, Divider} from "antd";

const {Item} = Form;
const {Option} = Select;

const nationality = [{
	code: "gt",
	title: "Guatemala",
	nicename: "Guatemalteco"
}, {
	code: "co",
	title: "Colombia",
	nicename: "Colombiano"
}, {
	code: "ve",
	title: "Venezuela",
	nicename: "Venezolano"
}];

const gender = [{
	title: "Masculino",
	slug: "male"
}, {
	title: "Femenino",
	slug: "female"
}];

const religion = [{
	title: "Sin religión",
	slug: "no"
}, {
	title: "Evangélico",
	slug: "evangelical"
}, {
	title: "Católico",
	slug: "catholic"
}];

const General = _ => {
	
	return (
		<>
			<Divider orientation="left">Información General</Divider>
			<div className="col col-lg-4">
				<label htmlFor="nationality">Nacionalidad</label>
				<Item
					name="nationality"
					rules={[{required: true, message: "El campo Nacionalidad es requerido."}]}
				>
					<Select
						name="nationality"
						size="large"
						style={{width: '100%'}}
					>
						{nationality.map((o, i) => (
							<Option key={i} value={o.code}>
								{o.nicename} (a)
							</Option>
						))}
					</Select>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="birtday">Fecha de nacimiento:</label>
				<Item
					name="birthday"
					rules={[{required: true, message: "El campo Fecha de nacimiento es requerido."}]}
				>
					<DatePicker size="large" format="DD/MM/YYYY" style={{width: '100%'}}/>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="age">Edad:</label>
				<Item
					name="age"
					rules={[{required: true, message: "El campo Edad es requerido."}]}
				>
					<InputNumber style={{width: '100%'}} size="large"/>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="nationality">Sexo</label>
				<Item
					name="gender"
					rules={[{required: true, message: "El campo Sexo es requerido."}]}
				>
					<Select
						name="gender"
						size="large"
						placeholder="Seleccione"
						style={{width: '100%'}}
					>
						{gender.map((o, i) => (
							<Option key={i} value={o.slug}>
								{o.title}
							</Option>
						))}
					</Select>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="religion">Religión</label>
				<Item
					name="religion"
					rules={[{required: true, message: "El campo Religión es requerido."}]}
				>
					<Select
						name="religion"
						size="large"
						placeholder="Seleccione"
						style={{width: '100%'}}
					>
						{religion.map((o, i) => (
							<Option key={i} value={o.slug}>
								{o.title}
							</Option>
						))}
					</Select>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="marital_status">Estado civíl</label>
				<Item
					name="marital_status"
					rules={[{required: true, message: "El campo Estado civil es requerido."}]}
				>
					<Select
						name="marital_status"
						size="large"
						placeholder="Seleccione"
						style={{width: '100%'}}
					>
						<Option value="single">
							Soltero (a)
						</Option>
						<Option value="married">
							Casado (a)
						</Option>
					</Select>
				</Item>
			</div>
			<div className="col col-md-4">
				<label htmlFor="children">Hijos:</label>
				<Item
					name="children"
					rules={[{required: true, message: "El campo Hijos es requerido."}]}
				>
					<InputNumber min={0} max={20} placeholder="0" style={{width: '100%'}} size="large"/>
				</Item>
			</div>
		</>
	)
};

export default General;