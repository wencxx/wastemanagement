import React, { useState, useEffect } from "react";
import { Plus, Trash } from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import AddSchedule from "../components/add-schedule-modal";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { connection } from "../config/getConnection";

const localizer = momentLocalizer(moment);

function Schedules() {
  const [addSchedule, setAddSchedule] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

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

  const deleteSchedule = async (id) => {
    try {
      await axios.delete(`${connection()}/api/schedules/${id}`);
      setSchedules(schedules.filter(schedule => schedule._id !== id));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDelete = (id) => {
    setScheduleToDelete(id);
    setDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      deleteSchedule(scheduleToDelete);
      setDeleteConfirm(false);
      setScheduleToDelete(null);
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
    <div className="w-full h-full p-5 !lg:p-15 pt-0 space-y-10 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl lg:text-3xl font-bold tracking-wide text-slate-800">
          Collection Schedule
        </h1>
        <button
          className="flex gap-3 py-1 lg:py-3 px-2 lg:px-5 bg-slate-900 text-white font-medium rounded-lg items-center cursor-pointer"
          onClick={() => setAddSchedule(true)}
        >
          <Plus />
          <span className="hidden lg:block">Add Collection Schedule</span>
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/5 h-[60dvh] border border-gray-300 bg-white shadow rounded-lg flex flex-col gap-y-5 p-5">
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
        <div className="w-full lg:w-3/5 h-fit border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
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
          <div className="flex flex-col gap-y-5">
            <h3 className="text-lg capitalize font-medium">Schedule lists</h3>
            {schedules.map((schedule) => (
              <div key={schedule._id} className="flex justify-between items-center border-b pb-2">
                <span>{schedule.title}</span>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(schedule._id)}
                >
                  <Trash />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {addSchedule && <AddSchedule setAddSchedule={setAddSchedule} getSchedules={getSchedules} />}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25 bg-opacity-50 z-[1000]">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this schedule?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={() => setDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={confirmDelete}
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

export default Schedules;
