import { Outlet, useLocation } from "react-router-dom";
import Logo from "./asset/logo.png"


const AdminLayout = () => {
    const { pathname } = useLocation()

    return (
        <div className=" min-h-screen min-w-[1024px]">
            {pathname === "/admin" ? null :
                <div className=" flex items-center justify-center  py-7 ">
                    <img src={Logo} className="w-16 bg-cover" />
                    <div className="font-gmarket text-5xl relative">
                        Re:Bid
                        <div className="font-thin badge badge-ghost rounded-lg px-2 absolute -top-7 -right-10">Manager</div>
                    </div>

                </div>}

            <div className=" max-w-[1024px] ">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;