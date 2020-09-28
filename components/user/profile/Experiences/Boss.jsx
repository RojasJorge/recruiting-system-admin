import {useState, useEffect} from "react";
import "cleave.js/dist/addons/cleave-phone.gt";
import Cleave from "cleave.js/react";
import {Form, Input, Button} from "antd";
import {debounce} from "lodash";

const {Item} = Form;

const Boss = ({setExperience, _experience, boss, addBoss, counter}) => {
	
	const [_boss, _addBoss] = useState(boss);
	
	const onChange = e =>
		_addBoss({..._boss, [e.target.name]: e.target.value});
	
	useEffect(() => {
		if (_boss.title !== "" && _boss.name !== "" && _boss.phone !== "") {
			setExperience({
				..._experience, test: "aksdjfaklsdjflaksdjf"
			});
		}
	}, [_boss]);
	
	return (
		<>
			<fieldset>
				<legend><Button shape="circle">{counter}</Button></legend>
				<div className="row">
					<div className="col-md-12">
						<label htmlFor="name">Nombre de jefe inmediato:</label>
						<div className="ant-row ant-form-item">
							<Input
								size="large"
								name="name"
								value={_boss.name}
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="col-md-6">
						<label htmlFor="title">Puesto:</label>
						<div className="ant-row ant-form-item">
							<Input
								size="large"
								name="title"
								value={_boss.title}
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="col-md-6">
						<label htmlFor="phone">Teléfono:</label>
						<div className="ant-row ant-form-item">
							<Cleave
								className="ant-input ant-input-lg"
								options={{
									phone: true,
									phoneRegionCode: "GT"
								}}
								name="phone"
								value={_boss.phone}
								onChange={onChange}
							/>
						</div>
					</div>
					<div className="col-md-12">
						{/*<pre>{JSON.stringify(_boss, false, 2)}</pre>*/}
					</div>
				</div>
			</fieldset>
		</>
	)
};

export default Boss;
