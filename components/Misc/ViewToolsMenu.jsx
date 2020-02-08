import { useState } from "react";
import { Menu, Icon } from "antd";

const ViewTools = ({ fullScreen, switchFullScreen }) => {
	
	const handleClick = e => {
		if (e.key === "sf") {
			switchFullScreen(!fullScreen);
		}
	};
	
	return(<>
			<div className={`app--tools`}>
				<div className="trigger">
					<div className="container">
						<Menu onClick={handleClick}>
							<Menu.SubMenu title={<Icon type="setting" />}>
								<Menu.Item key="sf">
									<Icon type={!fullScreen ? 'fullscreen' : 'fullscreen-exit'} />
									Pantalla completa
								</Menu.Item>
							</Menu.SubMenu>
						</Menu>
					</div>
				</div>
			</div>
	</>);
};

export default ViewTools;
