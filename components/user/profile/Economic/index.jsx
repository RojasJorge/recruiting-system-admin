import {Button, Form, Input, InputNumber} from 'antd'
import Salary from "./Salary";

const {Item} = Form

const Economic = _ => {
	
	const onFinish = fields => {
		console.log('onFinish:', fields)
	}
	
	return (
		<>
			<Form
				onFinish={onFinish}
			>
				<div className="row">
					<div className="col-md-12">
						<Item
							name="desiredSalary"
						>
							<Salary/>
						</Item>
					</div>
				</div>
			</Form>
		</>
	)
}



export default Economic
