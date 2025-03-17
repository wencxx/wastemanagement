import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import ResidentsLists from "../components/residents-lists";
import { connection } from "../config/getConnection";
import axios from "axios";

function Dashboard() {
  const [puroks, setPuroks] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [message, setMessage] = useState("");

  const getPuroks = async () => {
    try {
      const res = await axios.get(`${connection()}/api/purok`);
      if (res.data !== "No purok found") {
        setPuroks(res.data);
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

  const handleChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${connection()}/api/send-message`, {
        location: selectedLocation,
        message,
      });

      if (res.data === "Message sent successfully") {
        setSuccess(res.data);
      }
    } catch (error) {
      setErr(error.message);
    } finally {
      setSelectedLocation("");
      setMessage("");
      setLoading(false);
      setTimeout(() => {
        setSuccess("");
        setErr("");
      }, 3000);
    }
  };

  return (
    <div className="w-full h-full p-5 !lg:p-15 pt-0 space-y-10 overflow-y-auto">
      <h1 className="text-xl lg:text-3xl font-bold tracking-wide text-slate-800">
        Message
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <form
          onSubmit={sendMessage}
          className="w-full lg:w-3/5 border border-gray-300 bg-white shadow rounded-lg h-fit flex flex-col gap-y-5 p-5"
        >
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Send Message
          </h3>
          {success && (
            <p className="bg-green-500 pl-2 rounded text-white py-1">
              {success}
            </p>
          )}
          {err && (
            <p className="bg-red-500 pl-2 rounded text-white py-1">{err}</p>
          )}
          <select
            className="p-2 border border-gray-300 rounded"
            onChange={handleChange}
            value={selectedLocation}
          >
            <option value="" disabled>
              Choose Location
            </option>
            {puroks.length > 0 &&
              puroks.map((purok, index) => (
                <option key={index} value={purok.name}>
                  {purok.name}
                </option>
              ))}
          </select>
          <textarea
            className="p-2 border border-gray-300 rounded min-h-62"
            placeholder="Type your message here"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button className={`p-2 py-3 bg-slate-900 text-white rounded flex justify-center items-center gap-3 ${loading && 'animate-pulse'}`} disabled={loading}>
            <Send />
            <span>{loading ? 'Sending Message' : 'Send Message'}</span>
          </button>
        </form>
        {selectedLocation ? (
          <ResidentsLists selectedLoc={selectedLocation} />
        ) : (
          <div className="w-full lg:w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
            <h3 className="text-xl font-semibold tracking-wide text-slate-800">
              Residents
            </h3>
            <h4 className="text-gray-400 text-center text-xl">
              Select a location to view residents
            </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
