// import { assignInstructorToUser, getInstructors } from '@/utils/adminApi/page';
// import { getUserById } from '@/utils/userApi/page';
// import React from 'react'

// const AssignInstructor =async ({params}) => {
//     const {id}=params;
//     const responseUser=await getUserById(id); //get user by id
//     const responseInstructor= await getInstructors();// get all instructor
//     const {data}=responseInstructor;

//     const handleSubmit=async(e)=>{
//         e.preventdefault;
//         const assign=await assignInstructorToUser(userId,instructorId)
//     }
//   return (
//     <>
//         <div>
//             <div>User data</div>
//             <hr/>
//             <div>
//                 <div> {/* user details */}
//                     <span>Name:- {responseUser.data.name} </span><br/>
//                     <span>Email:- {responseUser.data.email} </span><br/>
//                     <span>Aadhar:- {responseUser.data.aadhaarNumber} </span><br/>
//                     <span>Role:- {responseUser.data.role} </span><br/>
//                     <span>Status:- {responseUser.data.status} </span><br/>
//                 </div>
//                 <div> {/* all instuctor */}
//                     {
//                         data.map((i,index)=>(
//                             <div key={i.id}>
//                                 <span >{i.name}</span>
//                             </div>
                            
//                         ))
//                     }
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }

// export default AssignInstructor


"use client"

import { assignInstructorToUser, getInstructors } from '@/utils/adminApi/page';
import { getUserById } from '@/utils/userApi/page';
import React, { useState, useEffect } from 'react';

const AssignInstructor = ({ params }) => {
  const { id } = params;
  const [user, setUser] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseUser = await getUserById(id);
        const responseInstructor = await getInstructors();
        setUser(responseUser.data);
        setInstructors(responseInstructor.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInstructorChange = (e) => {
    setSelectedInstructorId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedInstructorId) {
      try {
        const assign = await assignInstructorToUser(id, selectedInstructorId);
        if (assign) {
          alert('Instructor assigned successfully!');
          // Refetch the user data to update the profile with the assigned instructor
          const updatedUser = await getUserById(id);
          setUser(updatedUser.data);
        } else {
          alert('Failed to assign instructor.');
        }
      } catch (err) {
        alert('An error occurred while assigning the instructor.');
      }
    } else {
      alert('Please select an instructor.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user || instructors.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <>
      <div>
        <div>User Data</div>
        <hr />
        <div>
          <div>
            {/* User details */}
            <span>Name: {user.name}</span><br />
            <span>Email: {user.email}</span><br />
            <span>Aadhar: {user.aadhaarNumber}</span><br />
            <span>Role: {user.role}</span><br />
            <span>Status: {user.status}</span><br />
          </div>
          <div>
            {/* Form to assign instructor */}
            <form onSubmit={handleSubmit}>
              <label htmlFor="instructorSelect">Select Instructor:</label><br />
              <select id="instructorSelect" value={selectedInstructorId} onChange={handleInstructorChange}>
                <option value="">--Select an Instructor--</option>
                {instructors.map((instructor) => (
                  <option key={instructor.id} value={instructor.id}>
                    {instructor.name}
                  </option>
                ))}
              </select><br /><br />
              <button type="submit">Assign Instructor</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignInstructor;
