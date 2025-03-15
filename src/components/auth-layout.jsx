import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./sidebar";
import { useState } from "react";
import { PanelLeftClose } from "lucide-react";

function Layout() {
  const isAuthenticated = !!localStorage.getItem("token");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleOutletClick = () => {
    if (window.innerWidth <= 768) { // Mobile devices
      setIsCollapsed(false);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-100 flex">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="w-full">
        <header className="h-[8dvh] w-full flex items-center px-5">
          <PanelLeftClose
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="cursor-pointer"
          />
        </header>
        <div className="h-[92dvh]" onClick={handleOutletClick}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
