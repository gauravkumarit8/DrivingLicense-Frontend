"use client";

import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import Link from 'next/link';
import { showAdminLocation } from '@/utils/mapIntegeration/page'; // Fetches admin location

export default function Home() {
  const [adminLocation, setAdminLocation] = useState([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  // Fetch admin locations on component mount
  useEffect(() => {
    async function fetchAdminLocation() {
      try {
        const locations = await showAdminLocation(); // Call the function to get admin locations
        setAdminLocation(locations); // Update state with fetched locations
      } catch (error) {
        console.error('Error fetching admin locations:', error);
      }
    }

    fetchAdminLocation(); // Invoke the function to fetch data
  }, []);

  // Initialize map when adminLocation is available
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapInitialized && adminLocation.length > 0) {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      // Load HERE Maps scripts and initialize map
      Promise.all([
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-core.js'),
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-service.js'),
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-ui.js'),
        loadScript('https://js.api.here.com/v3/3.1/mapsjs-mapevents.js'),
      ]).then(() => {
        // Check if H is defined (HERE Maps library loaded correctly)
        if (typeof H !== 'undefined') {
          const platform = new H.service.Platform({
            apikey: process.env.NEXT_PUBLIC_HERE_API_KEY, // Replace with your API key
          });
          const defaultLayers = platform.createDefaultLayers();

          const map = new H.Map(
            document.getElementById('map'),
            defaultLayers.vector.normal.map,
            {
              center: { lat: 37.4217636, lng: -122.084614 }, // Default center to first admin location
              zoom: 10,
              pixelRatio: window.devicePixelRatio || 1,
            }
          );

          // Enable map behavior (zooming, dragging)
          const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
          H.ui.UI.createDefault(map, defaultLayers);

          // Add markers for each admin location
          adminLocation.forEach((location) => {
            const marker = new H.map.Marker({
              lat: location.latitude,
              lng: location.longitude,
            });
            map.addObject(marker);
          });

          setMapInitialized(true); // Set map as initialized
        } else {
          console.error('HERE Maps library is not loaded');
        }
      }).catch((err) => {
        console.error('Error loading HERE Maps scripts:', err);
      });
    }
  }, [adminLocation, mapInitialized]);

  return (
    <main>
      <div className={styles.container}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div id="map" className={styles.mapContainer}></div> {/* Map container */}

        <div className={styles.navbar}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Select Role</button>
            <div className={styles.dropdownContent}>
              <Link href="/admin">Admin</Link>
              <Link href="/instructors">Instructor</Link>
              <Link href="/user">User</Link>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.header}>Welcome to Our Platform</h1>
        </div>
      </div>
    </main>
  );
}
