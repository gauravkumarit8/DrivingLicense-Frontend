
import styles from './HomePage.module.css'
import Link from 'next/link';
export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className={styles.navbar}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Select Role</button>
            <div className={styles.dropdownContent}>
              <Link href="/admin">Admin</Link>
              <Link href="/instructors">Instructor</Link>
              <Link href="/user">User</Link>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h1 className={styles.header}>Welcome to Our Platform</h1>
        </div>
      </div>
    </main>
  );
}
