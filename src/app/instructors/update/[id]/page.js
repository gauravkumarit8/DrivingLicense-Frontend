"use client";

import React, { useState, useEffect } from "react";

import styles from "./Edit.module.css";
import { useRouter } from "next/navigation";
import {
  getInstructorById,
  updateInstructor,
} from "@/utils/instructorApi/page";

const Edit = ({ params }) => {
  const route = useRouter();

  const { id } = params;

  const [error, setError] = useState(null);
  const [instructorName, setInstructorName] = useState("");
  const [instructorPassword, setIntrutorPassword] = useState("");
  const [instructorPhone, setInstructorPhone] = useState(null);

  const adminName="admin2";

  useEffect(() => {
    const getInstructorDetails = async () => {
      const response = await getInstructorById(adminName,id);

      setInstructorName(response.data.name);
      setIntrutorPassword(response.data.password);
      setInstructorPhone(response.data.phone);
    };
    getInstructorDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("from submit");
    const instructorUpdatedData = {
      name: instructorName,
      password: instructorPassword,
      phone: instructorPhone,
    };

    try {
      const result = await updateInstructor(adminName,id, instructorUpdatedData);
      alert("Instructor updated successfully!");

      route.push(`/instructors/profile/${result.data.id}`);
    } catch (error) {
      setError(error.message);
    }
  };
  if (instructorPhone == null) return <h1>tum chutyia ho</h1>;

  return (
    <div className="w-1/4 p-4 m-auto mt-24 border border-black rounded-lg shadow-sm shadow-black">
      <h1 className="text-2xl font-bold text-center">Edit User</h1>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={instructorName}
            onChange={(e) => setInstructorName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={instructorPassword}
            onChange={(e) => setIntrutorPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={instructorPhone}
            onChange={(e) => setInstructorPhone(e.target.value)}
            required
          />
        </div>
        {/* Add more form fields as needed */}
        <button type="submit" className={styles.submitButton}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
