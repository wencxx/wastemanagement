import { Send } from "lucide-react";

function Dashboard() {
    return ( 
        <div className="w-full h-screen p-15 space-y-10">
            <h1 className="text-3xl font-bold tracking-wide text-slate-800">Dashboard</h1>
            <div className="flex gap-10">
                <form className="w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5">
                    <h3 className="text-xl font-semibold tracking-wide text-slate-800">Send Message</h3>
                    <select className="p-2 border border-gray-300 rounded">
                        <option>Choose Location</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                    </select>
                    <textarea className="p-2 border border-gray-300 rounded min-h-62" placeholder="Type your message here">

                    </textarea>
                    <button className="p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3">
                        <Send />
                        <span>
                            Send Message
                        </span>
                    </button>
                </form>
                <div className="w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
                    <h3 className="text-xl font-semibold tracking-wide text-slate-800">Residents</h3>
                    <h4 className="text-gray-400 text-center text-xl">Select a location to view residents</h4>
                </div>
            </div>
        </div>
     );
}

export default Dashboard;