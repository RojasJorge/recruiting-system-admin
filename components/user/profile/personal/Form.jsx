import {useState} from "react";
import {useStoreActions} from "easy-peasy";
import {delay} from "lodash";
import {Form, Button} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";
import "animate.css";

/** Import form sections */
import Salary from "./Salary";
import Names from "./Names";
import Location from "./Location";
import General from "./General";
import Contact from "./Contact";

const FormItem = Form.Item;

const PersonalForm = _ => {
	
	/** Danger status */
	const [danger, isDanger] = useState(false);
	
	/** Phones */
	const [phones, setPhones] = useState([]);
	
	/** Personal info */
	// const [personal, addPersonalInfo] = useState({
	// 	name: "",
	// 	lastname: "",
	// 	job_title: "",
	// 	country: {},
	// 	province: {},
	// 	phones: [],
	// 	city: {
	// 		name: "",
	// 		slug: ""
	// 	},
	// 	zone: 0,
	// 	direction: ""
	// });
	
	/** Slugify string */
	const slugify = useStoreActions(actions => actions.tools.slugify);
	
	const updateGlobal = useStoreActions(actions => actions.profile.update);
	
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
	});
	
	const onFinish = values => {
		/** Set module locale values */
		// addPersonalInfo({
		// 	...values, ...{
		// 		country: location.country,
		// 		city: location.city,
		// 		province: {
		// 			name: location.province.department,
		// 			slug: slugify(location.province.department)
		// 		},
		// 	}
		// });
		
		/** Update global */
		delay(() => updateGlobal({
			field: "personal",
			value: {
				...values,
				...{
					phones,
					country: location.country,
					city: location.city,
					province: {
						name: location.province.department,
						slug: slugify(location.province.department)
					},
				}
			}
		}), 1000);
	};
	
	const onFinishFailed = _ => {
		isDanger(true);
		setTimeout(() => {
			isDanger(false);
		}, 3000)
	};
	
	return (
		<>
			<Form
				name="basic"
				className="animated fadeInUp"
				initialValues={{
					name: "Jorge Alberto",
					lastname: "Rojas Solórzano",
					job_title: "Backend Developer",
					zone: 4,
					address: "Vía 4 1-00 Zona 4, Campus Tec II",
					currency: "GTQ",
					min: 3000,
					max: 6000,
					nationality: "gt",
					bithday: "07/07/1983",
					age: 36,
					gender: "male",
					religion: "no",
					marital_status: "single",
					children: 0
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
			>
				<div className="row">
					<Names/>
					<Location
						country={country}
						selectCountry={selectCountry}
						location={location}
						addLocation={addLocation}
					/>
					<Salary/>
					<General/>
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
				</div>
			</Form>
		</>
	);
};

export default PersonalForm;
