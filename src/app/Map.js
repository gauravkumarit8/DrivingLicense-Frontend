"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './Map.module.css';
import { adminLocations } from '@/utils/mapApi/page';

export default function Map() {
  const mapRef = useRef(null); // Use a ref to store the map instance
  const platformRef = useRef(null); // Use a ref to store the HERE platform instance
  const [locations, setLocations] = useState([]); // State to store admin locations
  const [selectedAdmin, setSelectedAdmin] = useState(null); // State for selected admin

  useEffect(() => {
    // Function to load the HERE Maps scripts dynamically
    const loadHereMaps = () => {
      return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script');
        const script4 = document.createElement('script');

        script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
        script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
        script3.src = 'https://js.api.here.com/v3/3.1/mapsjs-ui.js';
        script4.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js';

        script1.onload = () => {
          script2.onload = () => {
            script3.onload = () => {
              script4.onload = () => resolve();
              document.body.appendChild(script4);
            };
            document.body.appendChild(script3);
          };
          document.body.appendChild(script2);
        };

        script1.onerror = reject;
        script2.onerror = reject;
        script3.onerror = reject;
        script4.onerror = reject;
        document.body.appendChild(script1);
      });
    };

    // Load HERE Maps scripts and initialize map once
    loadHereMaps()
      .then(() => {
        if (!platformRef.current) {
          platformRef.current = new H.service.Platform({
            apikey: process.env.NEXT_PUBLIC_HERE_API_KEY
          });
        }

        if (!mapRef.current) {
          const defaultLayers = platformRef.current.createDefaultLayers();

          mapRef.current = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
              zoom: 10,
              center: { lat: 52.5, lng: 13.4 }
            }
          );

          // Enable map event handling (mouse zoom, pan, etc.)
          const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(mapRef.current));

          // Add default UI controls (including zoom buttons on the map)
          const ui = H.ui.UI.createDefault(mapRef.current, defaultLayers);

          // Zoom controls via custom buttons
          const zoomInButton = document.getElementById('zoomIn');
          const zoomOutButton = document.getElementById('zoomOut');

          zoomInButton.addEventListener('click', () => {
            mapRef.current.setZoom(mapRef.current.getZoom() + 1);
          });

          zoomOutButton.addEventListener('click', () => {
            mapRef.current.setZoom(mapRef.current.getZoom() - 1);
          });
        }
      })
      .catch(err => {
        console.error('Failed to load HERE Maps scripts', err);
      });
  }, []); // Empty dependency array to ensure this runs only once

  useEffect(() => {
    // Fetch admin locations and store them in state
    const fetchLocations = async () => {
      const response = await adminLocations();
      if (response.success) {
        setLocations(response.data); // Set the locations if the API call is successful
      } else {
        console.error('Failed to fetch locations:', response.data);
      }
    };

    fetchLocations();
  }, []); // Run only once when component mounts

  useEffect(() => {
    // Add markers to the map when locations change
    if (mapRef.current && locations.length > 0) {
      const mapObjects = mapRef.current.getObjects();
      mapRef.current.removeObjects(mapObjects); // Remove old markers

      locations.forEach(location => {
        if (location.latitude && location.longitude) { // Ensure valid coordinates
          const marker = new H.map.Marker(
            { lat: location.latitude, lng: location.longitude },
            { data: location.adminName }
          );

          // Add a label for the admin name
          marker.setData(location.adminName);
          marker.addEventListener('tap', (evt) => {
            alert(`Admin: ${evt.target.getData()}`);
          });

          mapRef.current.addObject(marker); // Add marker to the map
        }
      });
    }
  }, [locations]); // Dependency on locations to update markers when locations change

  // Handle selection of admin from dropdown
  const handleAdminSelect = (event) => {
    const selectedAdmin = event.target.value;
    setSelectedAdmin(selectedAdmin);

    // Find the selected admin's location
    const selectedLocation = locations.find(loc => loc.adminName === selectedAdmin);

    if (selectedLocation && mapRef.current) {
      // Center the map on the selected admin's location
      mapRef.current.setCenter({ lat: selectedLocation.latitude, lng: selectedLocation.longitude });
    }
  };

  return (
    <div className={styles.mapContainerWrapper}>
      {/* Dropdown to select admin */}
      <select
        onChange={handleAdminSelect}
        value={selectedAdmin || ''}
        className={styles.selectDropdown}
      >
        <option value="">Select Admin</option>
        {locations.map((location) => (
          <option key={location.adminName} value={location.adminName}>
            {location.adminName}
          </option>
        ))}
      </select>

      <div id="mapContainer" className={styles.mapContainer}></div>
      <div className={styles.zoomControls}>
        <button id="zoomIn" className={styles.zoomButton}>+</button>
        <button id="zoomOut" className={styles.zoomButton}>-</button>
      </div>
    </div>
  );
}