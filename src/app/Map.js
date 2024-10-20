"use client";

import { useEffect } from 'react';
import styles from './Map.module.css';

export default function Map() {
  useEffect(() => {
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

    // Function to initialize the map
    const loadMap = () => {
      const platform = new H.service.Platform({
        apikey: 'yAFizCg33WDQA0Y3Nox9p6PkxUZBqB0JA6S3wiAgoWo'
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new H.Map(
        document.getElementById('mapContainer'),
        defaultLayers.vector.normal.map,
        {
          zoom: 10,
          center: { lat: 52.5, lng: 13.4 }
        }
      );

      // Enable map event handling (mouse zoom, pan, etc.)
      const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

      // Add default UI controls (including zoom buttons on the map)
      const ui = H.ui.UI.createDefault(map, defaultLayers);

      // Zoom controls via custom buttons
      const zoomInButton = document.getElementById('zoomIn');
      const zoomOutButton = document.getElementById('zoomOut');

      zoomInButton.addEventListener('click', () => {
        map.setZoom(map.getZoom() + 1); // Increase zoom level by 1
      });

      zoomOutButton.addEventListener('click', () => {
        map.setZoom(map.getZoom() - 1); // Decrease zoom level by 1
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
  }, []);

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
