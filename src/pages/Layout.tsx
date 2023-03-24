import { FC } from "react";
import { TopMenu } from "../component/TopMenu";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <>
      <TopMenu />
      <Outlet />
    </>
  );
};

export { Layout };
