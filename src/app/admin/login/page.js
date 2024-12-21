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
        try {
            const result = await loginAdmin(adminData);
            
            if (result.success) {
                const response = result.data;
    
                // Extract userDetails from the response
                const userDetails = response.userDetails;
    
                // Check if the logged-in user is an admin
                if (userDetails.role !== 'ADMIN') {
                    setMessage('Error: Access denied. User is not an admin.');
                    return;
                }
    
                // Log success message
                setMessage('Admin Logged in successfully!');
                console.log('Admin logged:', result.data);
    
                // Navigate to the profile page with the user's ID
                router.push(`/admin/profile/${userDetails.id}`);
            } else {
                // Set error message if login was not successful
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            // Handle any errors that occurred during login
            console.error('An error occurred:', error);
            setMessage('An error occurred during login.');
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Login</h1>
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

