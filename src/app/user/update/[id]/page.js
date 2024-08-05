"use client";

import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "@/utils/userApi/page";
import styles from "../Edit.module.css";
import { useParams, useRouter } from "next/navigation";

const Edit = ({ params }) => {
  const route = useRouter();

  const { id } = params;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    // Add more fields as needed
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getUserById(id);
      setUser(response.data);
      // console.log(response.data);
      const result = await updateUser(id, { ...formData });
      alert("User updated successfully!");
      route.push(`/user/profile/${response.data.email}`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.header}>Edit User</h1>
      <form onSubmit={handleSubmit} className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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
