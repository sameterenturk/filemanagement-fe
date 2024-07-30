import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/files">FileList</Link>
          </li>
          <li>
            <Link to="/upload">FileUpload</Link>
          </li>
          <li>
            <Link to="/filedetails">FileDetails</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
