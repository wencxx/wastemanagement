import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState } from 'react';
import { PanelLeftClose } from 'lucide-react'

function Layout() {
    const isAuthenticated = !!localStorage.getItem("token");
    const [isCollapsed, setIsCollapsed] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return ( 
        <div className="bg-gray-100 flex">
            <Sidebar isCollapsed={isCollapsed} />
            <div className="w-full">
                <header className="h-[8dvh] w-full flex items-center px-5">
                    <PanelLeftClose onClick={() => setIsCollapsed((prev) => !prev)} />
                </header>
                <div className="h-[92dvh]">
                    <Outlet />
                </div>
            </div>
        </div>
     );
}

export default Layout;