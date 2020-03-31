import {Form, Input, InputNumber, Button, Select, Divider, Upload, message} from "antd";
import {InboxOutlined} from "@ant-design/icons";

const {Item} = Form;
const {Option} = Select;
const {Dragger} = Upload;

const Documents = _ => {
	
	const onFinish = values => {
		console.log(values)
	};
	
	const props = {
		name: 'file',
		multiple: true,
		action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
		onChange(info) {
			const {status} = info.file;
			if (status !== 'uploading') {
				
				// console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				console.log(info)
				message.success(`${info.file.name} file uploaded successfully.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
	};
	
	return <>
		<h2>Documentos de identificación:</h2>
		<Form
			className="animated fadeInUp"
			onFinish={onFinish}
		>
			<div className="row">
				<div className="col-md-12">
					<label htmlFor="dpi">DPI:</label>
					<Item name="dpi">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
				</div>
				<div className="col-md-6">
					<label htmlFor="dpi">Pasaporte:</label>
					<Item name="passport">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
				</div>
				<div className="col-md-6">
					<label htmlFor="nit">NIT:</label>
					<Item name="nit">
						<Input size="large"/>
					</Item>
				</div>
				<div className="col-md-6">
					<label htmlFor="drivers_license">Licencia:</label>
					<Item name="drivers_license">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
				</div>
				<div className="col-md-6">
					<label htmlFor="license_type">Tipo de licencia:</label>
					<Item name="license_type">
						<Select size="large" mode="multiple">
							<Option value="a">A</Option>
							<Option value="b">B</Option>
							<Option value="c">C</Option>
							<Option value="motorcicle">Motocicleta</Option>
						</Select>
					</Item>
				</div>
				<Divider orientation="left">Archivos adjuntos:</Divider>
				<div className="col-md-12">
					<Item>
						<Dragger {...props}>
							<p className="ant-upload-drag-icon">
								<InboxOutlined/>
							</p>
							<p className="ant-upload-text">Arrastre o haga click aquí para subir un archivo.</p>
						</Dragger>
					</Item>
				</div>
			</div>
			{/*Ends row*/}
			<Item>
				<Button size="large" htmlType="submit" type="primary">Confirmar y continuar</Button>
			</Item>
		</Form>
	</>
};

export default Documents;
