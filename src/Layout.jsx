import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";
import logo from "./asset/logo.png";

export default function Layout() {
  return (
    <div className="flex flex-col justify-between min-h-screen max-w-[1024px]">
      <div>
        <Navigation />
      </div>
      <div className=" max-w-[1024px] flex-1">
        <Outlet />
      </div>

      <div className="min-h-[150px] py-10 bg-neutral-200 px-10 opacity-50 text-[13px] min-w-[1024px] ">
        <img src={logo} alt="logo" className="size-12" />
        Copyright © 2024 - All right reserved by 뀨쬬 SPARCS AI HACKATON Team
      </div>
    </div>
  );
}
