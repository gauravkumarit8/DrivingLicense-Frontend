"use client"

import { registerInstructor } from "@/utils/instructorApi/page";
import { useState } from "react";
import styles from '../login/Login.module.css'
import Link from "next/link";

const Register = () => {

  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [phone,setPhone]=useState('');
  const [drivingLicense,setDrivingLicense]=useState('');
  const [availability,setAvailability]=useState([]);
  const [message,setMessage]=useState('');

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const instructorData={
      name,
      email,
      password,
      phone,
      drivingLicense,
      availability
    }
    const result=await registerInstructor(instructorData);
    if (result.success) {
      setMessage('Instructor Logged in successfully!');
      console.log('Instructor logged:', result.data);

      router.push(`/instructors`);
    } else {
      setMessage(`Error: ${result.message}`);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Name:</label>
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
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>Phone Number :</label>
          <input
            type="text"
            id="phone"
            className={styles.formInput}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="drivingLicense" className={styles.formLabel}>Driving License :</label>
          <input
            type="text"
            id="drivingLicense"
            className={styles.formInput}
            value={drivingLicense}
            onChange={(e) => setDrivingLicense(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}<br/>
      <Link href="/instructors/login" className={styles.submitButton}>Login</Link>
    </div>
  )
}

export default Register