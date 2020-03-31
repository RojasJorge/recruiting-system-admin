import {Form, Input} from "antd";

const {Item} = Form;

const Names = _ => {
	
	return (
		<>
			<div className="col-md-6">
				<label htmlFor="name">Nombre:</label>
				<Item
					name="name"
					type="text"
					rules={[{required: true, message: "El campo Nombre es requerido."}]}
				>
					<Input size="large"/>
				</Item>
			</div>
			<div className="col-md-6">
				<label htmlFor="lastname">Apellido:</label>
				<Item
					name="lastname"
					type="text"
					rules={[{required: true, message: "El campo Apellido es requerido."}]}
				>
					<Input size="large"/>
				</Item>
			</div>
			<div className="col-md-12">
				<label htmlFor="jobTitle">Puesto Actual:</label>
				<Item
					name="job_title"
					type="text"
					rules={[{required: true, message: "El campo 'Puesto Actual' es requerido."}]}
				>
					<Input size="large"/>
				</Item>
			</div>
		</>
	);
};

export default Names;
