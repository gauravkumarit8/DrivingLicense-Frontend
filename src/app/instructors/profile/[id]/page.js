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

const Profile = ({ params }) => {
  const { id } = params;

  const [admin,setAdmin]=useState(null);
  const [instructor, setInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [instructorSessions, setInstructorSessions] = useState([]);
  const [instructorTotalTime, setInstructorTotalTime] = useState(0);
  const [allSessionTime, setAllSessionTime] = useState([]);

  // const adminName="admin1";
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const result = await getInstructorById(id);
        setInstructor(result.data);
        const adminName=result.data.adminName;
        setAdmin(result.data.adminName);
        console.log(result.data);

        const getUserAssigned=await getAssignedUserDetails(id);
        console.log(getUserAssigned.data);
  
        const totalTimeResult = await getInstructorTotalTime(adminName,id);
        setInstructorTotalTime(totalTimeResult.data);
  
        setAvailability(result.data.availability);
  
        const allSessionTrainingTime = await getSessionTime(adminName,id);
        const sessionsArray = Object.entries(allSessionTrainingTime.data).map(([date, times]) => ({
          sessionDate: date,
          sessionTimes: times,
        }));
        setAllSessionTime(sessionsArray);
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
      await deleteAvailability(admin,id, day);
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
      const result = await updateAvailability(admin,id, updatedAvailability);
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
      const result = await getInstructorSession(admin,id);

      setInstructorSessions(result.data);
    } catch (err) {
      console.error("Failed to get Instructors Sessions:", err);
      setError("Failed to Instructors Sessions");
    }
  };

  const submitInstructorLogTime = async (admin,e, userId, sessionDate) => {
    e.preventDefault();

    const time = 1;
    console.log(userId);
    console.log("ses", sessionDate);

    try {
      await postInstructorLogTime(admin,id, userId, sessionDate, time);
      await postUserLogTime(admin,userId, time);

      const result = await getInstructorTotalTime(admin,id);
      const result2 = await getUserTotalTime(admin,userId);
      console.log("Instructor total hours", result);
      console.log("User total hours", result2);

      setInstructorTotalTime(result.data);
    } catch (error) {
      console.error("Error updating total time:", error);
    }
  };

  function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  var currentDate = getLocalDate();
  console.log(currentDate);
  currentDate = currentDate.substring(0, 9) + "8" + currentDate.substring(10);
  console.log(currentDate);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className="">
      <div className="fixed top-0 left-0 flex items-center justify-between w-full h-24 mx-1 rounded-lg bg-slate-400">
        <h1 className="p-2 text-2xl font-bold text-white">RoadRover</h1>
        <div className="p-2 text-lg text-white">
          <span>{instructor.email}</span>{" "}
          <span className="p-2 font-bold text-white">Logout</span>
        </div>
      </div>
      <div className="flex h-[800px] pt-24  flex-col">
        <div className="flex h-screen">
          <div className="w-1/2 p-2 m-2 bg-yellow-200 border border-black rounded-lg shadow-2xl shadow-slate-400 ">
            <h1 className="m-auto font-sans text-2xl font-bold text-center">
              Instructor Profile
            </h1>
            <div className="flex justify-end mt-8">
              <div className="">
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Name:</label>
                  <span className={styles.profileValue}>
                    {instructor?.name}
                  </span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Email:</label>
                  <span className={styles.profileValue}>
                    {instructor?.email}
                  </span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>Phone Number:</label>
                  <span className={styles.profileValue}>
                    {instructor?.phone}
                  </span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>
                    Driving License:
                  </label>
                  <span className={styles.profileValue}>
                    {instructor?.drivingLicenseNumber || "Not available"}
                  </span>
                </div>
                <div className={styles.profileGroup}>
                  <label className={styles.profileLabel}>
                    Total Hours Trained
                  </label>
                  <span className={styles.profileValue}>
                    {instructorTotalTime || "0"}
                  </span>
                </div>
                <Link href={`/instructors/update/${instructor.id}`}>
                  <button className="p-1 mx-2 font-bold text-white bg-red-400 rounded-lg ">
                    Update Profile
                  </button>
                </Link>
              </div>
              <Image
                className="w-48 h-48 m-auto rounded-full "
                alt="logo"
                src={defaultIcon}
              />
            </div>
            <div>
          </div>
          </div>
          <div className="w-1/2 p-2 m-2 bg-blue-200 border border-black rounded-lg shadow-2xl shadow-slate-400">
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
                      type="button"
                      className={styles.updateButton}
                      onClick={handleUpdateAvailability}
                    >
                      Update Availability
                    </button>
                  </div>
                ) : (
                  <div className={styles.addAvailabilitySection}>
                    <h2 className={styles.sectionHeader}>Add Availability</h2>
                    <Link
                      href={`/instructors/availability/addAvailability/${id}`}
                    >
                      Add Availability
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="w-full p-2 m-2 bg-green-200 border border-black rounded-lg shadow-2xl shadow-slate-400">
          <div className="flex">
            <button
              className="p-2 mx-auto font-bold text-white bg-red-400 rounded-lg w-44"
              onClick={(e) => {
                handleGetSessions(e);
              }}
            >
              Get Session
            </button>
          </div>
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
            instructorSessions={instructorSessions} // Pass the sessions data correctly
            instructorId={id}
            submitInstructorLogTime={submitInstructorLogTime}
          />

        </div>
        <div className="flex justify-center mt-6">
          <Pichart />
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
