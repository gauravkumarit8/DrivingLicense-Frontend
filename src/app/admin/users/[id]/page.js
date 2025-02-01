"use client";

import { deleteUser, getAdminById, getUsersByPagination } from '@/utils/adminApi/page';
import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const User = () => {
  const params = useParams();
  const id = params.id;

  const [users, setUsers] = useState([]); // Ensure it's an empty array by default
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSizes, setPageSizes] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDetails = await getAdminById(id);
        const response = await getUsersByPagination(adminDetails.data.name, currentPage, pageSizes);
        console.log(response.data);
        
        // Check if users exist and is an array
        if (response.data.message === "Users not present") {
          setError(response.data.message);
          setUsers([]);  // Ensure users is an empty array when no users are found
        } else {
          setUsers(response.data.users || []);  // Default to empty array if users is undefined
          setCurrentPage(response.data.currentPage);
          setTotalPages(response.data.totalPages);
        }
      } catch (err) {
        setError('Failed to fetch data');
        setUsers([]);  // Ensure users is an empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, currentPage, pageSizes]);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  const formatAvailability = (availability) => {
    if (Array.isArray(availability)) {
      return availability.map(slot => `${slot.day}: ${slot.startTime} - ${slot.endTime}`).join(', ');
    }
    return "No availability info";  // Fallback message when availability is missing or incorrect
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <Link href={`/admin/profile/${id}`} className={styles.backButton}>Back</Link>
      {loading ? (
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-2xl font-bold text-red-500">{error}</div>
      ) : (
        <>
          <div className={styles.userList}>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user) => (
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
              ))
            ) : (
              <div>No users found</div>  // Handle empty users list scenario
            )}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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
