"use client";

import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import styles from './HomePage.module.css';
import Navbar from '../components/Navigation/Navbar';
// import Footer from './components/Footer/Footer';

const Map = dynamic(() => import('./Map'), { ssr: false });

export default function Home() {
  return (
    <main className={styles.container}>
      <Navbar />
      
      <section className={styles.heroSection}>
        <video autoPlay muted loop className={styles.backgroundVideo}>
          <source src="/car.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={styles.header}>Welcome to MapTracker</h1>
          <p className={styles.subHeader}>
            Discover the future of navigation and tracking with our advanced mapping system.
            Real-time tracking, intelligent routing, and comprehensive analytics all in one platform.
          </p>
        </motion.div>
      </section>

      <section className={styles.mapSection}>
        <Map />
      </section>

      {/* <Footer /> */}
    </main>
  );
}