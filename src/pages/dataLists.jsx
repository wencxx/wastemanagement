import { Send, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ResidentsLists from "../components/residents-lists";
import { connection } from "../config/getConnection";
import axios from "axios";

function DataLists() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [puroks, setPuroks] = useState([]);
  const [adding, setAdding] = useState(false)
  const [mess, setMess] = useState('')

  const addResident = async () => {
    const residentData = { name, phone, location };
    try {
      setAdding(true)
      const response = await axios.post(
        `${connection()}/api/residents`, residentData);
      // console.log(response.data)
      if (response.data === 'Added new resident') {
        console.log("Resident added successfully");
        setMess('Resident added successfully')
      } else {
        console.error("Failed to add resident");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setAdding(false)
      setName('')
      setPhone('')
      setLocation('')
      setTimeout(() => {
        setMess('')
      }, 3000)
    }
  };

  const getPuroks = async (e) => {
    try {
      const response = await axios.get(`${connection()}/api/purok`);
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
    <div className="w-full h-full p-5 !lg:p-15 pt-0 space-y-10 overflow-y-auto">
      <h1 className="text-xl lg:text-3xl font-bold tracking-wide text-slate-800">
        Resident Data
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <form
          className="w-full lg:w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            addResident();
          }}
        >
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Add New Resident
          </h3>
          {mess && ( <p className="bg-green-500 text-white rounded pl-2 py-1">{mess}</p> )}
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
            className={`p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3 ${adding && 'animate-pulse'}`}
            type="submit"
            disabled={adding}
          >
            <Send />
            <span>{adding ? 'Adding resident' : 'Add Resident'}</span>
          </button>
        </form>
        <ResidentsLists />
      </div>
    </div>
  );
}

export default DataLists;
