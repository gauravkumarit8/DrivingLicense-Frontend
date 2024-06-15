"use client"

import { assignInstructorToUser, getInstructors } from '@/utils/adminApi/page';
import { getUserById } from '@/utils/userApi/page';
import React, { useState, useEffect } from 'react';
import styles from './AssignInstructor.module.css';
import { useRouter } from 'next/navigation';

const AssignInstructor = ({ params }) => {
  const {id}=params;
  const [adminId, userId] = id;
  console.log(params)
  const [user, setUser] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router=useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await getUserById(userId);
        console.log(responseUser.data)
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
  }, [id]);

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
          // Refetch the user data to update the profile with the assigned instructor
          const updatedUser = await getUserById(id);
          console.log(updatedUser);
          setUser(updatedUser.data);
          router.push(`/admin/profile/${adminId}`)
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

  if (!user || instructors.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div>User Data</div>
        <hr />
        <div>
          <div>
            {/* User details */}
            <span>Name: {user.name}</span><br />
            <span>Email: {user.email}</span><br />
            <span>Aadhar: {user.aadhaarNumber}</span><br />
            <span>Role: {user.role}</span><br />
            <span>Status: {user.status}</span><br />
          </div>
          <div>
            {/* Instructor Cards */}
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
      </div>
    </>
  );
};

export default AssignInstructor;
