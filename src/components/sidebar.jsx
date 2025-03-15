import { User, MessageSquare, Calendar, MapPin, Users, MapPinned, LogOut, AlignJustify } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

function NavItem({ to, end, icon: Icon, label }) {
    return (
        <li className='text-neutral-600'>
            <NavLink to={to} end={end} className={({ isActive }) => `flex gap-x-2 items-center hover:bg-gray-100 px-5 py-3 rounded ${isActive ? 'bg-gray-100' : ''}`}>
                <Icon />
                <span className='text-lg font-medium'>{label}</span>
            </NavLink>
        </li>
    );
}

function Sidebar({ isCollapsed, setIsCollapsed }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return ( 
        <>
            <div className={`h-screen w-80 bg-white border border-gray-200 overflow-hidden duration-300 hidden lg:block ${isCollapsed && '!w-0'}`}>
                <div className="h-[9dvh] border-b border-gray-200 flex items-center px-5">
                    <h1 className={`font-bold text-xl text-neutral-600`}>Waste Management</h1>
                </div>
                <div className="h-[9dvh] border-b border-gray-200 flex items-center gap-x-5 px-10">
                    <User size={31} className='' />
                    <h2 className={`font-bold text-xl text-neutral-600`}>Admin</h2>
                </div>
                <div className='h-[73dvh] border-b border-gray-200'>
                    <ul className='flex flex-col p-5 gap-y-1'>
                        <NavItem to='/admin' end icon={MessageSquare} label='Message' />
                        <NavItem to='/admin/schedules' icon={Calendar} label='Schedules' />
                        <NavItem to='/admin/track' icon={MapPin} label='Track' />
                        <NavItem to='/admin/data-lists' icon={Users} label='Data Lists' />
                        <NavItem to='/admin/purok-lists' icon={MapPinned} label='Purok Lists' />
                        <NavItem to='/admin/user-lists' icon={Users} label='Users Lists' />
                    </ul>
                </div>
                <div className='flex items-center justify-center text-red-500 h-[8dvh]'>
                    <button onClick={handleLogout} className='cursor-pointer flex items-center gap-x-2'>
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
            <div className={`h-screen w-0 lg:w-80 bg-white border border-gray-200  overflow-hidden duration-300 block lg:hidden fixed top-0 left-0 z-[1100] ${isCollapsed && '!w-3/4'}`}>
                <div className="h-[9dvh] border-b border-gray-200 flex items-center justify-between px-5">
                    <h1 className={`font-bold text-xl text-neutral-600`}>Waste Management</h1>
                    <AlignJustify className='text-neutral-600' onClick={() => setIsCollapsed((prev) => !prev)}/>
                </div>
                <div className="h-[9dvh] border-b border-gray-200 flex items-center gap-x-5 px-10">
                    <User size={31} className='' />
                    <h2 className={`font-bold text-xl text-neutral-600`}>Admin</h2>
                </div>
                <div className='h-[73dvh] border-b border-gray-200'>
                    <ul className='flex flex-col p-5 gap-y-1'>
                        <NavItem to='/admin' end icon={MessageSquare} label='Message' />
                        <NavItem to='/admin/schedules' icon={Calendar} label='Schedules' />
                        <NavItem to='/admin/track' icon={MapPin} label='Track' />
                        <NavItem to='/admin/data-lists' icon={Users} label='Data Lists' />
                        <NavItem to='/admin/purok-lists' icon={MapPinned} label='Purok Lists' />
                        <NavItem to='/admin/user-lists' icon={MapPinned} label='Users Lists' />
                    </ul>
                </div>
                <div className='flex items-center justify-center text-red-500 h-[8dvh]'>
                    <button onClick={handleLogout} className='cursor-pointer flex items-center gap-x-2'>
                        <LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
     );
}

export default Sidebar;