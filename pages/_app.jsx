import {StoreProvider} from 'easy-peasy';
import {ConfigProvider} from 'antd';
import {AbilityContext} from '../components/Can';
import store from '../store';
import ability from '../ability';
import esEs from 'antd/lib/locale-provider/es_ES';
import NextNProgress from '../components/Progress';
import '../assets/css/global.scss';
import {useEffect, useState} from "react";

const WebApp = ({Component, pageProps}) => {
	const [color, setColor] = useState('#197e9a')
	
	const getColor = _ => {
		if (store.getState().auth && store.getState().auth.user) {
			if (store.getState().auth.user.scope[0] === 'company') {
				setColor('#019688')
			} else if (store.getState().auth.user.scope[0] === 'candidate') {
				setColor('orange')
			}
		}
	}
	
	useEffect(() => {
		getColor()
	}, [])
	
	return (
		<StoreProvider store={store}>
			<AbilityContext.Provider value={ability()}>
				<ConfigProvider locale={esEs}>
					<NextNProgress color={color}
					/>
					<Component {...pageProps} />
				</ConfigProvider>
			</AbilityContext.Provider>
		</StoreProvider>
	)
}

export default WebApp;
