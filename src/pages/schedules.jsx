import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AddSchedule from "../components/add-schedule-modal";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { connection } from "../config/getConnection";

const localizer = momentLocalizer(moment);

function Dashboard() {
  const [addSchedule, setAddSchedule] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      height: "100%",
    };
    return { style };
  };

  const getSchedules = async (e) => {
    try {
      const response = await axios.get(`${connection()}/api/schedules`);
      if (response.data === 'No schedules found') return
  
      setSchedules(response.data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  
  useEffect(() => {
    getSchedules();
  }, []);

  const events = schedules.length ? schedules.map((schedule) => ({
    ...schedule,
    start: new Date(schedule.start),
    end: new Date(schedule.end),
    color: schedule.title === 'Trash Collection' ? 'black' : 'red'
  })) : []

  return (
    <div className="w-full h-screen p-15 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide text-slate-800">
          Collection Schedule
        </h1>
        <button
          className="flex gap-3 py-3 px-5 bg-slate-900 text-white font-medium rounded-lg items-center cursor-pointer"
          onClick={() => setAddSchedule(true)}
        >
          <Plus />
          <span>Add Collection Schedule</span>
        </button>
      </div>
      <div className="flex gap-10">
        <div className="w-2/5 h-[60dvh] border border-gray-300 bg-white shadow rounded-lg flex flex-col gap-y-5 p-5">
          <h1 className="font-bold text-lg">Calendar View</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            views={{ month: true }}
            defaultView="month"
            toolbar={true}
          />
        </div>
        <div className="w-3/5 h-fit border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
          <h1 className="font-bold text-lg">Calendar View</h1>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            views={{ week: true }}
            defaultView="week"
            toolbar={true}
          />
        </div>
      </div>
      {addSchedule && <AddSchedule setAddSchedule={setAddSchedule} getSchedules={getSchedules} />}
    </div>
  );
}

export default Dashboard;
