import MainMenu from './MainMenu'

const MainHeader = props => {
	
	return (
		<div className={`app--header umana__header ${props.layout}`}>
			<MainMenu/>
		</div>
	)
}

export default MainHeader
