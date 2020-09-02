import MainMenu from './MainMenu';

const MainHeader = props => {
  return (
    <header className={`app--header umana__header ${props.layout}`}>
      <MainMenu />
    </header>
  );
};

export default MainHeader;
