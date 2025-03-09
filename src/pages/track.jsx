import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Dashboard() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: "10.6765",
    lng: "122.9510",
  });

  const getLocation = async () => {
    try {
      const res = await axios.get("https://wastemanagement-server.vercel.app/api/location");
      console.log(res.data);
      if (res.data !== "No location set") {
        setCurrentLocation({ ...res.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getLocation();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-screen p-15 space-y-10">
      <h1 className="text-3xl font-bold tracking-wide text-slate-800">
        Track Collection
      </h1>
      <div className="flex gap-10">
        <div className="w-3/5 border border-gray-300 bg-white shadow rounded-lg h-[80dvh] flex flex-col gap-y-8 p-5">
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
              <Marker position={[currentLocation.lat, currentLocation.lng]}>
                <Popup>
                  Current Location: {currentLocation.lat}, {currentLocation.lng}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

        {/* Residents List Section */}
        <div className="w-2/5 h-[80dvh] border border-gray-300 bg-white shadow rounded-lg p-5 flex flex-col gap-y-10">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold tracking-wide text-slate-800">
              Residents Lists
            </h3>
            <select className="border border-gray-300 rounded p-2">
              <option>Choose Location</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <h4 className="text-gray-400 text-center text-xl">
            Select a location to view residents
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
