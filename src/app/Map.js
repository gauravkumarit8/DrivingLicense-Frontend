"use client"

import { useEffect } from 'react';
import styles from './Map.module.css';

export default function Map() {
  useEffect(() => {
    // Function to load the HERE Maps scripts dynamically
    const loadHereMaps = () => {
      return new Promise((resolve, reject) => {
        const script1 = document.createElement('script');
        const script2 = document.createElement('script');
        script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js';
        script2.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';

        script1.onload = () => {
          script2.onload = () => resolve();
          document.body.appendChild(script2);
        };
        
        script1.onerror = reject;
        script2.onerror = reject;
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
    };

    // Load the HERE Maps API and initialize the map
    loadHereMaps().then(() => {
      loadMap();
    }).catch(err => {
      console.error('Failed to load HERE Maps scripts', err);
    });
  }, []);

  return <div id="mapContainer" className={styles.mapContainer}></div>;
}
