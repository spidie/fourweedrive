import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [campsites, setCampsites] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/campsites')
      .then(response => response.json())
      .then(data => setCampsites(data));
  }, []);

  return (
    <MapContainer center={[-28.0167, 153.4]} zoom={10} style={{ width: '100%', height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {campsites.map(campsite => (
        campsite.location && campsite.location.coordinates ?
          <Marker 
            key={campsite.id} 
            position={[campsite.location.coordinates[1], campsite.location.coordinates[0]]}
          >
            <Popup>
              {campsite.name}
            </Popup>
          </Marker>
        : null
      ))}
    </MapContainer>
  );
}

export default App;
