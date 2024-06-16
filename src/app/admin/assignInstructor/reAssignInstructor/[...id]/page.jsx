"use client"

import { getInstructors, reAssignInstructor } from '@/utils/adminApi/page';
import { getUserById } from '@/utils/userApi/page';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ReAssignInstructor.module.css';

const ReAssignInstructor = ({ params }) => {
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
        const assign = await reAssignInstructor(userId, selectedInstructorId);
        if (assign) {
          alert('Instructor assigned successfully!');
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
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Aadhar:</strong> {user.aadhaarNumber}</div>
        <div><strong>Status:</strong> {user.status}</div>
        <div><strong>Assigned Instructor:</strong> {user.instructor.name}</div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Select a New Instructor</h2>
        <div className={styles.instructorList}>
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className={`${styles.instructorCard} ${selectedInstructorId === instructor.id ? styles.selected : ''}`}
              onClick={() => handleInstructorSelect(instructor.id)}
            >
              <h3>{instructor.name}</h3>
              <p>Email: {instructor.email}</p>
              <p>Experience: {instructor.experience} years</p>
            </div>
          ))}
        </div>
        <button type="submit" className={styles.submitButton}>Reassign Instructor</button>
      </form>
    </div>
  );
};

export default ReAssignInstructor;
