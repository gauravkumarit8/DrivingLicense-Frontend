"use client";

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../Session.module.css';
import { scheduleSession } from '@/utils/sessionApi/drivingSessionApi';
import { useRouter } from 'next/navigation';

const Session = ({ params }) => {
  const { id } = params;
  const [session, setSession] = useState(null);
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayTimes, setDayTimes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [upcomingDate, setUpcomingDate] = useState(null);

  const router = useRouter();

  const handleAvailabilityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDays(prev => 
      checked ? [...prev, value] : prev.filter(day => day !== value)
    );
    if (!checked) {
      setDayTimes(prev => {
        const updated = { ...prev };
        delete updated[value];
        return updated;
      });
    }
  };

  const handleDateChange = (date, day) => {
    setDayTimes(prev => ({
      ...prev,
      [day]: date,
    }));
  };

  const isDaySelectable = (date, day) => {
    const dayMap = {
      "Sunday": 0,
      "Monday": 1,
      "Tuesday": 2,
      "Wednesday": 3,
      "Thursday": 4,
      "Friday": 5,
      "Saturday": 6
    };
    return date.getDay() === dayMap[day] && date >= new Date();
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // format as YYYY-MM-DD
  };

  const formatTime = (date) => {
    return date.toTimeString().split(' ')[0]; // format as HH:mm:ss
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const availability = selectedDays.map(day => ({
        day,
        sessionDate: formatDate(dayTimes[day]),
        startTime: formatTime(dayTimes[day])
      }));
      const result = await scheduleSession(id, { availability });
      setSession(result);

      const nextDate = Object.values(dayTimes)
        .filter(date => new Date(date) > new Date())
        .sort((a, b) => new Date(a) - new Date(b))[0];
      setUpcomingDate(nextDate);
      router.back();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Schedule Session</h1>
      <div className={styles.availability}>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
          <label key={day}>
            <input type="checkbox" value={day} onChange={handleAvailabilityChange} /> {day}
          </label>
        ))}
      </div>
      <div className={styles.datePickers}>
        {selectedDays.map(day => (
          <div key={day} className={styles.datePicker}>
            <label>{day}</label>
            <DatePicker
              selected={dayTimes[day] || null}
              onChange={(date) => handleDateChange(date, day)}
              showTimeSelect
              dateFormat="Pp"
              filterDate={(date) => isDaySelectable(date, day)}
              placeholderText={`Select a ${day}`}
            />
          </div>
        ))}
      </div>
      <button className={styles.button} onClick={handleSubmit}>Schedule</button>
      {session && (
        <div className={styles.sessionDetails}>
          <p>Matching Days: {selectedDays.join(", ")}</p>
          {Object.entries(dayTimes).map(([day, date]) => (
            <div key={day}>
              <p>{day} Date: {new Date(date).toLocaleString()}</p>
            </div>
          ))}
          {upcomingDate && (
            <div className={styles.upcomingDate}>
              <p>Next Scheduled Date: {new Date(upcomingDate).toLocaleString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Session;
