import { useEffect, useRef, useState } from "react";
import type * as L from "leaflet";

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [coordinates, setCoordinates] = useState({
    lat: 23.2599,
    lng: 77.4126,
  });
  const [latInput, setLatInput] = useState("23.2599");
  const [lngInput, setLngInput] = useState("77.4126");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const loadMap = async () => {
      const L = (await import("leaflet")).default;

      // @ts-expect-error - Deleting internal Leaflet property
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current).setView(
          [coordinates.lat, coordinates.lng],
          13
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

        const marker = L.marker([coordinates.lat, coordinates.lng]).addTo(map);
        marker
          .bindPopup(`Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`)
          .openPopup();
        markerRef.current = marker;

        map.on("click", (e: L.LeafletMouseEvent) => {
          const { lat, lng } = e.latlng;
          setCoordinates({ lat, lng });
          setLatInput(lat.toFixed(5));
          setLngInput(lng.toFixed(5));

          if (markerRef.current) {
            markerRef.current.setLatLng([lat, lng]);
            markerRef.current.setPopupContent(
              `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
            );
            markerRef.current.openPopup();
          }
        });

        mapInstanceRef.current = map;
      }
    };

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
    document.head.appendChild(link);

    loadMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleManualUpdate = () => {
    const lat = parseFloat(latInput);
    const lng = parseFloat(lngInput);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Please enter valid coordinates");
      return;
    }

    setCoordinates({ lat, lng });

    if (mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setView([lat, lng], 13);
      markerRef.current.setLatLng([lat, lng]);
      markerRef.current.setPopupContent(
        `Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`
      );
      markerRef.current.openPopup();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-background/95 backdrop-blur-2xl p-4 border-b border-gray-300">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">Latitude</label>
            <input
              type="text"
              value={latInput}
              onChange={(e) => setLatInput(e.target.value)}
              className="w-full px-3 py-2 bg-black/10 border border-gray-600 rounded text-black text-sm focus:outline-none focus:border-red-500"
              placeholder="Enter latitude"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="text"
              value={lngInput}
              onChange={(e) => setLngInput(e.target.value)}
              className="w-full px-3 py-2 bg-black/10 border border-gray-600 rounded text-black text-sm focus:outline-none focus:border-red-500"
              placeholder="Enter longitude"
            />
          </div>

          <button
            onClick={handleManualUpdate}
            className="px-5 py-2 bg-[#b22828] hover:bg-red-500 text-white rounded transition text-sm font-medium"
          >
            Update
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          Click on the map or enter coordinates manually
        </p>
      </div>

      <div className="flex-1">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export { Map };
export default Map;
