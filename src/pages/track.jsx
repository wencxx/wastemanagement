import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { connection } from "../config/getConnection";
import moment from 'moment'

function Dashboard() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: "10.6765",
    lng: "122.9510",
  });
  const [currentMarker, setCurrentMarker] = useState({
    lat: "",
    lng: "",
  });
  const [todaysSchedules, setTodaysSchedules] = useState([]);

  const getLocation = async () => {
    try {
      const res = await axios.get(`${connection()}/api/location`);
      if (res.data !== "No location set") {
        setCurrentLocation({ ...res.data });
        setCurrentMarker({ ...res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTodaysSchedules = async () => {
    try {
      const res = await axios.get(`${connection()}/api/todays-schedules`);
      setTodaysSchedules(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTodaysSchedules();

    const intervalId = setInterval(() => {
      getLocation();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-full p-5 !lg:p-15 pt-0 space-y-10 overflow-y-auto">
      <h1 className="text-xl lg:text-3xl font-bold tracking-wide text-slate-800">
        Track Collection
      </h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-3/5 border border-gray-300 bg-white shadow rounded-lg h-[80dvh] flex flex-col gap-y-8 p-5">
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Collection Map
          </h3>
          <div className="w-full h-full bg-gray-200 rounded-lg map">
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={20}
              style={{ height: "100%", width: "100%" }}
              key={`${currentLocation.lat}-${currentLocation.lng}`}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[currentMarker.lat, currentMarker.lng]}>
                <Popup>
                  Current Location: {currentMarker.lat}, {currentMarker.lng}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* todays schedule */}
        <div className="w-full lg:w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-wide text-slate-800">
              Today Schedules
            </h3>
          </div>
          <div className="space-y-2">
            {todaysSchedules.length ? (
              todaysSchedules.map((schedule) => (
                <div key={schedule._id} className="flex justify-between items-center border border-gray-300 p-2 rounded">
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {schedule.purokName}
                    </h4>
                    <p className="text-gray-400">
                      {moment(schedule.start).format('LLL')} - {moment(schedule.end).format('LLL')}
                    </p>
                    <p className="text-gray-400">
                      Status: {schedule.title}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No schedules for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
