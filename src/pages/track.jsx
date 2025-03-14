import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ResidentsLists from "../components/residents-lists";
import { connection } from "../config/getConnection";

function Dashboard() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: "10.6765",
    lng: "122.9510",
  });
  const [currentMarker, setCurrentMarker] = useState({
    lat: "",
    lng: "",
  });


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


  useEffect(() => {
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

        {/* Residents List Section */}
        <ResidentsLists />
      </div>
    </div>
  );
}

export default Dashboard;
