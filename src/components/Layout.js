import { Outlet } from "react-router-dom";
import Header from "../pages/header";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
