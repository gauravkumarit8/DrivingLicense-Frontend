"use client"

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../profile/Profile.module.css'; 

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AvailabilityForm = ({ currentAvailability, onSubmit, onClose }) => {
  const [updatedAvailability, setUpdatedAvailability] = useState([...currentAvailability]);

  const handleChangeDay = (index, value) => {
    const updated = [...updatedAvailability];
    updated[index] = { ...updated[index], day: value };
    setUpdatedAvailability(updated);
  };

  const handleChangeDateTime = (index, field, date) => {
    const updated = [...updatedAvailability];
    updated[index] = { ...updated[index], [field]: date };
    setUpdatedAvailability(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(updatedAvailability);
  };

  return (
    <div className={styles.availabilityForm}>
      <h2 className={styles.sectionHeader}>Update Availability</h2>
      <form onSubmit={handleSubmit}>
        <ul className={styles.availabilityList}>
          {currentAvailability.map((avail, index) => (
            <li key={index} className={styles.availabilityItem}>
              <span>
                <select
                  value={avail.day}
                  onChange={(e) => handleChangeDay(index, e.target.value)}
                >
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </span>
              <span>
                <DatePicker
                  selected={new Date(avail.startTime)}
                  onChange={(date) => handleChangeDateTime(index, 'startTime', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                  className={styles.datetimePicker}
                />
                <span>to</span>
                <DatePicker
                  selected={new Date(avail.endTime)}
                  onChange={(date) => handleChangeDateTime(index, 'endTime', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                  className={styles.datetimePicker}
                />
              </span>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => handleDeleteAvailability(index)}
              >
                &#x2715;
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.formButtons}>
          <button type="submit" className={styles.submitButton}>Save</button>
          <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AvailabilityForm;
