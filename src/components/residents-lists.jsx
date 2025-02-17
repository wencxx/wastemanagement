import { useState } from "react";

function ResidentsLists() {
    const [residents, setResidents] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(false);

    const getResidents = async (e) => {
        const { value } = e.target;
        setSelectedLocation(true);
        try {
            const response = await fetch(`http://localhost:5000/api/residents?location=${value}`);
            if (response.ok) {
                const data = await response.json();
                setResidents(data);
            } else {
                console.error("Failed to fetch residents");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return ( 
        <div className="w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold tracking-wide text-slate-800">Residents Lists</h3>
                <select className="border border-gray-300 rounded p-2" onChange={getResidents}>
                    <option>Choose Location</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
            </div>
            { !selectedLocation && <h4 className="text-gray-400 text-center text-xl">Select a location to view residents</h4> }
            { residents.length > 0 && residents.map((resident) => (
                <div key={resident._id} className="flex justify-between items-center border border-gray-300 p-2 rounded">
                    <div>
                        <h4 className="font-semibold text-slate-800">{resident.name}</h4>
                        <p className="text-gray-400">{resident.phone}</p>
                    </div>
                    <div>
                        <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                    </div>
                </div>
            ) ) }
            { residents.length == 0  && selectedLocation && <p className="text-center text-gray-400 text-lg">No Residents found</p> }
        </div>
     );
}

export default ResidentsLists;