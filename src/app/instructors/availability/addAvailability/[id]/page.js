"use client";

import { addAvailability, getInstructorById } from "@/utils/instructorApi/page";
import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { useParams, useRouter } from "next/navigation";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const AddAvailability = () => {
  const params=useParams();
  const id=params.id;

  const [admin,setAdmin]=useState(null)
  const [availability, setAvailability] = useState([]);
  const [currentDay, setCurrentDay] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const adminName="admin2";

  const handleAddAvailability = () => {
    // Check if start time and end time are set and valid
    if (currentDay && startTime && endTime) {
      // Convert times to Date objects
      const start = startTime.toDate();
      const end = endTime.toDate();

      // Check if end time is greater than start time
      if (end > start) {
        // Calculate difference in hours
        const diffHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

        // Check if minimum distance is 2 hours
        if (diffHours >= 2) {
          setAvailability([
            ...availability,
            {
              day: currentDay,
              startTime: startTime.format("HH:mm"),
              endTime: endTime.format("HH:mm"),
            },
          ]);
          setCurrentDay("");
          setStartTime(null);
          setEndTime(null);
          setMessage("");
        } else {
          setMessage(
            "Minimum duration between start and end time should be 2 hours."
          );
        }
      } else {
        setMessage("End time must be greater than start time.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const instructordetails=await getInstructorById(id);
      const response = await addAvailability(instructordetails.data.adminName,id, availability);
      setMessage("Availability added successfully");
      router.push(`/instructors/profile/${id}`);
    } catch (error) {
      setMessage("Error adding availability");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h2 className="mb-4 text-2xl font-bold">Add Availability</h2>
      <div className="mb-4">
        <label className="block mb-2">Day:</label>
        <select
          value={currentDay}
          onChange={(e) => setCurrentDay(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select a day
          </option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      {currentDay && (
        <>
          <div className="mb-4">
            <label className="block mb-2">Start Time:</label>
            <Datetime
              value={startTime}
              onChange={setStartTime}
              dateFormat={false}
              timeFormat="HH:mm"
              className="w-full"
              inputProps={{ className: "p-2 border rounded w-full" }}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">End Time:</label>
            <Datetime
              value={endTime}
              onChange={setEndTime}
              dateFormat={false}
              timeFormat="HH:mm"
              className="w-full"
              inputProps={{ className: "p-2 border rounded w-full" }}
            />
          </div>
          <button
            type="button"
            onClick={handleAddAvailability}
            className="px-4 py-2 text-white bg-blue-500 rounded"
          >
            Add Availability
          </button>
          {message && <p className="mt-2 text-red-500">{message}</p>}
        </>
      )}
      <div className="mt-6">
        <h3 className="mb-2 text-xl font-semibold">Current Availability</h3>
        <ul className="pl-5 list-disc">
          {availability.map((avail, index) => (
            <li key={index}>
              {avail.day}: {avail.startTime} - {avail.endTime}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
      >
        Submit
      </button>
      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
};

export default AddAvailability;
