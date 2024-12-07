"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Book, Code, Users, Map, Home } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <Link href="/" className={styles.logo}>
          <Home className="w-6 h-6 mr-2" />
          <span>LearnAndEarn</span>
        </Link>
      </div>

      <div className={styles.mainNav}>
        <Link href="/resources" className={styles.navLink}>
          <Book className="w-4 h-4 mr-2" />
          Resources
        </Link>
        <Link href="/documentation" className={styles.navLink}>
          <Code className="w-4 h-4 mr-2" />
          Docs
        </Link>
        <Link href="/careers" className={styles.navLink}>
          <Users className="w-4 h-4 mr-2" />
          Careers
        </Link>
        <Link href="/live-tracking" className={styles.navLink}>
          <Map className="w-4 h-4 mr-2" />
          Live Track
        </Link>
      </div>

      <div className={styles.dropdown}>
        <button className={styles.dropbtn}>
          <Menu className="w-5 h-5 mr-2" />
          Select Role
        </button>
        <motion.div 
          className={styles.dropdownContent}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Link href="/admin">Admin</Link>
          <Link href="/instructors">Instructor</Link>
          <Link href="/user">User</Link>
        </motion.div>
      </div>
    </nav>
  );
}