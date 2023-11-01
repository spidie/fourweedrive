import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function App() {
  const [campsites, setCampsites] = useState({ features: [] });

  useEffect(() => {
    fetch('http://localhost:5000/campsites')
      .then(response => response.json())
      .then(data => setCampsites(data));
  }, []);

  return (
    <MapContainer center={[-28.01726, 153.425699]} zoom={13} style={{flex: 1}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {campsites.features.map(feature => (
        <Marker key={feature.properties.id} position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}>
          <Popup>
            {feature.properties.name}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
