"use client";

import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../../profile/Profile.module.css';

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const parseTimeStringToTodayDate = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(':');
  const today = new Date();
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(seconds || 0);
  return today;
};

const AvailabilityForm = ({ currentAvailability, onSubmit, onClose }) => {
  const [updatedAvailability, setUpdatedAvailability] = useState([]);

  useEffect(() => {
    const initialAvailability = currentAvailability.map(avail => ({
      ...avail,
      startTime: parseTimeStringToTodayDate(avail.startTime),
      endTime: parseTimeStringToTodayDate(avail.endTime)
    }));
    setUpdatedAvailability(initialAvailability);
  }, [currentAvailability]);

  const handleChangeDay = (index, value) => {
    setUpdatedAvailability(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], day: value };
      return updated;
    });
  };

  const handleChangeDateTime = (index, field, date) => {
    if (!date || isNaN(date.getTime())) {
      return;
    }

    setUpdatedAvailability(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: date };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert Date objects back to time strings before submission
    const formattedAvailability = updatedAvailability.map(avail => ({
      ...avail,
      startTime: avail.startTime.toTimeString().split(' ')[0],
      endTime: avail.endTime.toTimeString().split(' ')[0]
    }));
    onSubmit(formattedAvailability);
  };

  const handleDeleteAvailability = (index) => {
    setUpdatedAvailability(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.availabilityForm}>
      <h2 className={styles.sectionHeader}>Update Availability</h2>
      <form onSubmit={handleSubmit}>
        <ul className={styles.availabilityList}>
          {updatedAvailability.map((avail, index) => (
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
                  selected={avail.startTime}
                  onChange={(date) => handleChangeDateTime(index, 'startTime', date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                  className={styles.datetimePicker}
                />
                <span>to</span>
                <DatePicker
                  selected={avail.endTime}
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
