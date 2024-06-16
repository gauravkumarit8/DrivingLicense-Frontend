"use client"

import { deleteUser, getAdminById, getUsers } from '@/utils/adminApi/page';
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

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResult = await getAdminById(id);
        const usersResult = await getUsers();
        setAdmin(adminResult.data);
        setUsers(usersResult.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleClick = async (userId) => {
    try {
      await deleteUser(userId);
      // Optionally, update the users state after deletion
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  };

  if (!admin || users.length === 0) {
    return <div>Loading...</div>;
  }

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
          {users.map((user, index) => (
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
                <span>Name: {user.name}</span><br />
                <span>Email: {user.email}</span><br />
                <span>Aadhar: {user.aadhaarNumber}</span><br />
                <span>Status: {user.status}</span><br />
                {/* Instructor details */}
                {user.instructor ? (
                  <div className={styles.instructor}>
                    <h2>Instructor Details:</h2>
                    <div>Name: {user.instructor.name}</div>
                    <div>Email: {user.instructor.email}</div>
                    <div>Phone: {user.instructor.phone}</div>
                    <div>Driving License Number: {user.instructor.drivingLicenseNumber}</div>
                    <Link href={`/admin/assignInstructor/reAssignInstructor/${admin.id}/${user.id}`} className={styles.linkButton}>
                      Change Instructor
                    </Link>
                  </div>
                ) : (
                  <Link href={`/admin/assignInstructor/${admin.id}/${user.id}`} className={styles.linkButton}>
                    Assign Instructor
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Update admin link */}
        <Link href={`/admin/update/${id}`} className={styles.linkButton}>
          Update
        </Link>
      </div>
    </div>
  );
};

export default Profile;
