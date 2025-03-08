import { Send, Plus } from "lucide-react";
import { useState } from "react";
import ResidentsLists from "../components/residents-lists";

function Dashboard() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const addResident = async () => {
    const residentData = { name, phone, location };
    try {
      const response = await fetch("https://wastemanagement-server.vercel.app/api/residents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(residentData),
      });
      if (response.ok) {
        console.log("Resident added successfully");
      } else {
        console.error("Failed to add resident");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full h-screen p-15 space-y-10">
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
              <option>Choose Location</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <button
            className="p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3"
            type="submit"
          >
            <Send />
            <span>Send Message</span>
          </button>
        </form>
        <ResidentsLists />
      </div>
    </div>
  );
}

export default Dashboard;
