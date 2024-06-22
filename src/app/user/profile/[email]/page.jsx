"use client";

import { getUserByEmail } from "@/utils/userApi/page";
import Link from "next/link";
import styles from '../Profile.module.css';
import { getSessionByUser } from "@/utils/sessionApi/drivingSessionApi";
import { useEffect, useState } from "react";

const Profile = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserByEmail(params.email);
        const dataUser = result.data;
        setUserData(dataUser);

        const userSessionResult = await getSessionByUser(dataUser.id);
        const session = userSessionResult.data.length > 0 ? userSessionResult.data[0] : null;
        setUserSession(session);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.email]);

  if (!userData) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRight}>
        <div className={styles.userEmail}>{userData.email}</div>
      </div>
      <h1 className={styles.header}>User Details</h1>
      <div className={styles.details}>
        <h2>Name: <span>{userData.name}</span></h2>
        <h2>Email: <span>{userData.email}</span></h2>
        <h2>Aadhaar Number: <span>{userData.aadhaarNumber}</span></h2>
        <h2>Role: <span>{userData.role}</span></h2>
        <h2>Status: <span>{userData.status}</span></h2>
        <h2>Instructors:</h2>
        <ul>
          {userData.instructors && userData.instructors.length > 0 ? (
            userData.instructors.map((instructor) => (
              <li key={instructor.id}>
                {instructor.name} ({instructor.email})
              </li>
            ))
          ) : (
            <li>No Instructor Assigned</li>
          )}
        </ul>
      </div>
      {userSession && (
        <div className={styles.sessionDetails}>
          <h2>Session Details</h2>
          <h3>Instructor Name: <span>{userSession.instructor?.name || "Not Assigned"}</span></h3>
          <h3>Instructor Email: <span>{userSession.instructor?.email || "Not Assigned"}</span></h3>
          <h3>Session Date: <span>{new Date(userSession.sessionDate).toLocaleString()}</span></h3>
          <h3>Schedule Date: <span>{new Date(userSession.scheduleDate).toLocaleString()}</span></h3>
          <h3>Availability: <span>{userSession.availability.join(", ")}</span></h3>
        </div>
      )}
      {!userSession && (
        <h4 className={styles.sessionsLink}>
          Get user sessions: <Link href={`/user/session/${userData.id}`}>My Sessions</Link>
        </h4>
      )}
      <h4 className={styles.sessionsLink}>
        Update: <Link href={`/user/update/${userData.id}`}>Update</Link>
      </h4>
    </div>
  );
};

export default Profile;
