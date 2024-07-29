import { Outlet, useLocation } from "react-router-dom";
import Logo from "./asset/logo.png"


const AdminLayout = () => {
    const { pathname } = useLocation()

    return (
        <div className="min-w-[1024px]">
            {pathname === "/admin" ? null :
                <div className=" relative">
                    <div className="flex items-center justify-center  py-7">
                        <img src={Logo} className="w-16 bg-cover" />
                        <div className="font-gmarket text-5xl">Re:Bid</div>
                    </div>
                    <div className="font-thin badge badge-ghost rounded-lg px-2 absolute top-2 -right-10">Manager</div>
                </div>}

            <Outlet />
        </div>
    );
};

export default AdminLayout;