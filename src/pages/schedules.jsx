import { Send, Plus } from "lucide-react";

function Dashboard() {
    return ( 
        <div className="w-full h-screen p-15 space-y-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-wide text-slate-800">Collection Schedule</h1>
                <button className="flex gap-3 py-3 px-5 bg-slate-900 text-white font-medium rounded-lg items-center cursor-pointer">
                    <Plus />
                    <span>Add Collection Schedule</span>
                </button>
            </div>
            <div className="flex gap-10">
                <div className="w-2/5 h-[50dvh] border border-gray-300 bg-white shadow rounded-lg flex flex-col gap-y-5 p-5">
                    <h1 className="font-bold text-lg">Calendar View</h1>
                </div>
                <div className="w-3/5 h-[50dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
                    
                </div>
            </div>
        </div>
     );
}

export default Dashboard;