"use client";

import { deleteInstructor, getInstructors } from '@/utils/adminApi/page';
import React, { useEffect, useState } from 'react';
import styles from './Instructor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Instructor = ({params}) => {

  const {id}=params;

  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInstructors();
        setInstructors(response.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (instructorId) => {
    try {
      await deleteInstructor(instructorId);
      setInstructors(instructors.filter(instructor => instructor.id !== instructorId));
    } catch (err) {
      console.error('Failed to delete instructor:', err);
    }
  }

  return (
    <div className={styles.container}>
        <Link href={`/admin/profile/${id}`} className={styles.deleteButton}>Back</Link>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className={styles.instructorList}>
          {instructors.map((instructor) => (
            <div key={instructor.id} className={styles.instructorCard}>
              <h3>{instructor.name}</h3>
              <p>Email: {instructor.email}</p>
              <p>Phone: {instructor.phone}</p>
              <p>Availability: {instructor.availability.join(', ')}</p>
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
      )}
      
    </div>
  )
}

export default Instructor;
