import { useEffect, useState } from "react";

function ResidentsLists({ selectedLoc }) {
  const [residents, setResidents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [puroks, setPuroks] = useState([]);

  const getPuroks = async (e) => {
    setSelectedLocation(true);
    try {
      const response = await fetch(`https://wastemanagement-server.vercel.app/api/purok`);
      if (response.ok) {
        const data = await response.json();
        setPuroks(Array.isArray(data) ? data : []);
        console.log(data);
      } else {
        console.error("Failed to fetch puroks");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getPuroks();
  }, []);

  const getResidents = async (e) => {
    const value = e ? e.target.value : selectedLoc;
    setSelectedLocation(true);
    try {
      const response = await fetch(
        `https://wastemanagement-server.vercel.app/api/residents?location=${value}`
      );
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

  useEffect(() => {
    if (selectedLoc) {
      getResidents();
    }
  }, [selectedLoc]);

  return (
    <div className="w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wide text-slate-800">
          Residents
        </h3>
        {!selectedLoc && (
          <select
            className="border border-gray-300 rounded p-2"
            onChange={getResidents}
            value=''
          >
            <option value='' disabled>Choose Location</option>
            {puroks.length > 0 && puroks.map((purok, index) => (
                <option key={index}>{purok.name}</option>
            ))}
          </select>
        )}
      </div>
      {!selectedLocation ? (
        <h4 className="text-gray-400 text-center text-xl">
          Select a location to view residents
        </h4>
      ) : residents.length > 0 ? (
        residents.map((resident) => (
          <div
            key={resident._id}
            className="flex justify-between items-center border border-gray-300 p-2 rounded"
          >
            <div>
              <h4 className="font-semibold text-slate-800">{resident.name}</h4>
              <p className="text-gray-400">{resident.phone}</p>
            </div>
            <div>
              <button className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-400 text-lg">No Residents found</p>
      )}
    </div>
  );
}

export default ResidentsLists;
