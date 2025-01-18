"use client";

import { deleteUser, getAdminById, getUsers, getUsersByPagination } from '@/utils/adminApi/page';
import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
// import { getSessionByUser } from '@/utils/sessionApi/drivingSessionApi';


const User = () => {

  const params=useParams();
  const id=params.id;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage,setCurrentPage]=useState(1);
  const [totalPages,setTotalPages]=useState(0);
  const [pageSizes,setPageSizes]=useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDetails=await getAdminById(id);
        // Fetch users
        // const response = await getUsers(adminDetails.data.name);
        const response=await getUsersByPagination(adminDetails.data.name,currentPage,pageSizes);
        console.log(response.data);
        if (response.data.message === "Users not present") {
          setError(response.data.message);
        } else {
          setUsers(response.data);
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);

          // Fetch sessions for each user (if needed)
          // const sessionsPromises = response.data.map(async (user) => {
          //   const sessionResponse = await getSessionByUser(user.id);
          //   return sessionResponse.data.length > 0 ? sessionResponse.data[0] : null;
          // });
          
          // const sessions = await Promise.all(sessionsPromises);
          // setUserSessions(sessions);
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id,currentPage,pageSizes]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const formatAvailability = (availability) => {
    return availability.map(slot => {
      return `${slot.day}: ${slot.startTime} - ${slot.endTime}`;
    }).join(', ');
  };

  const handlePageChange=(newPage)=>{
      if(newPage>=1 && newPage<=totalPages){
        setCurrentPage(newPage);
      }
  }

  return (
    <div className={styles.container}>
      <Link href={`/admin/profile/${id}`} className={styles.backButton}>Back</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className={styles.userList}>
            {users.map((user, index) => (
              <div key={user.id} className={styles.userCard}>
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Availability: {formatAvailability(user.availability)}</p>
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
          <div className={styles.pagination}>
            <button
              onClick={() =>  (currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.paginationButton}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.paginationButton}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
