"use client";

import { getAdminById, getAvailableInstructors, reAssignInstructorUpdate } from "@/utils/adminApi/page";
import { getUserById } from "@/utils/userApi/page";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './ReAssignInstructor.module.css'

const ReassignInstructorPage = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [adminId, userId] = id;
  const searchParams = useSearchParams();
  const day = searchParams.get("day");

  const [adminDa,setAdminDa]=useState(null);
  const [user, setUser] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminDetails=await getAdminById(adminId);
        setAdminDa(adminDetails.data);
        const responseUser = await getUserById(adminDetails.data.name,userId);
        const availableInstructors = await getAvailableInstructors(adminDetails.data.name,day);
        setUser(responseUser.data);

        if (Array.isArray(availableInstructors.data)) {
          setInstructors(availableInstructors.data);
        } else {
          console.error("Expected array but got:", availableInstructors.data);
          setInstructors([]);
        }
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, day]);

  const handleReassign = async () => {
    if (!user || !selectedInstructor) return;
    
    const response = await reAssignInstructorUpdate(setAdminDa.name,user.id, selectedInstructor, day);
    if (response.success) {
      alert("Instructor reassigned successfully!");
      router.push(`/admin/profile/${adminId}`);
    } else {
      alert(`Failed to reassign instructor: ${response.data}`);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <h1>Reassign Instructor for {day}</h1>
      {user && (
        <div className={styles.userDetails}>
          <h2>User Details:</h2>
          <div>Name: {user.name}</div>
          <div>Email: {user.email}</div>
          <div>Current Assigned Days: {user.assignedInstructors.map((ai) => ai.day).join(", ")}</div>
        </div>
      )}

      <h2>Available Instructors for {day}:</h2>
      <div className={styles.instructorList}>
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <div
              key={instructor.id}
              className={`${styles.instructorCard} ${selectedInstructor === instructor.id ? styles.selected : ""}`}
              onClick={() => setSelectedInstructor(instructor.id)}
            >
              <h3>{instructor.name}</h3>
              <p><strong>Email:</strong> {instructor.email}</p>
              <p><strong>Phone:</strong> {instructor.phone}</p>
            </div>
          ))
        ) : (
          <p>No instructors available for this day.</p>
        )}
      </div>
      {selectedInstructor && (
        <button className={styles.submitButton} onClick={handleReassign}>
          Reassign Instructor
        </button>
      )}
    </div>
  );
};

export default ReassignInstructorPage;
