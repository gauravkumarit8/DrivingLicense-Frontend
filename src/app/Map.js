"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './Map.module.css';
import { showAdminLocation } from '@/utils/mapIntegeration/page';

export default function Map() {
  const mapRef = useRef(null); // Use a ref to store the map instance
  const [locations, setLocations] = useState([]); // State to store admin locations

  useEffect(() => {
    // Fetch admin locations and store them in state
    const fetchLocations = async () => {
      const response = await showAdminLocation();
      if (response.success) {
        setLocations(response.data); // Set the locations if the API call is successful
      } else {
        console.error('Failed to fetch locations:', response.data);
      }
    };

    fetchLocations();

    // Function to load the HERE Maps scripts dynamically
    const loadHereMaps = () => {
      return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        const script3 = document.createElement('script'); // Adding for the map events and UI
        const script4 = document.createElement('script'); // Adding for map events
        script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
        script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
        script3.src = 'https://js.api.here.com/v3/3.1/mapsjs-ui.js';
        script4.src = 'https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'; // Include mapevents for mouse interactions

        script1.onload = () => {
          script2.onload = () => {
            script3.onload = () => {
              script4.onload = () => resolve(); // Ensure all scripts are loaded
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

    // Function to initialize the map and add markers
    const loadMap = () => {
      if (!mapRef.current) { // Only initialize the map if it hasn't been created yet
        const platform = new H.service.Platform({
          apikey: 'yAFizCg33WDQA0Y3Nox9p6PkxUZBqB0JA6S3wiAgoWo'
        });

        const defaultLayers = platform.createDefaultLayers();

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
          mapRef.current.setZoom(mapRef.current.getZoom() + 1); // Increase zoom level by 1
        });

        zoomOutButton.addEventListener('click', () => {
          mapRef.current.setZoom(mapRef.current.getZoom() - 1); // Decrease zoom level by 1
        });
      }

      // Add markers for each location
      locations.forEach(location => {
        const marker = new H.map.Marker({ lat: location.latitude, lng: location.longitude });
        mapRef.current.addObject(marker);
      });
    };

    // Load the HERE Maps API and initialize the map
    loadHereMaps()
      .then(() => {
        loadMap();
      })
      .catch(err => {
        console.error('Failed to load HERE Maps scripts', err);
      });
  }, [locations]); // Add locations as a dependency to ensure markers are updated when data changes

  return (
    <div className={styles.mapContainerWrapper}>
      <div id="mapContainer" className={styles.mapContainer}></div>
      <div className={styles.zoomControls}>
        <button id="zoomIn" className={styles.zoomButton}>+</button>
        <button id="zoomOut" className={styles.zoomButton}>-</button>
      </div>
    </div>
  );
}
