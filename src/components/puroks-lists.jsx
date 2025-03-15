import { useEffect, useState } from "react";
import { connection } from "../config/getConnection";

function PuroksLists() {
  const [puroks, setPuroks] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [purokToDelete, setPurokToDelete] = useState(null);

  const getPuroks = async (e) => {
    setSelectedLocation(true);
    try {
      const response = await fetch(`${connection()}/api/purok`);
      if (response.ok) {
        const data = await response.json();
        setPuroks(data);
      } else {
        console.error("Failed to fetch puroks");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const deletePurok = async (id) => {
    try {
      const response = await fetch(`${connection()}/api/purok/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPuroks(puroks.filter((purok) => purok._id !== id));
        setShowModal(false);
      } else {
        console.error("Failed to delete purok");
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getPuroks();
  }, []);

  return (
    <div className="w-full lg:w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-wide text-slate-800">
          Purok Lists
        </h3>
      </div>
      {!selectedLocation && (
        <h4 className="text-gray-400 text-center text-xl">
          Select a location to view puroks
        </h4>
      )}
      <div className="flex flex-col space-y-2">
        {puroks.length > 0 &&
          puroks.map((purok) => (
            <div
              key={purok._id}
              className="flex justify-between items-center border border-gray-300 p-2 rounded"
            >
              <div>
                <h4 className="font-semibold text-slate-800">{purok.name}</h4>
                {/* <p className="text-gray-400">{purok.phone}</p> */}
              </div>
              <div>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => {
                    setShowModal(true);
                    setPurokToDelete(purok._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        {!puroks.length && selectedLocation && (
          <p className="text-center text-gray-400 text-lg">No Puroks found</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-xl mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this purok??</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-black px-3 py-1 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => deletePurok(purokToDelete)}
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

export default PuroksLists;
