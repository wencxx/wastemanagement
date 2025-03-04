import { useState } from 'react'
import { Plus } from "lucide-react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { enUS } from 'date-fns/locale';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Trash Collection",
    start: new Date(2025, 2, 2, 0, 0),
    end: new Date(2025, 2, 2, 5, 59),
    color: "black",
  },
  {
    title: "No Collection",
    start: new Date(2025, 1, 10, 0, 0),
    end: new Date(2025, 1, 10, 23, 59),
    color: "red",
  },
  {
    title: "Non-biodegradable",
    start: new Date(2025, 1, 11, 0, 0),
    end: new Date(2025, 1, 11, 23, 59),
    color: "yellow",
  },
];

function Dashboard() {
  const [myEvents, setMyEvents] = useState(events);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      height: '100%'
    };
    return { style };
  };

  return (
    <div className="w-full h-screen p-15 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-wide text-slate-800">
          Collection Schedule
        </h1>
        <button className="flex gap-3 py-3 px-5 bg-slate-900 text-white font-medium rounded-lg items-center cursor-pointer">
          <Plus />
          <span>Add Collection Schedule</span>
        </button>
      </div>
      <div className="flex gap-10">
        <div className="w-2/5 h-[60dvh] border border-gray-300 bg-white shadow rounded-lg flex flex-col gap-y-5 p-5">
          <h1 className="font-bold text-lg">Calendar View</h1>
          <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            defaultView="month" // Default to month view
            toolbar={false}
          />
        </div>
        <div className="w-3/5 h-fit border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
          <h1 className="font-bold text-lg">Calendar View</h1>
          <Calendar
            localizer={localizer}
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={eventStyleGetter}
            defaultView="week" // Default to month view
            toolbar={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
