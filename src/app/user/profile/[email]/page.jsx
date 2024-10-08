"use client";

import {
  getAdminByIdInUser,
  getUserByEmail,
  getUserTotalTime,
  logoutUser,
  postUserLogTime,
} from "@/utils/userApi/page";
import Link from "next/link";
import styles from "../Profile.module.css";
import {
  deleteSession,
  getSessionByUser,
} from "@/utils/sessionApi/drivingSessionApi";
import { useEffect, useState } from "react";
import PieChart from "./Pichart";
import { getAdminById } from "@/utils/adminApi/page";
import { useRouter } from "next/navigation";

const Profile = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [userSessions, setUserSessions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log(token);
        setToken(token);
        const result = await getUserByEmail(params.email);
        const dataUser = result.data;
        setUserData(dataUser);
        const adminName = await getAdminByIdInUser(dataUser.adminId);
        setAdmin(adminName.data);
        const sessionResult = await getSessionByUser(dataUser.userId);
        if (sessionResult.success) {
          setUserSessions(sessionResult.data);
        } else {
          console.error("Failed to fetch sessions:", sessionResult.message);
        }
        const totalTimeResult = await getUserTotalTime(
          adminName.data.name,
          dataUser.userId
        );
        setTotalTime(totalTimeResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.email]);

  const submitLogTime = async (e) => {
    e.preventDefault();

    const time = 1;

    try {
      const response = await postUserLogTime(
        admin.name,
        userData.userId,
        time,
        currentDate
      );
      if (response.success) {
        const result = await getUserTotalTime(admin.name, userData.userId);
        setTotalTime(result.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Error updating total time: " + error.message);
    }
  };

  function getLocalDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const day = now.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const currentDate = getLocalDate();

  const handleDeleteSession = async (e, userId) => {
    e.preventDefault();

    try {
      await deleteSession(userId);
      console.log("delete ho gya bhai");
    } catch (error) {
      console.error("Error Deleting Sessions", error);
    }
  };

  if (!userData) {
    return <div className="">Loading...</div>;
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push(`/`);
    } catch (error) {
      console.error("Error ocured while logout ", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="h-screen bg-slate-100">
        {error && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
              <h2 className="text-red-500">{error}</h2>
              <button onClick={() => setError(null)}>Close</button>
            </div>
          </div>
        )}
        <div className="fixed top-0 left-0 flex items-center justify-between w-full h-24 mx-1 rounded-lg bg-slate-400">
          <h1 className="p-2 text-2xl font-bold text-white">RoadRover</h1>
          <div className="p-2 text-lg text-white">
            <span>{userData.email}</span>{" "}
            <button className="p-2 font-bold text-white" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="user-details-container">
          <div className="user-details w-1/2 p-2 m-2 bg-yellow-200 border border-black rounded-lg shadow-2xl shadow-slate-400">
            <h1 className="m-auto font-sans text-2xl font-bold">
              User Details
            </h1>
            <div className={styles.details}>
              <h2>
                Name: <span>{userData.name}</span>
              </h2>
              <h2>
                Email: <span>{userData.email}</span>
              </h2>
              <h2>
                Aadhaar Number:{" "}
                <span>{userData.aadhaarNumber || "Not Provided"}</span>
              </h2>
              <h2>
                Role: <span>{userData.role}</span>
              </h2>
              <h2>
                Status: <span>{userData.status}</span>
              </h2>

              <h2>Total Training Time - {totalTime}</h2>

              {/* {userData?.availability?.length !== 0 &&
              userData?.availability?.some((d) => d.sessionDate == currentDate) ? ( */}
              <div>
                <h2>Is training done?</h2>
                <button
                  className="p-2 bg-blue-600 border border-black "
                  onClick={submitLogTime}
                >
                  Done
                </button>
              </div>
              {/* ) : (
              <h2>no available session date</h2>
            )} */}
              <h2>Instructors:</h2>
              <h2>Assigned Instructors:</h2>
              <ul>
                {userData.assignedInstructors &&
                userData.assignedInstructors.length > 0 ? (
                  userData.assignedInstructors.map((instructor) => (
                    <li key={instructor.instructorId}>
                      {instructor.instructorName} (Day: {instructor.day})
                    </li>
                  ))
                ) : (
                  <li>No Instructor Assigned</li>
                )}
              </ul>
            </div>
            <div>
              <Link
                href={`/user/update/${userData.adminName}/${userData.userId}`}
              >
                <button className="p-2 font-bold text-white bg-red-400 rounded-lg">
                  Update Details
                </button>
              </Link>
              <Link href={`/license/user/${userData.userId}`}>
                <button className="p-2 font-bold text-white bg-red-400 rounded-lg">
                  Get License Details
                </button>
              </Link>
            </div>
          </div>
          <div className="training-status w-1/2 p-2 m-2 bg-blue-200 border border-black rounded-lg shadow-2xl shadow-slate-400">
            <h2 className="font-sans text-2xl font-bold">
              Training Status
              <div>
                <PieChart data={totalTime} />
              </div>
            </h2>
          </div>
        </div>

        {userSessions.length > 0 && (
          <div className="w-full p-2 bg-green-500 border border-black shadow-2xl rounded-2xl shadow-black">
            <h2 className="m-auto font-sans text-2xl font-bold">
              Session Details
            </h2>
            {userSessions.map((session) => (
              <div key={session.userId} className="">
                {session.instructor && (
                  <>
                    <h3>
                      Instructor Name:{" "}
                      <span>{session.instructor?.name || "Not Assigned"}</span>
                    </h3>
                    <h3>
                      Instructor Email:{" "}
                      <span>{session.instructor?.email || "Not Assigned"}</span>
                    </h3>
                  </>
                )}
                <h3 className="text-lg font-semibold">
                  Session Date:{" "}
                  <span className="text-lg text-white">
                    {session.availability[0].sessionDate}
                  </span>
                </h3>
                <h3 className="text-lg font-semibold">
                  Schedule Date:{" "}
                  <span className="text-lg text-white">
                    {session.availability[0].scheduleDate}
                  </span>
                </h3>
                <h3 className="text-lg font-semibold">Availability:</h3>
                <ol className="pl-5 space-y-2 list-decimal">
                  {session.availability.map((avail) => (
                    <li key={avail.sessionDate}>
                      <span className="text-lg font-semibold">{avail.day}</span>{" "}
                      <span className="text-lg text-white">
                        ({avail.sessionDate})
                      </span>{" "}
                      Start Time :
                      <span className="text-lg text-white">
                        ({avail.startTime})
                      </span>{" "}
                      End Time :
                      <span className="text-lg text-white">
                        ({avail.endTime})
                      </span>
                    </li>
                  ))}
                </ol>
                <h3 className="text-lg font-semibold">
                  Status:{" "}
                  <span className="text-lg text-white">{session.status}</span>
                </h3>
                <div className="flex">
                  <button
                    className="p-1 mx-2 font-bold text-white bg-red-400 rounded-lg "
                    onClick={(e) => handleDeleteSession(e, session.userId)}
                  >
                    Delete Sessions
                  </button>
                  <button className="p-1 mx-2 font-bold text-white bg-yellow-400 rounded-lg ">
                    Update Sessions
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {userSessions.length === 0 && (
          <div className="pb-4 mt-10">
            <h4 className="w-1/4 p-2 m-auto text-3xl font-bold text-center bg-blue-500 rounded-lg shadow-2xl shadow-black">
              <Link href={`/user/session/${userData.userId}`}>
                Book Your Sessions
              </Link>
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
