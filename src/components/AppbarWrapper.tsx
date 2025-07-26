import { Outlet } from "react-router-dom";
import Appbar from "./Appbar";

const AppbarWrapper = () => {
  return (
    <>
      <>
        <Appbar />
        <Outlet />
      </>
    </>
  );
};

export default AppbarWrapper;
