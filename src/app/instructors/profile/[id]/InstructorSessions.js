import React from "react";

const InstructorSessions = (props) => {
  console.log(props.data);
  return (
    <div className="w-full p-2 m-2 bg-pink-200 border border-black rounded-lg shadow-2xl shadow-slate-400 min-h-48">
      {props.data.map((d) => (
        <div key={d.userId}>
          <span className="mx-2 text-lg font-bold">
            User Name : {d.userName}
          </span>
          <span className="mx-2 text-lg font-bold">Day : {d.day}</span>
          <span className="mx-2 text-lg font-bold">
            startTime : {d.startTime}
          </span>
          <span className="mx-2 text-lg font-bold">
            sesion Date : {d.sessionDate}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InstructorSessions;
