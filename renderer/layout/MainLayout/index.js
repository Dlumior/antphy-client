const MainLayout = (props) => {
  const { children } = props;
  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand " href="#">
            🐜 Antphy
          </a>
        </div>
      </nav>
      <div className="container-fluid">{children}</div>
    </>
  );
};

export default MainLayout;
