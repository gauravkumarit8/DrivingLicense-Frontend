"use client";

import {
  getUserByEmail,
  getUserTotalTime,
  postUserLogTime,
} from "@/utils/userApi/page";
import Link from "next/link";
import styles from "../Profile.module.css";
import {
  deleteSession,
  getSessionByUser,
} from "@/utils/sessionApi/drivingSessionApi";
import { useEffect, useState } from "react";
import { CONFIG_FILES } from "next/dist/shared/lib/constants";
import PieChart from "./Pichart";

const Profile = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const [userSessions, setUserSessions] = useState([]);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUserByEmail(params.email);
        const dataUser = result.data;
        setUserData(dataUser);

        const sessionResult = await getSessionByUser(dataUser.userId);
        if (sessionResult.success) {
          setUserSessions(sessionResult.data);
        } else {
          console.error("Failed to fetch sessions:", sessionResult.message);
        }
        const totalTimeResult = await getUserTotalTime(dataUser.userId);
        setTotalTime(totalTimeResult.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.email]);
  const submitLogTIme = async (e) => {
    e.preventDefault();

    const time = 1;

    try {
      await postUserLogTime(userData.userId, time);

      const result = await getUserTotalTime(userData.userId);

      setTotalTime(result.data);
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

  
  return (
    <div className="h-screen bg-slate-100">
      <div className="fixed top-0 left-0 flex items-center justify-between w-full h-24 mx-1 rounded-lg bg-slate-400">
        <h1 className="p-2 text-2xl font-bold text-white">RoadRover</h1>
        <div className="p-2 text-lg text-white">
          <span>{userData.email}</span>{" "}
          <span className="p-2 font-bold text-white">Logout</span>
        </div>
      </div>
      <div className="flex h-[600px] pt-24">
        <div className="w-1/2 p-2 m-2 bg-yellow-200 border border-black rounded-lg shadow-2xl shadow-slate-400 ">
          <h1 className="m-auto font-sans text-2xl font-bold">User Details</h1>
          <div className={styles.details}>
            <h2>
              Name: <span>{userData.name}</span>
            </h2>
            <h2>
              Email: <span>{userData.email}</span>
            </h2>
            <h2>
              Aadhaar Number:{" "}
              <span>{userData.aadhaarNumber || "Not ProvuserIded"}</span>
            </h2>
            <h2>
              Role: <span>{userData.role}</span>
            </h2>
            <h2>
              Status: <span>{userData.status}</span>
            </h2>

            <h2>Total Trainging Time - {totalTime}</h2>

            {userData?.availability?.length !== 0 &&
            userData?.availability?.some((d) => d.sessionDate == currentDate) ? (
              <div>
                <h2>Is traing done?</h2>
                <button
                  className="p-2 bg-blue-600 border border-black "
                  onClick={submitLogTIme}
                >
                  Done
                </button>
              </div>
            ) : (
              <h2>no available session date</h2>
            )}
            <h2>Instructors:</h2>
            <ul>
              {userData.instructors && userData.instructors.length > 0 ? (
                userData.instructors.map((instructor) => (
                  <li key={instructor.userId}>
                    {instructor.name} ({instructor.email})
                  </li>
                ))
              ) : (
                <li>No Instructor Assigned</li>
              )}
            </ul>
          </div>
          <div>
            <Link href={`/user/update/${userData.userId}`}>
              <button className="p-2 font-bold text-white bg-red-400 rounded-lg">
                Update Details
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 p-2 m-2 bg-blue-200 border border-black rounded-lg shadow-2xl shadow-slate-400">
          <h className="font-sans text-2xl font-bold">
            Traing Status
            <div>
              <PieChart data={totalTime} />
            </div>
          </h>
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
  );
};

export default Profile;
