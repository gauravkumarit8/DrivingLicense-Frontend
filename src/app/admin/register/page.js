"use client"

import { registerAdmin } from "@/utils/adminApi/page";
import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '../login/Login.module.css'

const Register = () => {

  const [name,setName]=useState('');
  // const [companyLicense,setCompanyLicense]=useState('')  // will be used after
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [message,setMessage]=useState('');

  const router=useRouter();

  const handleClick=async(e)=>{
    e.preventDefault();
    const adminData={
      name,
      email,
      password
    };
    const result=await registerAdmin(adminData);
    if (result.success) {
      setMessage('Admin Registered in successfully!');
      console.log('Admin Registered:', result.data);
      router.push(`/admin/login`);
    } else {
      setMessage(`Error: ${result.message}`);
    }
  }

  return (
    <div className={styles.container}>
            <h1 className={styles.header}>Login</h1>
            <form onSubmit={handleClick} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>Name:</label>
                    <input
                        type="name"
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
                <button type="submit" className={styles.submitButton}>Register</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
            <br />
            <Link href={'/admin/login'} className={styles.submitButton}>Login
            </Link>
        </div>
  )
}

export default Register