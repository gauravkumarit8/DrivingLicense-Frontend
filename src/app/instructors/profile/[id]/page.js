"use client";

import { useEffect, useState } from "react";
import {
  deleteAvailability,
  getInstructorById,
  getInstructorSession,
  getInstructorTotalTime,
  postInstructorLogTime,
  updateAvailability,
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
  const [instructor, setInstructor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [instrucotrSessions, setInstructorSessions] = useState([]);
  const [intructorTotalTime, setInstructorTotalTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInstructorById(id);
        setInstructor(result.data);
        const totalTimeResult = await getInstructorTotalTime(id);
        setInstructorTotalTime(totalTimeResult.data);
        setAvailability(result.data.availability);
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
      await deleteAvailability(id, day);
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
      const result = await updateAvailability(id, updatedAvailability);
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
      const result = await getInstructorSession(id);

      setInstructorSessions(result.data);
    } catch (err) {
      console.error("Failed to get Instructors Sessions:", err);
      setError("Failed to Instructors Sessions");
    }
  };
  const submitInstructorLogTIme = async (e, userId, sessionDate) => {
    e.preventDefault();

    const time = 1;
    console.log(userId);
    console.log("ses", sessionDate);

    try {
      await postInstructorLogTime(id, userId, sessionDate, time);
      await postUserLogTime(userId, time);

      const result = await getInstructorTotalTime(id);
      const result2 = await getUserTotalTime(userId);
      console.log("instructor ka total hour", result);
      console.log("user ka totla hour", result2);

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
  console.log("lodu", instructor);

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
                    {intructorTotalTime || "0"}
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
          <h2 className="m-auto font-sans text-2xl font-bold text-center">
            Users
          </h2>
          <div className="">
            {instructor?.users?.length > 0 ? (
              instructor.users.map((user, index) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between w-full bg-orange-200 border border-black rounded-lg shadow-2xl shadow-slate-400 h-60"
                >
                  <div className="">
                    {" "}
                    <Image
                      className="w-24 h-24 m-auto ml-4 rounded-full"
                      alt="logo"
                      src={defaultIcon}
                    />
                  </div>
                  <div>
                    <div className="">
                      <label className="text-lg font-bold">Name:</label>
                      <span className="text-lg">{user.name}</span>
                    </div>
                    <div className="">
                      <label className="text-lg font-bold">Email:</label>
                      <span className="text-lg">{user.email}</span>
                    </div>
                    <div className="">
                      <label className="text-lg font-bold">Status:</label>
                      <span className="text-lg">{user.status}</span>
                    </div>

                    <span className={styles.userStatus}>
                      {user.sessionDate}
                    </span>
                    <span className={styles.userStatus}>
                      {user.scheduleDate}
                    </span>
                  </div>
                  <div>
                    <button
                      className="p-2 bg-blue-600 border border-black "
                      onClick={(e) =>
                        submitInstructorLogTIme(
                          e,
                          user.id,
                          user.availability.filter(
                            (a) => a.sessionDate == currentDate
                          )[0]?.sessionDate
                        )
                      }
                    >
                      Done
                    </button>
                  </div>
                  <div>
                    <Pichart data={user.totalHours} />
                  </div>
                </div>
              ))
            ) : (
              <li>No users assigned</li>
            )}
          </div>
        </div>
        {instrucotrSessions.length == 0 ? (
          <div className="pb-4 mx-auto mt-10">
            <button
              className="p-2 m-auto text-3xl font-bold text-center bg-blue-500 rounded-lg shadow-2xl shadow-black"
              onClick={handleGetSessions}
            >
              Get Your All Sessions
            </button>
          </div>
        ) : (
          <InstructorSessions data={instrucotrSessions} />
        )}
      </div>
    </div>
  );
};

export default Profile;
