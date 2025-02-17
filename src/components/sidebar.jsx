import { User, MessageSquare, Calendar, MapPin, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

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

function Sidebar() {
    return ( 
        <div className="w-1/6 h-screen bg-white border border-gray-200">
            <div className="h-24 border-b border-gray-200 flex items-center px-5">
                <h1 className="font-bold text-xl text-neutral-600">Waste Management</h1>
            </div>
            <div className="h-24 border-b border-gray-200 flex items-center gap-x-5 px-10">
                <User size={31} className='' />
                <h2 className="font-bold text-xl text-neutral-600">Admin</h2>
            </div>
            <div className='h-5/7 border-b border-gray-200'>
                <ul className='flex flex-col p-5 gap-y-1'>
                    <NavItem to='/admin' end icon={MessageSquare} label='Message' />
                    <NavItem to='/admin/schedules' icon={Calendar} label='Schedules' />
                    <NavItem to='/admin/track' icon={MapPin} label='Track' />
                    <NavItem to='/admin/data-lists' icon={Users} label='Data Lists' />
                </ul>
            </div>
        </div>
     );
}

export default Sidebar;