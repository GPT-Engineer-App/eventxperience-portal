import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const VenueNavigation = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Venue Navigation</h2>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          { /* Child components, such as markers, info windows, etc. */ }
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default VenueNavigation;