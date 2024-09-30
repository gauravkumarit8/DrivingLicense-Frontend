"use client";

import { useEffect, useState } from "react";
import {
  deleteAvailability,
  getInstructorById,
  getInstructorSession,
  getInstructorTotalTime,
  postInstructorLogTime,
  updateAvailability,
  getSessionTime,
  getAssignedUserDetails,
  logoutInstructor,
} from "@/utils/instructorApi/page";
import Link from "next/link";
import styles from "../Profile.module.css";
import AvailabilityForm from "../../availability/AvailabilityForm/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import defaultIcon from "../../../../images/defaultIcon.png";
import Pichart from "@/app/user/profile/[email]/Pichart";
import InstructorSessions from "./InstructorSessions";
import { getUserTotalTime, postUserLogTime } from "@/utils/userApi/page";
import { useRouter } from "next/navigation";

const Profile = ({ params }) => {
  const { id } = params;

  const [admin, setAdmin] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [instructorSessions, setInstructorSessions] = useState([]);
  const [instructorTotalTime, setInstructorTotalTime] = useState(0);
  const [allSessionTime, setAllSessionTime] = useState([]);
  const [logTimeError, setLogTimeError] = useState(null);
  const [userLogTime,setUserLogTime]= useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInstructorById(id);
        setInstructor(result.data);
        const adminName = result.data.adminName;
        setAdmin(adminName);

        // const getUserAssigned = await getAssignedUserDetails(id);
        // console.log(getUserAssigned.data);

        const totalTimeResult = await getInstructorTotalTime(adminName, id);
        setInstructorTotalTime(totalTimeResult.data);

        setAvailability(result.data.availability);

        

        const allSessionTrainingTime = await getSessionTime(adminName, id);
        const sessionsArray = Object.entries(allSessionTrainingTime.data).map(
          ([date, times]) => ({
            sessionDate: date,
            sessionTimes: times,
          })
        );
        setAllSessionTime(sessionsArray);

        const loggedSession = await getInstructorSession(adminName, id);
        setInstructorSessions(loggedSession.data);

        
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteAvailability = async (day) => {
    try {
      await deleteAvailability(admin, id, day);
      setAvailability((prevAvailability) =>
        prevAvailability.filter((avail) => avail.day !== day)
      );
    } catch (err) {
      console.error("Failed to delete availability:", err);
      setError("Failed to delete availability");
    }
  };

  const handleUpdateAvailability = () => {
    setUpdatingAvailability(true);
  };

  const handleCloseForm = () => {
    setUpdatingAvailability(false);
  };

  const handleSubmitAvailability = async (updatedAvailability) => {
    try {
      const result = await updateAvailability(admin, id, updatedAvailability);
      setAvailability(result.data.availability);
      setUpdatingAvailability(false);
      console.log("Availability updated successfully:", result);
    } catch (err) {
      console.error("Failed to update availability:", err);
      setError("Failed to update availability");
    }
  };

  const handleGetSessions = async (e) => {
    try {
      const result = await getInstructorSession(admin, id);
      setInstructorSessions(result.data);
    } catch (err) {
      console.error("Failed to get Instructors Sessions:", err);
      setError("Failed to fetch Instructors Sessions");
    }
  };

  const submitInstructorLogTime = async (e, userId, sessionDate) => {
    e.preventDefault();
    const time = 1;
    try {
      await postInstructorLogTime(admin, id, userId, sessionDate, time);
      const result = await getInstructorTotalTime(admin, id);
      setInstructorTotalTime(result.data);
      setLogTimeError(null);  // Clear any existing error when successful
      const result2 = await getUserTotalTime(adminName, userId);
        setUserLogTime(result2.data);
    } catch (error) {
      console.error("Failed to post Instructor Log time:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setLogTimeError(errorMessage); // Set the error state with the message
    }
  };


  const handleLogout= async()=>{
    try{
      await logoutInstructor();
      router.push(`/`);
    }catch(error){
      console.error("Error ocured while logout ", error);
    }
  }
  
  

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const handleError = (error) => {
    setError(error);
  };

  return (
    <div className="">
      {/* Error pop-up */}
      {logTimeError && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">Error Occurred</h2>
            <p className="text-lg mb-4">{logTimeError}</p>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setLogTimeError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="fixed top-0 left-0 flex items-center justify-between w-full h-24 bg-slate-400">
        <h1 className="p-2 text-2xl font-bold text-white">RoadRover</h1>
        <div className="p-2 text-lg text-white">
          <span>{instructor.email}</span>
          <button className="p-2 font-bold text-white" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col pt-24">
        <div className="flex h-full">
          <div className="w-1/2 p-2 m-2 bg-yellow-200 border border-black rounded-lg shadow-lg">
            <h1 className="text-center text-2xl font-bold">Instructor Profile</h1>
            <div className="flex justify-end mt-8">
              <div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Name:</label>
                  <span className={styles.profileValue}>{instructor?.name}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Email:</label>
                  <span className={styles.profileValue}>{instructor?.email}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Phone Number:</label>
                  <span className={styles.profileValue}>{instructor?.phone}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Total Hours Trained:</label>
                  <span className={styles.profileValue}>
                    {instructorTotalTime || "0"}
                  </span>
                </div>
              </div>
              <Image
                className="w-48 h-48 m-auto rounded-full"
                alt="logo"
                src={defaultIcon}
              />
            </div>
          </div>

          <div className="w-1/2 p-2 m-2 bg-blue-200 border border-black rounded-lg shadow-lg">
            {updatingAvailability ? (
              <AvailabilityForm
                currentAvailability={availability}
                onSubmit={handleSubmitAvailability}
                onClose={handleCloseForm}
              />
            ) : (
              <div>
                {availability.length > 0 ? (
                  <div className={styles.availabilitySection}>
                    <h2 className={styles.sectionHeader}>Availability</h2>
                    <ul className={styles.availabilityList}>
                      {availability.map((avail, index) => (
                        <li key={index} className={styles.availabilityItem}>
                          <span>
                            {avail.day}: {avail.startTime} - {avail.endTime}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={styles.updateButton}
                      onClick={handleUpdateAvailability}
                    >
                      Update Availability
                    </button>
                  </div>
                ) : (
                  <div className={styles.addAvailabilitySection}>
                    <h2 className={styles.sectionHeader}>Add Availability</h2>
                    <Link href={`/instructors/availability/addAvailability/${id}`}>
                      Add Availability
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full p-2 m-2 bg-green-200 border border-black rounded-lg shadow-lg">
          {/* <button
            className="p-2 mx-auto font-bold text-white bg-red-400 rounded-lg w-44"
            onClick={handleGetSessions}
          >
            Get Session
          </button> */}
          <div className={styles.sessionCardsContainer}>
        {allSessionTime.map((session, index) => (
          <div key={index} className={styles.sessionCard}>
            <p className={styles.sessionDate}>{session.sessionDate}</p>
            <div className={styles.sessionTimes}>
              {session.sessionTimes.map((time, timeIndex) => (
                <span key={timeIndex} className={styles.sessionTime}>
                  {time}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

          <InstructorSessions
            instructorSessions={instructorSessions}
            instructorId={id}
            submitInstructorLogTime={submitInstructorLogTime}
          />

          <div className={styles.userCardsContainer}>
            {instructor?.users?.map((user, index) => (
              <div key={index} className={styles.userCard}>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>User Name:</label>
                  <span className={styles.profileValue}>{user.name}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>User Email:</label>
                  <span className={styles.profileValue}>{user.email}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>User LoggedTime:</label>
                  <span className={styles.profileValue}>{userLogTime}</span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Session Dates:</label>
                  <div className={styles.profileValue}>
                    {user.availability.map((session, idx) => (
                      <p key={idx}>{session.day} : {session.startTime}</p>
                    ))}
                  </div>
                </div>
                {/* <button
                  className="p-2 mx-auto font-bold text-white bg-blue-400 rounded-lg w-44"
                  onClick={(e) => submitInstructorLogTime(e, user.id, session.date)}
                >
                  Log Time
                </button> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
