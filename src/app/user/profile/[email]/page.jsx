import { getUserByEmail } from "@/utils/userApi/page";
import Link from "next/link";
import styles from '../Profile.module.css';

const Profile = async ({ params }) => {
  const result = await getUserByEmail(params.email);
  const userData = result.data;

  return (
    <div className={styles.container}>
      <div className={styles.topRight}>
        <div className={styles.userEmail}>{userData.email}</div>
      </div>
      <h1 className={styles.header}>User Details</h1>
      <div className={styles.details}>
        <h2>Name: <span>{userData.name}</span></h2>
        <h2>Email: <span>{userData.email}</span></h2>
        <h2>Aadhaar Number: <span>{userData.adhar}</span></h2>
        <h2>Role: <span>{userData.role}</span></h2>
        <h2>Status: <span>{userData.status}</span></h2>
        <h2>Instructor: <span>{userData.instructor}</span></h2>
      </div>
      <h4 className={styles.sessionsLink}>
        Get user sessions: <Link href={`/user/session/${userData.id}`}>My Sessions</Link>
      </h4>
    </div>
  );
};

export default Profile;
