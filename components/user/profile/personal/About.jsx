import {Input, Form, Button, Divider, notification} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import {useStoreActions, useStoreState} from "easy-peasy";
import xhr from "../../../../xhr";
import router from "next/router";

const {Item} = Form;
const {TextArea} = Input;

const About = ({switchCurrent, current}) => {
	
	/** Global state */
	const {
		profile: {
			id,
			fields: {
				personal
			}
		},
		
	} = useStoreState(state => state.auth.user)
	
	/** Personal info */
	const updateProfile = useStoreActions(actions => actions.auth.updateProfile)
	
	const onFinish = fields => {
		// console.log("About.jsx:", fields);
		
		const merged = Object.assign(personal, fields)
		
		xhr()
			.put(`/profile/${id}`, JSON.stringify({
				fields: {
					personal: fields
				}
			}))
			.then(resp => {
				updateProfile({type: 'personal', fields: merged})
				
				/** Send notification success */
				notify('success', 'Ficha Acerca de actualizada.', 'Vamos al siguiente paso...')
				switchCurrent((current + 1))
				router.push(`${router.router.pathname}?current=${(current + 1)}`)
			})
			.catch(err => console.log('Error:', err))
	};
	
	/** Notifications */
	const notify = (type, message, description) => {
		notification[type]({
			message,
			description
		})
	}
	
	return (
		<>
			<h2>Cuéntanos acerca de ti y tu experiencia:</h2>
			<Form
				onFinish={onFinish}
				initialValues={personal}
			>
				<div className="row">
					<div className="col-md-12">
						<Item name="about">
							<TextArea rows={4} autoSize={{minRows: 4, maxRows: 30}}/>
						</Item>
					</div>
					<div className="col-md-12">
						<Item>
							<Button
								type="primary"
								size="large"
								htmlType="submit"
								icon={<DoubleRightOutlined />}>Confirmar y continuar</Button>
						</Item>
					</div>
				</div>
			</Form>
		</>
	);
};

export default About;
