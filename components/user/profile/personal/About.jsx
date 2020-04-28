import {Input, Form, Button, Divider} from "antd";
import {DoubleRightOutlined} from "@ant-design/icons";

const {Item} = Form;
const {TextArea} = Input;

const About = _ => {
	
	const onFinish = data => {
		// console.log("data......", data);
	};
	
	return (
		<>
			<h2>Cuéntanos acerca de ti y tu experiencia:</h2>
			<Form
				onFinish={onFinish}
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
								icon={<DoubleRightOutlined />}>Confirmar y continuar</Button>
						</Item>
					</div>
				</div>
			</Form>
		</>
	);
};

export default About;
