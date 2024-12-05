"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from './HomePage.module.css';
import Link from 'next/link';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.container}>
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <nav className={styles.navbar}>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Select Role</button>
            <div className={styles.dropdownContent}>
              <Link href="/admin">Admin</Link>
              <Link href="/instructors">Instructor</Link>
              <Link href="/user">User</Link>
            </div>
          </div>
        </nav>

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.header}>Welcome to Our Platform</h1>
          <p className={styles.subHeader}>
            Discover the future of navigation and tracking with our advanced mapping system
          </p>
        </motion.div>
      </section>

      <section className={styles.mapSection}>
        <Map />
      </section>
    </main>
  );
}