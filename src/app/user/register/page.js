"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import { registerUser } from "@/utils/userApi/page";
import Link from "next/link";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadhaarNumber, setaadhaarNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
      aadhaarNumber,
    };

    console.log("User data:", userData); // Add this line to verify data

    const result = await registerUser(userData);
    if (result.success) {
      setMessage("User registered successfully!");
      console.log("User registered:", result.data);

      router.push("/user/login");
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            className={styles.formInput}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            className={styles.formInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.formLabel}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="aadhaarNumber" className={styles.formLabel}>
            aadhaarNumber:
          </label>
          <input
            type="text"
            id="aadhaarNumber"
            className={styles.formInput}
            value={aadhaarNumber}
            onChange={(e) => setaadhaarNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <br />
      <Link href="/user/login" className={styles.submitButton}>
        Login
      </Link>
    </div>
  );
};

export default Register;
