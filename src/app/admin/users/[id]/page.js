"use client";

import { deleteUser, getUsers } from '@/utils/adminApi/page';
import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getSessionByUser } from '@/utils/sessionApi/drivingSessionApi';


const user = ({ params }) => {

  const { id } = params;

  const [users, setusers] = useState([]);
  // const [userSessions, setuserSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const response = await getUsers();
        console.log(response.data);
        setusers(response.data);

        // Fetch sessions for each user
        // const sessionsPromises = response.data.map(async (user) => {
        //   const sessionResponse = await getSessionByUser(user.id);
        //   return sessionResponse.data.length > 0 ? sessionResponse.data[0] : null;
        // });
        
        // const sessions = await Promise.all(sessionsPromises);
        // setuserSessions(sessions);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setusers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  }

  const formatAvailability = (availability) => {
    return availability.map(slot => {
      return `${slot.day}: ${slot.startTime} - ${slot.endTime}`;
    }).join(', ');
  };

  return (
    <div className={styles.container}>
      <Link href={`/admin/profile/${id}`} className={styles.backButton}>Back</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={styles.userList}>
          {users.map((user, index) => (
            <div key={user.id} className={styles.userCard}>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Availability: {formatAvailability(user.availability)}</p>
              {/* <p>
                user Session:
                {userSessions[index] ? (
                  <>
                    <br />
                    Matching Day: {userSessions[index].matchingDay}<br />
                    Session Date: {new Date(userSessions[index].sessionDate).toLocaleString()}<br />
                    Schedule Date: {new Date(userSessions[index].scheduleDate).toLocaleString()}<br />
                    User Name: {userSessions[index].userName}<br />
                  </>
                ) : "No Session"}
              </p> */}
              <button
                type="button"
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(user.id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default user;
