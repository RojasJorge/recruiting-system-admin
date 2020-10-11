import {Button, Divider, Form, Input, InputNumber, message, notification, Select, Upload,} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import xhr from '../../../../xhr';
import router from 'next/router';
import {useStoreActions, useStoreState} from 'easy-peasy';

const {Item} = Form;
const {Option} = Select;
const {Dragger} = Upload;

const Documents = ({switchCurrent, current}) => {
	/** Global state */
	const {
		profile: {
			id,
			fields: {personal},
		},
	} = useStoreState(state => state.auth.user);
	
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile);
	
	const onFinish = fields => {
		let merged = Object.assign(personal, fields);
		
		xhr()
			.put(
				`/profile/${id}`,
				JSON.stringify({
					fields: {
						personal: fields,
					},
				}),
			)
			.then(resp => {
				updateProfile({type: 'personal', fields: merged});
				
				/** Send notification success */
				notify('success', 'Ficha documentos actualizada.', 'Vamos al siguiente paso...');
				switchCurrent(current + 1);
				router.push(`${router.router.pathname}?current=${current + 1}`);
			})
			.catch(err => console.log('Error:', err));
	};
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description,
		});
	};
	
	const props = {
		name: 'file',
		multiple: true,
		action: 'http://localhost:30011/media',
		onChange(info) {
			// console.log('onFileChange:', info)
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
	
	
	return (
		<>
			<Form className="animated fadeInUp" onFinish={onFinish} initialValues={personal}>
				<div className="umana-form--section">
					<h2>Documentos de identificación</h2>
					<Item name="dpi" label="DPI" className="form-item--md">
						<Input style={{width: '100%'}} min={0} size="large"/>
					</Item>
					
					<Item name="passport" label="Pasaporte" className="form-item--md">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
					
					<Item name="nit" label="NIT" className="form-item--md">
						<Input size="large"/>
					</Item>
					
					<Item name="driversLicence" label="Licencia" className="form-item--md">
						<InputNumber style={{width: '100%'}} min={0} size="large"/>
					</Item>
					
					<Item name="driversLicenceType" label="Tipo de licencia" className="form-item--md">
						<Select size="large" mode="multiple">
							<Option value="a">A</Option>
							<Option value="b">B</Option>
							<Option value="c">C</Option>
							<Option value="motorcicle">Motocicleta</Option>
						</Select>
					</Item>
					
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
					<Button size="small" htmlType="submit" type="orange" style={{width: '100%'}}>
						Confirmar y continuar
					</Button>
				</Item>
			</Form>
		</>
	);
};

export default Documents;
