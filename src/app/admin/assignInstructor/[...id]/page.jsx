"use client"

import { assignInstructorToUser, getInstructors } from '@/utils/adminApi/page';
import { getUserById } from '@/utils/userApi/page';
import React, { useEffect, useState } from 'react';
import styles from './AssignInstructor.module.css';
import { useRouter } from 'next/navigation';

const AssignInstructor = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [adminId, userId] = id;
  const [user, setUser] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await getUserById(userId);
        const responseInstructor = await getInstructors();
        setUser(responseUser.data);
        setInstructors(responseInstructor.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleInstructorSelect = (instructorId) => {
    setSelectedInstructorId(instructorId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedInstructorId) {
      try {
        const assign = await assignInstructorToUser(userId, selectedInstructorId);
        if (assign) {
          alert('Instructor assigned successfully!');
          // Navigate back to profile page with the adminId
          router.push(`/admin/profile/${adminId}`);
        } else {
          alert('Failed to assign instructor.');
        }
      } catch (err) {
        alert('An error occurred while assigning the instructor.');
      }
    } else {
      alert('Please select an instructor.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <h2>User Details:</h2>
        <div>Name: {user.name}</div>
        <div>Email: {user.email}</div>
        <div>Aadhar: {user.aadhaarNumber}</div>
        <div>Status: {user.status}</div>
      </div>
      
      <div className={styles.instructorSelection}>
        <h2>Select an Instructor:</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.instructorGrid}>
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className={`${styles.instructorCard} ${selectedInstructorId === instructor.id ? styles.selected : ''}`}
                onClick={() => handleInstructorSelect(instructor.id)}
              >
                <div>Name: {instructor.name}</div>
                <div>Email: {instructor.email}</div>
              </div>
            ))}
          </div>
          <br />
          <button type="submit" className={styles.submitButton}>Assign Instructor</button>
        </form>
      </div>
    </div>
  );
};

export default AssignInstructor;
