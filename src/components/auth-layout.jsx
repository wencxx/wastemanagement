import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";

function Layout() {
    const isAuthenticated = !!localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return ( 
        <div className="bg-gray-100 flex">
            <Sidebar />
            <Outlet />
        </div>
     );
}

export default Layout;