import {useState} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {delay} from "lodash";
import {Button, Form} from "antd";
import Names from "./Names";
import Location from "./Location";
import Salary from "./Salary";
import General from "./General";
import Contact from "./Contact";
import {DoubleRightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

/** Import form sections */

const FormItem = Form.Item;

const Personal = ({update}) => {
	/** Global state */
	const {
		profile: {
			fields: {
				personal
			}
		},
		
	} = useStoreState(state => state.auth.user)
	
	/** Danger status */
	const [danger, isDanger] = useState(false)
	
	/** Phones */
	const [phones, setPhones] = useState([])
	
	/** Personal info */
	
	/** Slugify string */
	const slugify = useStoreActions(actions => actions.tools.slugify)
	
	const updateGlobal = useStoreActions(actions => actions.profile.update)
	
	/**
	 * Update user on store
	 */
	const updateStoreUser = useStoreActions(actions => actions.auth.updateStoreUser)
	
	/** Location handler */
	const [country, selectCountry] = useState({
		data: []
	});
	
	/** The location handler */
	const [location, addLocation] = useState({
		country: {},
		province: {},
		city: {
			name: "",
			slug: ""
		},
	})
	
	const onFinish = fields => {
		
		updateStoreUser(fields)
		
		/** Update global */
		// delay(() => updateGlobal({
		// 	field: "personal",
		// 	value: {
		// 		...values,
		// 		...{
		// 			phones,
		// 			country: location.country,
		// 			city: location.city,
		// 			province: {
		// 				name: location.province.department,
		// 				slug: slugify(location.province.department)
		// 			},
		// 		}
		// 	}
		// }), 1000)
	}
	
	// const onFinishFailed = _ => {
	// 	isDanger(true);
	// 	setTimeout(() => {
	// 		isDanger(false);
	// 	}, 3000)
	// }
	
	return (
		<>
			{/*<pre>{JSON.stringify(user.profile.personal, false, 2)}</pre>*/}
			<div className="row">
				<div className="col-md-12">
					<h2>Información personal:</h2>
				</div>
			</div>
			<Form
				name="basic"
				className="row"
				onFinish={onFinish}
				initialValues={{
					name: personal.name,
					lastname: personal.lastname,
					job_title: personal.currentJobTitle,
					zone: personal.location.zone,
					address: personal.location.address,
					currency: "GTQ",
					min: 3000,
					max: 6000,
					nationality: personal.nationality,
					// birthday: dayjs(dayjs(personal.birthday, 'YYYY-MM-DD'), 'DD/MM/YYYY'),
					age: personal.age,
					gender: personal.gender,
					religion: personal.religion,
					marital_status: personal.marital_status,
					children: personal.children
				}}
				// onFinishFailed={onFinishFailed}
			>
				<Names/>
				<Location
					country={country}
					selectCountry={selectCountry}
					location={location}
					addLocation={addLocation}
				/>
				<Salary/>
				<General birthday={personal.birthday}/>
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
