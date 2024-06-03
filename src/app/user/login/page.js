"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from '../register/Register.module.css';
import { loginUser } from "@/utils/userApi/page";
import Link from "next/link";

const login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password
    };

    const result = await loginUser(userData);
    if (result.success) {
      setMessage('User Logged in successfully!');
      console.log('User logged:', result.data);

      router.push(`/user/profile/${email}`);
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email:</label>
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
          <label htmlFor="password" className={styles.formLabel}>Password:</label>
          <input
            type="password"
            id="password"
            className={styles.formInput}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Login</button>
      </form>
      {message && <p className={styles.message}>{message}</p>} <br/>
      <Link href={'/user/register'} className={styles.submitButton}>Register</Link>
    </div>
  );
};

export default login;
