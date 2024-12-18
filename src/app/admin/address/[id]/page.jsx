"use client"

import { saveAdminAddress } from '@/utils/mapApi/page';
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import styles from './address.module.css'

const Page = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const address = { street, city, state, zip, country };
    try {
      const sendAddress = await saveAdminAddress(id, address);
      if (sendAddress.success) {
        setMessage("Address saved successfully!");
        setTimeout(() => {
          router.back(); // Redirect to the previous page
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street") setStreet(value);
    if (name === "city") setCity(value);
    if (name === "state") setState(value);
    if (name === "zip") setZip(value);
    if (name === "country") setCountry(value);
  };

  return (
    <div>
      {message && <p className={styles.successMessage}>{message}</p>}
      <form className={styles.distanceForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="street">Street:</label>
          <input type="text" name="street" value={street} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={city} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="state">State:</label>
          <input type="text" name="state" value={state} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zip">Zip:</label>
          <input type="text" name="zip" value={zip} onChange={handleChange} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <input type="text" name="country" value={country} onChange={handleChange} required />
        </div>
        <button type="submit" className={styles.submitButton}>Save Address</button>
      </form>
    </div>
  );
};

export default Page;
