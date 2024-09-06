"use client";

import { getUserLicenseDetails } from '@/utils/licenseApi/page';
import React, { useEffect, useState } from 'react';
import './LicenseCard.css';  // Make sure to import your CSS file
import Link from 'next/link';

const ViewLicense = ({ params }) => {
  const { id } = params;
  const [licenseDetails, setLicenseDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserLicenseDetails(id);
      if (response.success) {
        setLicenseDetails(response.data.license);  // Ensure you're accessing the 'license' object in the response
      }
    };
    fetchData();
  }, [id]);

  if (!licenseDetails) {
    return <div>Loading...</div>;
  }

  // Destructure safely with default values to avoid errors
  const { users = {}, licenseNumber, issueDate, expiryDate } = licenseDetails;
  const { name = 'N/A', aadhaarNumber = 'N/A' ,email='N/A'} = users;  // Provide fallbacks

  return (
    <section>
    <div class="emailTop">
      <Link href={`/user/profile/${email}`}>Back</Link>
    </div>
      <div class="container">
        <div class="card front-face">
          <header>
            <span class="logo">
              <h5>Driving License</h5>
            </span>
          </header>
          <div class="card-details">
            <div class="name-number">
              <h6>License Number</h6>
              <h5 class="number">{licenseNumber}</h5>
              <h5 class="name">{name}</h5>
            </div>
            <div class="valid-date">
              <h6>Expiry Date</h6>
              <h5>{new Date(expiryDate).toLocaleDateString()}</h5>
            </div>
          </div>
        </div>
        <div class="card back-face">
      <h6>License Details</h6>
      <div class="aadhaar-number">
        <h6>Aadhaar Number</h6>
        <h5>{aadhaarNumber}</h5>
      </div>
      <div class="issue-date-right">
        <h6>Issue Date</h6>
        <h5>{new Date(issueDate).toLocaleDateString()}</h5>
      </div>
      {/* <span class="magnetic-strip"></span> */}
    </div>
      </div>
    </section>
  );
};

export default ViewLicense;
