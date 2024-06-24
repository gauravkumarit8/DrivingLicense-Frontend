"use client";

import { useEffect, useState } from 'react';
import { deleteAvailability, getInstructorById, updateAvailability } from "@/utils/instructorApi/page";
import Link from 'next/link';
import styles from '../Profile.module.css'; 
import AvailabilityForm from '../../availability/AvailabilityForm/page';


const Profile = ({ params }) => {
  const { id } = params;
  const [instructor, setInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingAvailability, setUpdatingAvailability] = useState(false); // State to control update availability form display

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

  const handleDeleteAvailability = async (day) => {
    try {
      await deleteAvailability(id, day);
      setAvailability(prevAvailability => prevAvailability.filter(avail => avail.day !== day));
    } catch (err) {
      console.error('Failed to delete availability:', err);
      setError('Failed to delete availability');
    }
  };

  const handleUpdateAvailability = () => {
    setUpdatingAvailability(true);
  };

  const handleCloseForm = () => {
    setUpdatingAvailability(false);
  };

  const handleSubmitAvailability = async (updatedAvailability) => {
    try {
      const result = await updateAvailability(id, updatedAvailability);
      setAvailability(result.data.availability);
      setUpdatingAvailability(false);
      console.log('Availability updated successfully:', result);
    } catch (err) {
      console.error('Failed to update availability:', err);
      setError('Failed to update availability');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>; // Use CSS class for loading state
  }

  if (error) {
    return <div className={styles.error}>{error}</div>; // Use CSS class for error state
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
          <span className={styles.profileValue}>{instructor.drivingLicenseNumber || 'Not available'}</span>
        </div>

        {updatingAvailability ? (
          <AvailabilityForm
            currentAvailability={availability}
            onSubmit={handleSubmitAvailability}
            onClose={handleCloseForm}
          />
        ) : (
          <div>
            {availability.length > 0 ? (
              <div className={styles.availabilitySection}>
                <h2 className={styles.sectionHeader}>Availability</h2>
                <ul className={styles.availabilityList}>
                  {availability.map((avail, index) => (
                    <li key={index} className={styles.availabilityItem}>
                      <span>{avail.day}: {avail.startTime} - {avail.endTime}</span>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteAvailability(avail.day)}
                      >
                        &#x2715;
                      </button>
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
            ) : (
              <div className={styles.addAvailabilitySection}>
                <h2 className={styles.sectionHeader}>Add Availability</h2>
                <Link href={`/instructors/availability/addAvailability/${id}`}>Add Availability</Link>
              </div>
            )}
          </div>
        )}

        <div className={styles.usersSection}>
          <h2 className={styles.sectionHeader}>Users</h2>
          <ul className={styles.userList}>
            {instructor.users.length > 0 ? (
              instructor.users.map((user, index) => (
                <li key={user.id} className={styles.userItem}>
                  <span className={styles.userNumber}>{index + 1}.</span>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                  <span className={styles.userStatus}>{user.status}</span>
                  <span className={styles.userStatus}>{user.sessionDate}</span>
                  <span className={styles.userStatus}>{user.scheduleDate}</span>
                </li>
              ))
            ) : (
              <li>No users assigned</li>
            )}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Profile;