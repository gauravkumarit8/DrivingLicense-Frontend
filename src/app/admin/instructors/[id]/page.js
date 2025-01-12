"use client";

import { deleteInstructor, getAdminById, getInstructors } from '@/utils/adminApi/page';
import React, { useEffect, useState } from 'react';
import styles from './Instructor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { getSessionByInstructor } from '@/utils/sessionApi/drivingSessionApi';
import { useParams } from 'next/navigation';

const Instructor = () => {
  const params=useParams();
  const id = params.id;

  const [adminDe, setAdminDe] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [instructorSessions, setInstructorSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const pageSize = 5;

  const fetchInstructors = async (page) => {
    try {
      const adminDetails = await getAdminById(id);
      setAdminDe(adminDetails.data);

      const response = await getInstructors(adminDetails.data.name, page, pageSize);
      if (response.data.message === "Instructor not present") {
        setError(response.data.message);
      } else {
        setInstructors(response.data.instructors);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);

        const sessionsPromises = response.data.instructors.map(async (instructor) => {
          const sessionResponse = await getSessionByInstructor(instructor.id);
          return sessionResponse.data.length > 0 ? sessionResponse.data[0] : null;
        });

        const sessions = await Promise.all(sessionsPromises);
        setInstructorSessions(sessions);
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors(currentPage);
  }, [currentPage]);

  const handleDelete = async (instructorId) => {
    try {
      if (adminDe) {
        await deleteInstructor(adminDe.name, instructorId);
        setInstructors(instructors.filter(instructor => instructor.id !== instructorId));
      }
    } catch (err) {
      console.error('Failed to delete instructor:', err);
    }
  };

  const formatAvailability = (availability) => {
    return availability.map(slot => {
      return `${slot.day}: ${slot.startTime} - ${slot.endTime}`;
    }).join(', ');
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.container}>
      <Link href={`/admin/profile/${id}`} className={styles.backButton}>Back</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className={styles.instructorList}>
            {instructors.map((instructor, index) => (
              <div key={instructor.id} className={styles.instructorCard}>
                <h3>{instructor.name}</h3>
                <p>Email: {instructor.email}</p>
                <p>Phone: {instructor.phone}</p>
                <p>Availability: {formatAvailability(instructor.availability)}</p>
                <p>
                  Instructor Session:
                  {instructorSessions[index] ? (
                    <>
                      <br />
                      Matching Day: {instructorSessions[index].matchingDay}<br />
                      Session Date: {new Date(instructorSessions[index].sessionDate).toLocaleString()}<br />
                      Schedule Date: {new Date(instructorSessions[index].scheduleDate).toLocaleString()}<br />
                      User Name: {instructorSessions[index].userName}<br />
                    </>
                  ) : "No Session"}
                </p>
                <button
                  type="button"
                  className={styles.deleteButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(instructor.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageButton}
            >
              Previous
            </button>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageButton}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Instructor;
