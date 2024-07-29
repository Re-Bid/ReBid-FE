import { Outlet } from "react-router-dom";
import Navigation from "./components/navigation";

export default function Layout() {
  return (
    <div className="px-10">
      <div>
        <Navigation />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
