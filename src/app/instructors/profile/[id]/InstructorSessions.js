import React from "react";

const InstructorSessions = (props) => {
  const sessions = props.instructorSessions || [];

  // Function to get the next available session date for a given day in YYYY-MM-DD format
  const getNextSessionDate = (dayName) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const targetDayIndex = daysOfWeek.indexOf(dayName);

    if (targetDayIndex === -1) return "Invalid Day";

    let diff = targetDayIndex - currentDayIndex;
    if (diff < 0) diff += 7; // Get next occurrence if it's a past day in the week

    const targetDate = new Date();
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toISOString().split("T")[0]; // Returns date in "YYYY-MM-DD" format
  };

  // Map users to their nearest session date
  const uniqueUserSessions = sessions.reduce((acc, session) => {
    const { userId, userName, day } = session;
    const sessionDate = getNextSessionDate(day);

    if (!acc[userId] || sessionDate < acc[userId].sessionDate) {
      acc[userId] = { userName, userId, day, sessionDate };
    }

    return acc;
  }, {});

  return (
    <div className="w-full p-4 m-2 bg-pink-200 border border-black rounded-lg shadow-2xl shadow-slate-400 min-h-48">
      {Object.values(uniqueUserSessions).length > 0 ? (
        Object.values(uniqueUserSessions).map((d) => (
          <div key={d.userId} className="mb-4 p-2 border-b border-gray-500">
            <span className="block text-lg font-bold">User Name: {d.userName}</span>
            <p>Session Day: {d.day}</p>
            <p>Session Date: {d.sessionDate}</p> {/* Now in YYYY-MM-DD format */}
            <button
              onClick={(e) => props.submitInstructorLogTime(e, d.userId, d.sessionDate)}
              className="p-2 mt-2 text-white bg-blue-500 rounded"
            >
              Log Time
            </button>
          </div>
        ))
      ) : (
        <p>No sessions available.</p>
      )}
    </div>
  );
};

export default InstructorSessions;
