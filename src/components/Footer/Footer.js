import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Resources</h3>
          <Link href="https://drivinglicense-backend.onrender.com/swagger-ui/index.html#/">API Documentation</Link>
          <Link href="/tutorials">Tutorials</Link>
          <Link href="/guides">Integration Guides</Link>
          <Link href="/examples">Code Examples</Link>
        </div>

        <div className={styles.footerSection}>
          <h3>Developers</h3>
          <Link href="/sdk">SDK Downloads</Link>
          <Link href="/api-reference">API Reference</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/status">System Status</Link>
        </div>

        <div className={styles.footerSection}>
          <h3>Company</h3>
          <Link href="/about">About Us</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className={styles.footerSection}>
          <h3>Legal</h3>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/security">Security</Link>
          <Link href="/compliance">Compliance</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.socialLinks}>
          <a href="https://github.com/gauravkumarit8" target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://x.com/GauravKuma4331?t=AXLfoUBV_EZ4y6qB2rfRtA&s=09" target="_blank" rel="noopener noreferrer">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/gaurav-kumar-a22b52295" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:gaurav.kumarit8@gmail.com">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} GRV Technology. All rights reserved.
        </p>
      </div>
    </footer>
  );
}