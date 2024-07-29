import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import logo from "./asset/logo.png";

export default function Layout() {
  return (
    <div className="min-w-[1024px] flex flex-col justify-between min-h-screen">
      <div className="fixed z-50">
        <Navigation />
      </div>
      <div className="mt-[108px] z-10">
        <Outlet />
      </div>

      <div className="min-h-[150px] py-10 bg-neutral-200 px-10 opacity-50 text-[13px]">
        <img src={logo} alt="logo" className="size-12" />
        Copyright © 2024 - All right reserved by ACME Industries Ltd
      </div>
    </div>
  );
}
