import {useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {Button, Form, notification} from "antd";
import Names from "./Names";
// import Location from "./Location";
import Locations from "../../../Location";
import General from "./General";
import Contact from "./Contact";
import {DoubleRightOutlined} from "@ant-design/icons";
import xhr from "../../../../xhr";

/** Import form sections */
const FormItem = Form.Item;

const Personal = _ => {
	/** Global state */
	const {
		profile: {
			id,
			fields: {
				personal
			}
		},
		
	} = useStoreState(state => state.auth.user)
	
	/** Birthday handler */
	const [birthday, setBirthday] = useState(personal.birthday)
	
	/** Danger status */
	const [danger, isDanger] = useState(false)
	
	/** Phones */
	const [phones, setPhones] = useState([])
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		fields = {...fields, birthday}
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					personal: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'personal', fields})
				
				/** Send notification success */
				notify('success', 'Genial!', 'Ficha personal actualizada.')
			})
			.catch(err => console.log('Error:', err))
	}
	
	/** Notifications */
	const notify = (type, description) => {
		notification[type]({
			message: null,
			description
		})
	}
	
	return (
		<>
			<pre>{JSON.stringify(personal, false, 2)}</pre>
			<div className="row">
				<div className="col-md-12">
					<h2>Información personal:</h2>
				</div>
			</div>
			<Form
				name="basic"
				className="row"
				onFinish={onFinish}
				initialValues={personal}
			>
				<Names/>
				<Form.Item
					name="location"
				>
					<Locations/>
				</Form.Item>
				{/*<Salary/>*/}
				<General
					birthday={birthday}
					setBirthday={setBirthday}
				/>
				<Contact
					phones={phones}
					setPhones={setPhones}
				/>
				<div className="col-md-12">
					<FormItem>
						<Button
							type="primary"
							htmlType="submit"
							icon={<DoubleRightOutlined/>}
							size="large"
							danger={danger}>Confirmar y continuar</Button>
					</FormItem>
				</div>
			</Form>
		</>
	)
}

export default Personal
