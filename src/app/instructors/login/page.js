"use client"

import { loginInstructor } from "@/utils/instructorApi/page";
import { useState } from "react"
import styles from './Login.module.css'
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router =useRouter();

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const instructorData={
      email,
      password
    }
    const adminName="admin2"
    const result=await loginInstructor(adminName,instructorData);
    const response=result.data;
    if (result.success) {
      setMessage('Instructor Logged in successfully!');
      console.log('Instructor logged:', result.data);

      router.push(`/instructors/profile/${response.id}`);
    } else {
      setMessage(`Error: ${result.message}`);
    }
  }

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
      <Link href={'/instructors/register'} className={styles.submitButton}>Register</Link>
    </div>
  )
}

export default Login