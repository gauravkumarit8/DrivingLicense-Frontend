"use client";

import { deleteUser, getAdminById, getUsersWithAvailability, logoutAdmin } from "@/utils/adminApi/page";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const Profile = ({ params }) => {
  const { id } = params;
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const fetchData = async () => {
    try {
      const adminResult = await getAdminById(id);
      const usersResult = await getUsersWithAvailability(adminResult.data.name);
      console.log(usersResult);
      setAdmin(adminResult.data);
      if (Array.isArray(usersResult.data)) {
        setUsers(usersResult.data);
      } else {
        setErrorMessage(usersResult.data.message);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setErrorMessage("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleLogout= async()=>{
    try{
      await logoutAdmin();
      router.push(`/`);
    }catch(error){
      console.error("Error ocured while logout ", error);
    }
  }

  const handleDeleteUser = async (admin,userId) => {
    try {
      await deleteUser(admin,userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to delete user:", err);
      alert("Failed to delete user. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
console.log("user")
console.log(users);
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
        <div className="p-2 text-lg text-white">
          <button className="p-2 font-bold text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Users details */}
        <div className={styles.userContainer}>
          {errorMessage ? (
            <div>{errorMessage}</div>
          ) : (
            users.map((user, userIndex) => (
              <div key={user.id} className={styles.userCard}>
                <div className={styles.userDetails}>
                  <button
                    onClick={() => handleDeleteUser(admin.name,user.id)}
                    type="submit"
                    className={styles.deleteButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <span>{userIndex + 1}. </span>
                  <span>Name: {user.userName}</span>
                  <br />
                  <span>Email: {user.email}</span>
                  <br />
                  <span>Aadhaar: {user.aadhaarNumber}</span>
                  <br />
                  <span>Status: {user.status}</span>
                  <br />
                  
                  {/* Availability and Instructor Details */}
                  {user.availability && user.availability.length > 0 && (
                    <div className={styles.availability}>
                      <h2>Availability:</h2>
                      {user.availability.map((availability, availIndex) => (
                        <div key={availIndex} className={styles.availabilityCard}>
                          <div>Day: {availability.day}</div>
                          <div>Start Time: {availability.startTime}</div>
                          <div>End Time: {availability.endTime}</div>
                          <div>Session Date: {new Date(availability.sessionDate).toLocaleDateString()}</div>
                          <div>Schedule Date: {new Date(availability.scheduleDate).toLocaleDateString()}</div>

                          {/* Assigned Instructors */}
                          {user.assignedInstructors
                            .filter((instructor) => instructor.day === availability.day)
                            .map((assignedInstructor, instrIndex) => (
                              <div key={instrIndex} className={styles.instructorDetails}>
                                <h3>Assigned Instructors:</h3>
                                <div>Name: {assignedInstructor.instructorName}</div>
                                <div>Day: {assignedInstructor.day}</div>
                                {/* <div>Instructor ID: {assignedInstructor.instructorId}</div> */}
                                <Link
                                  href={`/admin/assignInstructor/reAssignInstructor/${admin.id}/${user.id}?day=${availability.day}`}
                                  className={styles.linkButton}
                                >
                                  Update Instructor
                                </Link>
                              </div>
                            ))}
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>

                {/* Conditionally render "Assign Instructor" button */}
                {!user.assignedInstructors.length && (
                  <Link
                    href={`/admin/assignInstructor/AssignInstructor/${admin.id}/${user.id}`}
                    className={styles.linkButton}
                  >
                    Assign Instructor
                  </Link>
                )}
              </div>
            ))
          )}
        </div>

        {/* Update admin links */}
        <Link href={`/admin/update/${id}`} className={styles.linkButton}>
          Update
        </Link>
        <Link href={`/admin/instructors/${id}`} className={styles.linkButton}>
          Instructor
        </Link>
        <Link href={`/admin/users/${id}`} className={styles.linkButton}>
          User
        </Link>
      </div>
    </div>
  );
};

export default Profile; 
