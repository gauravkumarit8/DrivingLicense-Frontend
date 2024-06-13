"use client";

import { loginAdmin } from '@/utils/adminApi/page'
import React, { useState } from 'react'
import styles from './Login.module.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleClick = async (e) => {
        e.preventDefault();
        const adminData = {
            email,
            password
        };
        const result = await loginAdmin(adminData);
        if (result.success) {
            setMessage('Admin Logged in successfully!');
            console.log('Admin logged:', result.data);
            router.push(`/admin/profile/${result.data.id}`);
        } else {
            setMessage(`Error: ${result.message}`);
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Login</h1>
            <form onSubmit={handleClick} className={styles.form}>
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
            {message && <p className={styles.message}>{message}</p>}
            <br />
            <Link href={'/admin/register'} className={styles.submitButton}>Register
            </Link>
        </div>
    );
}

export default Login;
