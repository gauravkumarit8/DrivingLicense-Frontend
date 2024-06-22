"use client"

import { useEffect, useState } from 'react';
import styles from '../Profile.module.css';
import { getInstructorById, updateAvailability } from "@/utils/instructorApi/page";

const Profile = ({ params }) => {
  const { id } = params;
  const [instructor, setInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInstructorById(id);
        setInstructor(result.data);
        setAvailability(result.data.availability);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleCheckboxChange = (day) => {
    setAvailability((prevAvailability) =>
      prevAvailability.includes(day)
        ? prevAvailability.filter(d => d !== day)
        : [...prevAvailability, day]
    );
  };

  const handleUpdateAvailability = async () => {
    try {
      const result = await updateAvailability(id, availability);
      if (result.success) {
        alert('Availability updated successfully');
      } else {
        console.error('Failed to update availability:', result.message);
        setError('Failed to update availability');
      }
    } catch (err) {
      console.error('Failed to update availability:', err);
      setError('Failed to update availability');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Instructor Profile</h1>
      <div className={styles.profileCard}>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Name:</label>
          <span className={styles.profileValue}>{instructor.name}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Email:</label>
          <span className={styles.profileValue}>{instructor.email}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Phone Number:</label>
          <span className={styles.profileValue}>{instructor.phone}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Driving License:</label>
          <span className={styles.profileValue}>{instructor.drivingLicenseNumber}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Availability:</label>
          <ul className={styles.availabilityList}>
            {daysOfWeek.map((day) => (
              <li key={day} className={styles.availabilityItem}>
                <label>
                  <input
                    type="checkbox"
                    checked={availability.includes(day)}
                    onChange={() => handleCheckboxChange(day)}
                  />
                  {day}
                </label>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.updateButton}
            onClick={handleUpdateAvailability}
          >
            Update Availability
          </button>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Users:</label>
          <ul className={styles.userList}>
            {instructor.users.map((user) => (
              <li key={user.id} className={styles.userItem}>
                <span className={styles.userName}>{user.name}</span> 
                <span className={styles.userEmail}>{user.email}</span> 
                <span className={styles.userStatus}>{user.status}</span>
                <span className={styles.userStatus}>{user.sessionDate}</span>
                <span className={styles.userStatus}>{user.scheduleDate}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
