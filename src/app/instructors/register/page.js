"use client"

import { registerInstructor } from "@/utils/instructorApi/page";
import { useEffect, useState } from "react";
import styles from '../login/Login.module.css'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllAdmin, getAllAdminWithLocation } from "@/utils/adminApi/page";

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [drivingLicenseNumber, setdrivingLicenseNumber] = useState('');
  // const [availability, setAvailability] = useState([]);
  const [message, setMessage] = useState('');

  // const handleAvailabilityChange = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setAvailability([...availability, value]);
  //   } else {
  //     setAvailability(availability.filter(day => day !== value));
  //   }
  // };

  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const admins = await getAllAdmin();
        const admins = await getAllAdminWithLocation();
        setAdmins(admins.data);
        if (admins.data.length > 0) {
          setSelectedAdmin(admins.data[0].name); // Set the default selected admin to the first one
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const instructorData = {
      name,
      email,
      password,
      phone,
      drivingLicenseNumber,
      // availability
    };
    
    const result = await registerInstructor(selectedAdmin,instructorData);
    if (result.success) {
      setMessage('Instructor registered successfully!');
      console.log('Instructor registered:', result.data);
      router.push(`/instructors`);
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

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
          <label htmlFor="drivingLicenseNumber" className={styles.formLabel}>Driving License :</label>
          <input
            type="text"
            id="drivingLicenseNumber"
            className={styles.formInput}
            value={drivingLicenseNumber}
            onChange={(e) => setdrivingLicenseNumber(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="admin" className={styles.formLabel}>
            Select Admin:
          </label>
          <select
            id="admin"
            className={styles.formInput}
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            required
          >
            {admins.map((admin) => (
              <option key={admin.id} value={admin.name}>
                {admin.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div className={styles.formGroup}>
          <label className={styles.formLabel}>Availability:</label>
          <div className={styles.checkboxGroup}>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <label key={day} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={day}
                  checked={availability.includes(day)}
                  onChange={handleAvailabilityChange}
                  className={styles.checkboxInput}
                />
                {day}
              </label>
            ))} 
          </div> 
        </div> */}
        <button type="submit" className={styles.submitButton}>Register</button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <br />
      <Link href="/instructors/login" className={styles.submitButton}>Login</Link>
    </div>
  )
}

export default Register;
