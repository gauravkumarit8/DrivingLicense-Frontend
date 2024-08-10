"use client";

import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "@/utils/userApi/page";
import styles from "../Edit.module.css";
import { useRouter } from "next/navigation";

const Edit = ({ params }) => {
  const route = useRouter();

  const { id } = params;

  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await getUserById(id);

      setUserName(response.data.name);
      setUserPassword(response.data.password);
    };
    getUserDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userUpdatedData = {
      name: userName,
      password: userPassword,
    };

    try {
      const result = await updateUser(id, userUpdatedData);
      alert("User updated successfully!");

      route.push(`/user/profile/${result.data.email}`);
    } catch (error) {
      setError(error.message);
    }
  };

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
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
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
