"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./ReAssignInstructor.module.css";
import { getAvailableInstructors, reAssignInstructor } from "@/utils/adminApi/page";

const ReassignInstructorPage = ({ params }) => {
  const { adminId, userId } = params;
  const router = useRouter();
  const searchParams = useSearchParams();
  const day = searchParams.get("day"); // Extract the day from URL query parameters

  const [availableInstructors, setAvailableInstructors] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchAvailableInstructors = async () => {
      try {
        const result = await getAvailableInstructors(day); // Fetch instructors for the specific day
        if (Array.isArray(result.data)) {
          setAvailableInstructors(result.data);
        } else {
          setErrorMessage("No instructors available on this day.");
        }
      } catch (error) {
        console.error("Failed to fetch available instructors:", error);
        setErrorMessage("An error occurred while fetching instructors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableInstructors();
  }, [day]);

  const handleReassign = async () => {
    if (!selectedInstructorId) {
      alert("Please select an instructor to assign.");
      return;
    }

    try {
      const result = await reAssignInstructor(userId, selectedInstructorId, day);
      if (result.success) {
        alert("Instructor reassigned successfully!");
        router.push(`/admin/profile/${adminId}`);
      } else {
        setErrorMessage(result.data);
      }
    } catch (error) {
      console.error("Failed to reassign instructor:", error);
      setErrorMessage("An error occurred during reassignment.");
    }
  };

  if (loading) {
    return <div>Loading available instructors...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Reassign Instructor for User</h1>
      <p>Select an instructor available on <strong>{day}</strong>:</p>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      <ul className={styles.instructorList}>
        {availableInstructors.map((instructor) => (
          <li key={instructor.id} className={styles.instructorItem}>
            <label>
              <input
                type="radio"
                name="instructor"
                value={instructor.id}
                onChange={() => setSelectedInstructorId(instructor.id)}
              />
              {instructor.name} - {instructor.email} - License: {instructor.drivingLicenseNumber || "N/A"}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleReassign} className={styles.reassignButton}>
        Reassign Instructor
      </button>
    </div>
  );
};

export default ReassignInstructorPage;
