import { Menu } from 'antd'
import { fullScreen } from "@ant-design/icons"

const ViewTools = ({ fullScreen, switchFullScreen }) => {
	
	const handleClick = e => {
		if (e.key === "sf") {
			switchFullScreen(!fullScreen)
		}
	}
	
	return(<>
			<div className={`app--tools`}>
				<div className="trigger">
					<div className="container">
						<Menu onClick={handleClick}>
							<Menu.SubMenu title={<Icon type="setting" />}>
								<Menu.Item key="sf">
									<fullScreen />
									Pantalla completa
								</Menu.Item>
							</Menu.SubMenu>
						</Menu>
					</div>
				</div>
			</div>
	</>)
}

export default ViewTools
