import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

function Layout() {
    return ( 
        <div className="bg-gray-100 flex">
            <Sidebar />
            <Outlet />
        </div>
     );
}

export default Layout;