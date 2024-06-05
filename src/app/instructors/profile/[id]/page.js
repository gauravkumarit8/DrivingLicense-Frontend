
import styles from '../Profile.module.css'
import { getInstructorById } from "@/utils/instructorApi/page";

const Profile =async ({ params }) => {
  const result = await getInstructorById(params.id);
  const instructor=result.data;
  console.log(instructor)
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Instructor Profile</h1>
      <div className={styles.profileCard}>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Name:</label>
          <span className={styles.profileValue}>{instructor.name}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Email:</label>
          <span className={styles.profileValue}>{instructor.email}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Phone Number:</label>
          <span className={styles.profileValue}>{instructor.phone}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Driving License:</label>
          <span className={styles.profileValue}>{instructor.drivingLicenseNumber}</span>
        </div>
        <div className={styles.profileGroup}>
          <label className={styles.profileLabel}>Availability:</label>
          {/* <ul className={styles.availabilityList}>
            {instructor.availability.map((day, index) => (
              <li key={index} className={styles.availabilityItem}>{day}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;