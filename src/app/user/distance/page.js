"use client";

import { calculateDistance } from '@/utils/mapApi/page';
import './distance.css';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Distance = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  const [responseMessage, setResponseMessage] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await calculateDistance(address);
    if (result.success) {
      // Process the response and format it as a list of distances
      const distances = Object.entries(result.data).map(
        ([location, distance]) => `${location}: ${distance.toFixed(2)} km`
      );
      setResponseMessage(distances);
    } else {
      setResponseMessage([`Error: ${result.data}`]);
    }
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setResponseMessage([]);
  };

  const redirectBack=()=>{
    router.back();
  }

  return (
    <div className="distance-container">
    <div >
      <button onClick={redirectBack}>Back</button>
    </div>
      <h2>Calculate Distance</h2>
      <form className="distance-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="street">Street:</label>
          <input type="text" name="street" value={address.street} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input type="text" name="city" value={address.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input type="text" name="state" value={address.state} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="zip">Zip:</label>
          <input type="text" name="zip" value={address.zip} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <input type="text" name="country" value={address.country} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Calculate</button>
      </form>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <ul>
              {responseMessage.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>
            <button onClick={closePopup}>Close</button>
            <Link href="/user/register">
                <button >Register</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Distance;


