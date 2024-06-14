import { getAdminById, getUsers } from '@/utils/adminApi/page';
import Link from 'next/link';
import React from 'react';
import styles from './profile.module.css';

const Profile = async ({ params }) => {
  const { id } = params;
  const result = await getAdminById(id);
  const resultUser = await getUsers();
  const { data } = resultUser;

  return (
    <div className={styles.container}>
    {/* this is admin data */}
      <div className={styles.card}>
        <div className={styles.adminDetails}>
          <div>Profile Photo</div>
          <div>Name: {result.data.name}</div>
          <div>Email: {result.data.email}</div>
          <div>Role: {result.data.role}</div>
        </div>
        {/* this is user data */}
        <div className={styles.userContainer}>
          {data.map((user, index) => (
            <div key={user.id} className={styles.userCard}>
              <div className={styles.userDetails}>
                <span>{index + 1}. </span>
                <span>{user.name} </span>
                <span>{user.email} </span>
                <span>{user.aadharNumber} </span>
                <span>{user.status} </span>
                {/* this is assigned instructor to user */}
                {user.instructor ? (
                  <div className={styles.instructor}>
                    <h2>Instructor Details:</h2>
                    <div>Name: {user.instructor.name}</div>
                    <div>Email: {user.instructor.email}</div>
                    <div>Phone: {user.instructor.phone}</div>
                    <div>Driving License Number: {user.instructor.drivingLicenseNumber}</div>
                    {/* Add more details about the instructor as needed */}
                    
                  </div>
                ) : (
                  <Link href={`/admin/update/${id}`} className={styles.linkButton}>
                      Assign Instructor
                    </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        <Link href={`/admin/update/${id}`} className={styles.linkButton}>
          Update
        </Link>
      </div>
    </div>
  );
};

export default Profile;
