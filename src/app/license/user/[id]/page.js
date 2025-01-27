"use client";

import { getUserLicenseDetails } from '@/utils/licenseApi/page';
import React, { useEffect, useState } from 'react';
import styles from './LicenseCard.module.css';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const ViewLicense = () => {
  const params = useParams();
  const id = params.id;
  const [licenseDetails, setLicenseDetails] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserLicenseDetails(id);
      if (response.success) {
        setLicenseDetails(response.data.license);
      }
    };
    fetchData();
  }, [id]);

  if (!licenseDetails) {
    return <div>Loading...</div>;
  }

  const { users = {}, licenseNumber, issueDate, expiryDate } = licenseDetails;
  const { name = 'N/A', aadhaarNumber = 'N/A', email = 'N/A' } = users;

  const redirectBack = () => {
    router.back();
  }

  return (
    <section className={styles.section}>
      <div className={styles.emailTop}>
        <button onClick={redirectBack}>Back</button>
      </div>
      <div className={styles.container}>
        <div className={`${styles.card} ${styles.frontFace}`}>
          <header className={styles.header}>
            <span className={styles.logo}>
              <h5>Driving License</h5>
            </span>
          </header>
          <div className={styles.cardDetails}>
            <div className={styles.nameNumber}>
              <h6 className={styles.title}>License Number</h6>
              <h5 className={styles.number}>{licenseNumber}</h5>
              <h5 className={styles.name}>{name}</h5>
            </div>
            <div className={styles.validDate}>
              <h6 className={styles.title}>Expiry Date</h6>
              <h5>{new Date(expiryDate).toLocaleDateString()}</h5>
            </div>
          </div>
        </div>
        <div className={`${styles.card} ${styles.backFace}`}>
          <h6 className={styles.title}>License Details</h6>
          <div className={styles.aadhaarNumber}>
            <h6 className={styles.title}>Aadhaar Number</h6>
            <h5>{aadhaarNumber}</h5>
          </div>
          <div className={styles.issueDateRight}>
            <h6 className={styles.title}>Issue Date</h6>
            <h5>{new Date(issueDate).toLocaleDateString()}</h5>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewLicense;