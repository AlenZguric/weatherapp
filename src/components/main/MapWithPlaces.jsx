import { useMemo, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import Select from "react-select";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { API_Key_Google } from "../../Api/ApiKey";

const MapWithPlaces = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_Key_Google,
    libraries: ["places"],
  });

  const handleSelect = async (option) => {
    const results = await getGeocode({ address: option.label });
    const { lat, lng } = await getLatLng(results[0]);
    setSelectedLocation({ lat, lng });
  };

  const center = useMemo(() => selectedLocation || { lat: 43.45, lng: -80.49 }, [
    selectedLocation,
  ]);

  return (
    <>
      <div className="places-container">
        <PlacesAutocomplete setSelectedLocation={setSelectedLocation} />
      </div>

      {isLoaded && (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
          {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
      )}
    </>
  );
};

const PlacesAutocomplete = ({ setSelectedLocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleChange = async (value) => {
    setValue(value, false);
    clearSuggestions();
  };

  return (
    <Select
      value={{ label: value }}
      onChange={handleSelect}
      options={status === "OK" ? data.map(({ place_id, description }) => ({ value: place_id, label: description })) : []}
      onInputChange={handleChange}
    />
  );
};

export default MapWithPlaces;
