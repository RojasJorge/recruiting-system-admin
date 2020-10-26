import MainMenu from './MainMenu';

const MainHeader = props => {
  return (
    <div className={`app--header umana__header ${props.layoutcontainer}`}>
      <MainMenu />
    </div>
  );
};

export default MainHeader;
