"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation"; // Import from 'next/router' instead of 'next/navigation'
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import defaultIcon from "@/images/defaultIcon.png";
import InstructorSessions from "./InstructorSessions";
import AvailabilityForm from "../../availability/AvailabilityForm/page";
import {
  getInstructorById,
  getInstructorSession,
  getInstructorTotalTime,
  postInstructorLogTime,
  updateAvailability,
  deleteAvailability,
  getSessionTime,
  logoutInstructor,
} from "@/utils/instructorApi/page";
import { getUserTotalTime } from "@/utils/userApi/page";

const Profile = () => {
  const router = useRouter(); // Use 'useRouter' from 'next/router'
  const params = useParams();
  const id = params.id;

  const [instructor, setInstructor] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [instructorSessions, setInstructorSessions] = useState([]);
  const [instructorTotalTime, setInstructorTotalTime] = useState(0);
  const [allSessionTime, setAllSessionTime] = useState([]);
  const [updatingAvailability, setUpdatingAvailability] = useState(false);
  const [logTimeError, setLogTimeError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      const result = await getInstructorById(id);
      setInstructor(result.data);
      setAdmin(result.data.adminName);

      const totalTimeResult = await getInstructorTotalTime(
        result.data.adminName,
        id
      );
      setInstructorTotalTime(totalTimeResult.data);

      setAvailability(result.data.availability);

      const allSessionTrainingTime = await getSessionTime(
        result.data.adminName,
        id
      );
      const sessionsArray = Object.entries(allSessionTrainingTime.data).map(
        ([date, times]) => ({
          sessionDate: date,
          sessionTimes: times,
        })
      );
      setAllSessionTime(sessionsArray);

      const loggedSession = await getInstructorSession(
        result.data.adminName,
        id
      );
      setInstructorSessions(loggedSession.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

  const handleUpdateAvailability = () => setUpdatingAvailability(true);
  const handleCloseForm = () => setUpdatingAvailability(false);

  const handleSubmitAvailability = async (updatedAvailability) => {
    try {
      const result = await updateAvailability(admin, id, updatedAvailability);
      setAvailability(result.data.availability);
      setUpdatingAvailability(false);
    } catch (err) {
      console.error("Failed to update availability:", err);
      setError("Failed to update availability");
    }
  };

  const submitInstructorLogTime = async (e, userId, sessionDate) => {
    // console.log("submitInstructorLogTime", userId, sessionDate);
    e.preventDefault();
    const time = 1;
    try {
      await postInstructorLogTime(admin, id, userId, sessionDate, time);
      const result = await getInstructorTotalTime(admin, id);
      setInstructorTotalTime(result.data);
      setLogTimeError(null);
      await getUserTotalTime(admin, userId);
      fetchData(); // Refresh data after logging time
    } catch (error) {
      console.error("Failed to post Instructor Log time:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      setLogTimeError(errorMessage);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutInstructor();
      router.push("/"); // Navigate to home page after logout
    } catch (error) {
      console.error("Error occurred while logout", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {logTimeError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-4 bg-white rounded-lg shadow-lg max-w-md">
            <h2 className="mb-2 text-xl font-bold">Error Occurred</h2>
            <p className="mb-4 text-lg">{logTimeError}</p>
            <button
              className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
              onClick={() => setLogTimeError(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16 px-4 bg-slate-400">
        <h1 className="text-2xl font-bold text-white">RoadRover</h1>
        <div className="text-lg text-white">
          <span className="mr-4">{instructor?.email}</span>
          <button className="font-bold hover:underline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="container px-4 pt-20 mx-auto">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="p-6 bg-yellow-200 rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center">
              Instructor Profile
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between">
              <div>
                <p>
                  <strong>Name:</strong> {instructor?.name}
                </p>
                <p>
                  <strong>Email:</strong> {instructor?.email}
                </p>
                <p>
                  <strong>Phone:</strong> {instructor?.phone}
                </p>
                <p>
                  <strong>Total Hours Trained:</strong>{" "}
                  {instructorTotalTime || "0"}
                </p>
              </div>
              <Image
                className="w-32 h-32 mt-4 rounded-full md:mt-0 md:w-48 md:h-48"
                alt="Instructor"
                src={defaultIcon}
              />
            </div>
          </section>

          <section className="p-6 bg-blue-200 rounded-lg shadow-lg">
            {updatingAvailability ? (
              <AvailabilityForm
                currentAvailability={availability}
                onSubmit={handleSubmitAvailability}
                onClose={handleCloseForm}
              />
            ) : (
              <div>
                <h2 className="mb-4 text-2xl font-bold">Availability</h2>
                {availability.length > 0 ? (
                  <>
                    <ul className="mb-4 space-y-2">
                      {availability.map((avail, index) => (
                        <li key={index} className="flex justify-between">
                          <span>
                            {avail.day}: {avail.startTime} - {avail.endTime}
                          </span>
                          <button
                            onClick={() => handleDeleteAvailability(avail.day)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
                      onClick={handleUpdateAvailability}
                    >
                      Update Availability
                    </button>
                  </>
                ) : (
                  <div>
                    <p className="mb-4">No availability set.</p>
                    <Link
                      href={`/instructors/availability/addAvailability/${id}`}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
                    >
                      Add Availability
                    </Link>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        <section className="mt-6 p-6 bg-green-200 rounded-lg shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Sessions</h2>
          <div className="grid gap-4 mb-6 md:grid-cols-3 lg:grid-cols-4">
            {allSessionTime.map((session, index) => (
              <div key={index} className="p-4 bg-white rounded-lg shadow">
                <p className="font-bold">{session.sessionDate}</p>
                <div className="mt-2 space-y-1">
                  {session.sessionTimes.map((time, timeIndex) => (
                    <span
                      key={timeIndex}
                      className="block text-sm text-gray-600"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <InstructorSessions
            instructorSessions={instructorSessions}
            submitInstructorLogTime={submitInstructorLogTime}
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {instructor?.users
              ?.reduce((acc, user) => {
                // Check if the user already exists in the accumulator
                if (!acc.some((u) => u.userId === user.userId)) {
                  acc.push({
                    userId: user.userId,
                    name: user.name,
                    email: user.email,
                    availability: user.availability.map((session) => ({
                      day: session.day,
                      startTime: session.startTime,
                      endTime: session.endTime,
                    })),
                  });
                }
                return acc;
              }, [])
              .map((user, index) => (
                <div key={index} className="p-4 bg-white rounded-lg shadow">
                  <h3 className="mb-2 text-lg font-bold">{user.name}</h3>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Session Dates:</strong>
                  </p>
                  <ul className="mt-2 space-y-1">
                    {user.availability.map((session, idx) => (
                      <li key={idx} className="text-sm">
                        {session.day}: {session.startTime} -{" "}
                        <span className="font-medium">{session.endTime}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
