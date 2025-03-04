import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-kml";
import "leaflet/dist/leaflet.css";

function KMLLayer() {
  const map = useMap();

  useEffect(() => {
    fetch("/map.kml")
      .then((response) => response.text())
      .then((kmlText) => {
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmlText, "text/xml");
        const kmlLayer = new L.KML(kml);

        if (map && kmlLayer) {
          map.addLayer(kmlLayer);
          map.fitBounds(kmlLayer.getBounds());
        }
      })
      .catch((error) => console.error("Error loading KML:", error));
  }, [map]);

  return null;
}

function Dashboard() {
  const [currentLocation, setCurrentLocation] = useState({
    lat: "14.8573",
    lng: "14.8573",
  });

  const getLocation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/location");
      console.log(res.data)
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
        {/* Map Section */}
        <div className="w-3/5 border border-gray-300 bg-white shadow rounded-lg h-[80dvh] flex flex-col gap-y-8 p-5">
          <h3 className="text-xl font-semibold tracking-wide text-slate-800">
            Collection Map
          </h3>
          <div className="w-full h-full bg-gray-200 rounded-lg map">
            <MapContainer
              center={[currentLocation.lat, currentLocation.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              <KMLLayer />
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
