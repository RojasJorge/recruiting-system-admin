import { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Menu, Icon, Avatar, Modal } from "antd";
import Router from "next/router";
import UmanaLogo from "../Misc/UmanaLogo";

const MainMenu = () => {
	const isMain = /\/[a-z]/i;
	const [current, setCurrent] = useState("/");
	
	const user = useStoreState(state => state.auth.user);
	const signOut = useStoreActions(actions => actions.auth.logout);
	
	const handleClick = e => {
		if (e.key === "logout") {
			return;
		}
		
		/** Switch changes. */
		setCurrent(e.key);
		Router.push(`/${e.key === "dashboard" ? "" : e.key}`);
	};
	
	const handleLogout = () => {
		Modal.confirm({
			content: "Confirm logout?",
			okText: "Logout",
			onOk: () => {
				Router.push("/");
				signOut();
			}
		});
	};
	
	useEffect(() => {
		setCurrent(
			!Router.pathname.match(isMain)
				? "dashboard"
				: Router.pathname.replace("/", "")
		);
	}, []);
	
	return (
		<>
			<div className="menu--user">
				<div className="container">
					<div className="row align-items-center">
						<div className="col">
							<UmanaLogo />
						</div>
						<div className="col">
							<Menu
							trigger="click"
								mode="horizontal"
								onClick={handleClick}
								selectedKeys={[current]}
								style={{
									backgroundColor: 'transparent',
									textAlign: 'right',
									paddingBottom: 24
								}}>
								<Menu.Item key="admin/companies">
									Empresas
								</Menu.Item>
								<Menu.SubMenu
									title={
										<span className="submenu-title-wrapper">
											{user.name}{" "}
				              <Icon type="down" />
				            </span>
									}>
									<Menu.Item key="admin/profile">
										<Icon type="user" />
										Mi perfil
									</Menu.Item>
									<Menu.Item key="logout">
										<a
											href="#"
											onClick={e => {
												e.preventDefault();
												handleLogout();
											}}
										>
											<Icon type="logout" /> Cerrar sesión
										</a>
									</Menu.Item>
								</Menu.SubMenu>
							</Menu>
						</div>
					</div>
				</div>
			</div>
			{/*App menu*/}
			<div className="menu--admin">
				<div className="container">
					<div className="row">
						<div className="col">
							<Menu
								onClick={handleClick}
								selectedKeys={[current]}
								mode="horizontal"
								theme="dark"
								style={{
									backgroundColor: 'transparent',
									textAlign: 'right'
								}}
							>
								<Menu.Item key="admin/catalogs">
									Catalogos
								</Menu.Item>
								<Menu.Item key="dashboard">
									<Icon type="dashboard" />
									Tablero
								</Menu.Item>
								<Menu.Item key="admin/users">
									<Icon type="file-search" />
									Usuarios
								</Menu.Item>
							</Menu>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MainMenu;
