import { Send, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ResidentsLists from "../components/residents-lists";
import { connection } from "../config/getConnection";
import axios from "axios";

function Dashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [puroks, setPuroks] = useState([]);

  const addResident = async () => {
    const residentData = { name, phone, location };
    try {
      const response = await axios.post(
        `${connection()}/api/residents`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(residentData),
        }
      );
      if (response.data === 'Added new resident') {
        console.log("Resident added successfully");
      } else {
        console.error("Failed to add resident");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getPuroks = async (e) => {
    try {
      const response = await axios.get(`${connection()}/api/purok`);
      console.log("Puroks response:", response.data); 
      if (Array.isArray(response.data)) {
        setPuroks(response.data);
      } else {
        console.error("Unexpected response format", response.data);
        setPuroks([]);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    getPuroks();
  }, []);

  return (
    <div className="w-full h-full p-15 pt-0 space-y-10">
      <h1 className="text-3xl font-bold tracking-wide text-slate-800">
        Resident Data
      </h1>
      <div className="flex gap-10">
        <form
          className="w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addResident();
          }}
        >
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Add New Resident
          </h3>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter resident name"
              className="border border-gray-300 pl-2 rounded h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              className="border border-gray-300 pl-2 rounded h-10"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="font-medium" htmlFor="location">
              Location
            </label>
            <select
              className="p-2 border border-gray-300 rounded h-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option disabled value=''>Choose Location</option>
              {puroks.length && puroks.map((purok, index) => (
                  <option key={index}>{purok.name}</option>
              ))}
            </select>
          </div>
          <button
            className="p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3"
            type="submit"
          >
            <Send />
            <span>Add Resident</span>
          </button>
        </form>
        <ResidentsLists />
      </div>
    </div>
  );
}

export default Dashboard;
