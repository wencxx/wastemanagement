import { useEffect, useState } from "react";
import { connection } from "../config/getConnection";

function ResidentsLists({ selectedLoc }) {
  const [residents, setResidents] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [puroks, setPuroks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [residentToDelete, setResidentToDelete] = useState(null);

  const getPuroks = async (e) => {
    // setSelectedLocation(true);
    try {
      const response = await fetch(`${connection()}/api/purok`);
      if (response.ok) {
        const data = await response.json();
        setPuroks(Array.isArray(data) ? data : []);
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

  const [locationSelected, setLocationSelected] = useState('')

  const getResidents = async (e) => {
    const value = e ? e.target.value : selectedLoc;
    setSelectedLocation(true);
    setLocationSelected(value)
    try {
      const response = await fetch(
        `${connection()}/api/residents?location=${value}`
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

  const confirmDelete = (resident) => {
    setResidentToDelete(resident);
    setShowModal(true);
  };

  const deleteResident = async () => {
    try {
      const response = await fetch(`${connection()}/api/residents/${residentToDelete._id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setResidents(residents.filter(resident => resident._id !== residentToDelete._id));
        setShowModal(false);
        setResidentToDelete(null);
      } else {
        console.error("Failed to delete resident");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full lg:w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wide text-slate-800">
          Residents
        </h3>
        {!selectedLoc && (
          <select
            className="border border-gray-300 rounded p-2"
            onChange={getResidents}
            value={locationSelected}
          >
            <option value='' disabled>Choose Location</option>
            {puroks.length > 0 && puroks.map((purok, index) => (
                <option key={index}>{purok.name}</option>
            ))}
          </select>
        )}
      </div>
      <div className="space-y-2">
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
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => confirmDelete(resident)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">No Residents found</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-xl mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete {residentToDelete.name}?</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-black px-3 py-1 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={deleteResident}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResidentsLists;
