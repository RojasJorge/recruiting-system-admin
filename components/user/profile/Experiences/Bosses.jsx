import {Input, Form, Button} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {List} = Form

const Bosses = _ => {
	return(
		<>
			<List name="bosses">
				{(bosses, {add: addBoss, remove: removeBoss}) => {
					return (
						<>
							{
								bosses.map(boss => (
									<fieldset key={boss.key} style={{
										padding: '15px',
										backgroundColor: '#e7e7e7'
									}}>
										<div className="row align-items-center">
											<div className="col-md-11">
												<div className="row">
													<div className="col-md-12">
														<label htmlFor="name">Nombre</label>
														<Item
															name={[boss.name, 'name']}
															fieldKey={[boss.fieldKey, 'name']}
															rules={[{
																required: true,
																message: 'El nombre del jefe es requerido'
															}]}
														>
															<Input/>
														</Item>
													</div>
													<div className="col-md-6">
														<label htmlFor="titleJob">Puesto</label>
														<Item
															name={[boss.name, 'titleJob']}
															fieldKey={[boss.fieldKey, 'titleJob']}
															rules={[{
																required: true,
																message: 'Puesto'
															}]}
														>
															<Input/>
														</Item>
													</div>
													<div className="col-md-6">
														<label htmlFor="phone">Número de teléfono</label>
														<Item
															name={[boss.name, 'phone']}
															fieldKey={[boss.fieldKey, 'phone']}
															rules={[{
																required: true,
																message: 'El número de teléfono es requrerido'
															}]}
														>
															<Input/>
														</Item>
													</div>
												</div>
											</div>
											<div className="col">
												<MinusCircleOutlined
													onClick={() => {
														removeBoss(boss.name);
													}}
												/>
											</div>
										</div>
									</fieldset>
								))
							}
							<Button
								type="dashed"
								onClick={() => {
									addBoss();
								}}
								block
							>
								<PlusOutlined/> Add boss
							</Button>
						</>
					)
				}}
			</List>
		</>
	)
}
