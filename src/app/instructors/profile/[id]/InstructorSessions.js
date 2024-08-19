import React from "react";

const InstructorSessions = (props) => {
  const sessions = props.instructorSessions || [];

  return (
    <div className="w-full p-2 m-2 bg-pink-200 border border-black rounded-lg shadow-2xl shadow-slate-400 min-h-48">
      {sessions.length > 0 ? (
        sessions.map((d) => (
          <div key={d.userId}>
            <span className="mx-2 text-lg font-bold">
              User Name: {d.userName}
            </span>
            <p>Session Date: {d.sessionDate}</p>
            <button
              onClick={(e) => props.submitInstructorLogTime(e, d.userId, d.sessionDate)}
              className="p-2 text-white bg-blue-500 rounded"
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
