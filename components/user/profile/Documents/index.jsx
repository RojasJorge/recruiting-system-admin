import {Form, Input, InputNumber, Button, Select, Divider, Upload, message, notification} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import xhr from "../../../../xhr";
import router from "next/router";
import {useStoreActions, useStoreState} from "easy-peasy";

const {Item} = Form;
const {Option} = Select;
const {Dragger} = Upload;

const Documents = ({switchCurrent, current}) => {
	
	/** Global state */
	const {
		profile: {
			id,
			fields: {
				personal
			}
		},
	} = useStoreState(state => state.auth.user)
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		
		let merged = Object.assign(personal, fields)
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					personal: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'personal', fields: merged})
				
				/** Send notification success */
				notify('success', 'Ficha documentos actualizada.', 'Vamos al siguiente paso...')
				switchCurrent((current + 1))
				router.push(`${router.router.pathname}?current=${(current + 1)}`)
			})
			.catch(err => console.log('Error:', err))
	}
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
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
			initialValues={personal}
		>
			<div className="row">
				<div className="col-md-12">
					<label htmlFor="dpi">DPI:</label>
					<Item name="dpi">
						<Input style={{width: '100%'}} min={0} size="large"/>
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
					<label htmlFor="driversLicence">Licencia:</label>
					<Item name="driversLicence">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
				</div>
				<div className="col-md-6">
					<label htmlFor="driversLicenceType">Tipo de licencia:</label>
					<Item name="driversLicenceType">
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
