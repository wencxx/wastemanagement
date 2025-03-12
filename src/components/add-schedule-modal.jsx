import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { connection } from "../config/getConnection";

const localizer = momentLocalizer(moment);

function AddSchedule({ setAddSchedule, getSchedules }) {
  const [selectedSlot, setSelectedSlot] = useState({ start: null, end: null });
  const [puroks, setPuroks] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [emptyDate, setEmptyDate] = useState(false);

  const getPuroks = async (e) => {
    try {
      const res = await axios.get(`${connection()}/api/purok`);
      if (res) {
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

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
  };

  const addSchedule = async () => {
    const { start, end } = selectedSlot;
    if (start && end && selectedLocation && selectedType) {
      setEmptyDate(false);
      try {
        const res = await axios.post(`${connection()}/api/schedules`, {
            purokID: selectedLocation,
            start: selectedSlot.start,
            end: selectedSlot.end,
            title: selectedType
        })

        if(res.data === 'Scheduled a collection') {
            setAddSchedule(false)
            getSchedules()
        }

      } catch (error) {
        console.log(error)
      }
    } else {
      setEmptyDate(true);
    }
  };

  const handPurokChange = (e) => {
    setSelectedLocation(e.target.value)
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value)
  }

  return (
    <div className="w-screen h-screen bg-black/15 fixed top-0 left-0 flex items-center justify-center z-[1000]">
      <div className="bg-white p-10 w-full max-w-2xl space-y-5 rounded-lg border border-gray-300">
        <h1 className="text-center text-xl font-medium">Schedule Cllection</h1>
        {emptyDate && (
          <p className="bg-red-500 text-white py-1 pl-2 rounded">
            Please select all required field
          </p>
        )}
        <Calendar
          localizer={localizer}
          selectable
          onSelectSlot={handleSelectSlot}
          startAccessor="start"
          endAccessor="end"
          views={["week", "day"]}
          defaultView="week"
          style={{ height: 500 }}
        />
        <div className="w-full flex items-center gap-x-2">
            <select className="border border-gray-200 pl-2 rounded w-1/2 h-10 bg-gray-50" value={selectedLocation} onChange={handPurokChange}>
              <option value="" disabled>
                Select Purok
              </option>
              {puroks.map((purok, index) => (
                <option value={purok._id} key={index}>{purok.name}</option>
              ))}
            </select>
            <select className="border border-gray-200 pl-2 rounded w-1/2 h-10 bg-gray-50" value={selectedType} onChange={handleTypeChange}>
              <option value="" disabled>
                Select Type
              </option>
              <option>
                No Collection
              </option>
              <option>
                Trash Collection
              </option>
            </select>
        </div>
        <div className="flex justify-end items-center gap-x-3">
            <button
              onClick={() => setAddSchedule(false)}
              className="text-slate-800 rounded px-3 py-2 cursor-pointer"
            >
              close
            </button>
            <button
              onClick={addSchedule}
              className="bg-slate-800 text-white rounded px-3 py-2 cursor-pointer"
            >
              Schedule Collection
            </button>
        </div>
      </div>
    </div>
  );
}

export default AddSchedule;
