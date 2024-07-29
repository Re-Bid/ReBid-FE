import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";

export default function Layout() {
  return (
    <div className="min-w-[1024px]">
      <div>
        <Navigation />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
