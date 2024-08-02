"use client";

import { deleteUser, getAdminById, getUsersWithAvailability } from '@/utils/adminApi/page';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

const Profile = ({ params }) => {
  const { id } = params;
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const fetchData = async () => {
    try {
      const adminResult = await getAdminById(id);
      const usersResult = await getUsersWithAvailability();
      setAdmin(adminResult.data);
      if (Array.isArray(usersResult.data)) {
        setUsers(usersResult.data);
      } else {
        setErrorMessage(usersResult.data.message);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleClick = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
console.log("user")
console.log(users);
  return (
    <div className={styles.container}>
      {/* Admin details */}
      <div className={styles.card}>
        <div className={styles.adminDetails}>
          <div>Profile Photo</div>
          <div>Name: {admin.name}</div>
          <div>Email: {admin.email}</div>
          <div>Role: {admin.role}</div>
        </div>
        
        {/* Users details */}
        <div className={styles.userContainer}>
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            users.map((user, index) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userDetails}>
                  <button 
                    onClick={() => handleClick(user.id)} 
                    type='submit' 
                    className={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <span>{index + 1}. </span>
                  <span>Name: {user.userName}</span><br />
                  <span>Email: {user.email}</span><br />
                  <span>Aadhar: {user.aadhaarNumber}</span><br />
                  <span>Status: {user.status}</span><br />
                  {/* Availability details */}
                  {user.availability && user.availability.length > 0 && (
                    <div className={styles.availability}>
                      <h2>Availability:</h2>
                      {user.availability.map((availability, index) => (
                        <div key={index}>
                          <div>Day: {availability.day}</div>
                          <div>Start Time: {availability.startTime}</div>
                          <div>End Time: {availability.endTime}</div>
                          <div>Session Date: {new Date(availability.sessionDate).toLocaleDateString()}</div>
                          <div>Schedule Date: {new Date(availability.scheduleDate).toLocaleDateString()}</div>
                          {/* Instructor details */}
                          {availability.instructors && availability.instructors.length > 0 && (
                            <div className={styles.instructor}>
                              <h2>Instructor Details:</h2>
                              {availability.instructors.map((instructor, index) => (
                                <div key={index}>
                                  <div>Name: {instructor.name}</div>
                                  <div>Email: {instructor.email}</div>
                                  <div>Phone: {instructor.phone}</div>
                                  <div>Driving License Number: {instructor.drivingLicenseNumber}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Link href={`/admin/assignInstructor/${admin.id}/${user.id}`} className={styles.linkButton}>
                  Assign Instructor
                </Link>
              </div>
            ))
          )}
        </div>
        
        {/* Update admin link */}
        <Link href={`/admin/update/${id}`} className={styles.linkButton}>
          Update
        </Link>
        <Link href={`/admin/instructors/${id}`} className={styles.linkButton}>
          Instructor
        </Link>
        <Link href={`/admin/users/${id}`} className={styles.linkButton}>
          User
        </Link>
      </div>
    </div>
  );
};

export default Profile;
