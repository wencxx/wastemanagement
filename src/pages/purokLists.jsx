import { Send, Plus } from "lucide-react";
import { useState } from "react";
import PurokLists from "../components/puroks-lists";

function Dashboard() {
    const [name, setName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [adding, setAdding] = useState(false);

    const addPurok = async () => {
        const purokData = { name, lat, lng };
        try {
            setAdding(true);
            const response = await fetch("https://wastemanagement-server.vercel.app/api/purok", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(purokData),
            });
            console.log(response);
            if (response.ok) {
                console.log("Purok added successfully");
            } else {
                console.error("Failed to add Purok");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setAdding(false);
            setName("");
            setLat(""); 
            setLng("");
        }
    };

    return ( 
        <div className="w-full h-screen p-15 space-y-10">
            <h1 className="text-3xl font-bold tracking-wide text-slate-800">Purok Data</h1>
            <div className="flex gap-10">
                <form className="w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5" onSubmit={(e) => { e.preventDefault(); addPurok(); }}>
                    <h3 className="text-xl font-semibold tracking-wide text-slate-800">Add New Purok</h3>
                    <div className="flex flex-col gap-y-1">
                        <label className="font-medium" htmlFor="name">Purok Name</label>
                        <input type="text" id="name" placeholder="Enter purok name" className="border border-gray-300 pl-2 rounded h-10" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="font-medium" htmlFor="lat">Latitude</label>
                        <input type="number" placeholder="Enter latitude" id="lat" className="border border-gray-300 pl-2 rounded h-10" value={lat} onChange={(e) => setLat(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <label className="font-medium" htmlFor="lng">Longitude</label>
                        <input type="number" placeholder="Enter longitude" id="lng" className="border border-gray-300 pl-2 rounded h-10" value={lng} onChange={(e) => setLng(e.target.value)} />
                    </div>
                    <button className="p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3" type="submit" disabled={adding}>
                        <Send /> 
                        <span>
                            {adding ? "Adding..." : "Add Purok"}
                        </span>
                    </button>
                </form>
                <PurokLists />
            </div>
        </div>
     );
}

export default Dashboard;