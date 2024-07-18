"use client";

import React, { useEffect, useState } from 'react';
import styles from './AssignInstructor.module.css';
import { useRouter } from 'next/navigation';
import { getUserById } from '@/utils/userApi/page';
import { getInstructorsByUserAvailability, assignInstructorToUser } from '@/utils/adminApi/page';

const AssignInstructor = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const [adminId, userId] = id;
  const [user, setUser] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructors, setSelectedInstructors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await getUserById(userId);
        const responseInstructor = await getInstructorsByUserAvailability(userId);

        console.log('User Data:', responseUser.data);
        console.log('Instructor Data:', responseInstructor.data);

        setUser(responseUser.data);

        if (Array.isArray(responseInstructor.data)) {
          setInstructors(responseInstructor.data);
        } else {
          console.error('Expected array but got:', responseInstructor.data);
          setInstructors([]);
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleInstructorSelect = (day, instructorId) => {
    setSelectedInstructors((prevSelected) => ({
      ...prevSelected,
      [day]: instructorId,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assignments = Object.entries(selectedInstructors).map(([day, instructorId]) => ({ day, instructorId }));
    if (assignments.length > 0) {
      try {
        const assign = await assignInstructorToUser(userId, assignments);
        if (assign.success) {
          alert('Instructors assigned successfully!');
          router.push(`/admin/profile/${adminId}`);
        } else {
          alert('Failed to assign instructors.');
        }
      } catch (err) {
        console.error('Failed to assign instructors:', err);
        alert('An error occurred while assigning the instructors.');
      }
    } else {
      alert('Please select at least one instructor.');
    }
  };

  const formatAvailability = (availability) => {
    return availability.map(avail => `${avail.day} (${avail.startTime} - ${avail.endTime})`).join(', ');
  };

  const getAvailableInstructorsForDay = (day) => {
    return instructors.filter(instructor => 
      instructor.availability.some(avail => avail.day === day)
    );
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
        {user ? (
          <>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <div>Aadhaar: {user.aadhaarNumber}</div>
            <div>Status: {user.status}</div>
            <div>Availability: {formatAvailability(user.availability)}</div>
          </>
        ) : (
          <div>No user details available</div>
        )}
      </div>
      
      <div className={styles.instructorSelection}>
        <h2>Select Instructors:</h2>
        {user?.availability.map(({ day }) => (
          <div key={day}>
            <h3>{day}</h3>
            <div className={styles.instructorGrid}>
              {getAvailableInstructorsForDay(day).length === 0 ? (
                <div>No matching instructors available</div>
              ) : (
                getAvailableInstructorsForDay(day).map(instructor => (
                  <div
                    key={instructor.id}
                    className={`${styles.instructorCard} ${selectedInstructors[day] === instructor.id ? styles.selected : ''}`}
                    onClick={() => handleInstructorSelect(day, instructor.id)}
                  >
                    <div>Name: {instructor.name}</div>
                    <div>Email: {instructor.email}</div>
                    <div>Phone: {instructor.phone}</div>
                    <div>Availability: {formatAvailability(instructor.availability)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
        <br />
        <button onClick={handleSubmit} className={styles.submitButton}>Assign Instructors</button>
      </div>
    </div>
  );
};

export default AssignInstructor;
