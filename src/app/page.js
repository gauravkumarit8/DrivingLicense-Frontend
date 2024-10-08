"use client"

import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import Link from 'next/link';
import { showAdminLocation } from '@/utils/mapIntegeration/page';

export default function Home() {
  const [adminLocation, setAdminLocation] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const location = await showAdminLocation();
      setAdminLocation(location.data); // Assuming location.data is an array of admin locations
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className={styles.container}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Render adminLocation properly */}
        

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
          <h1><div>
          {adminLocation.length > 0 ? (
            adminLocation.map((location, index) => (
              <div key={index}>
                <p><strong>Admin Name:</strong> {location.adminName}</p>
                <p><strong>Latitude:</strong> {location.latitude}</p>
                <p><strong>Longitude:</strong> {location.longitude}</p>
              </div>
            ))
          ) : (
            <p>Loading location data...</p>
          )}
        </div></h1>
        </div>
      </div>
    </main>
  );
}
