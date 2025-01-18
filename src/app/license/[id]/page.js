"use client";

import { issueLicenseToUser } from '@/utils/licenseApi/page';
import { useParams } from 'next/navigation';
import React from 'react'

const issueLicense = () => {
    const params=useParams();
    const id=params.id;

    const assignLicense=async()=>{
        const issueLicenseToId=await issueLicenseToUser(id);
        
    }
  return (
    <div>page</div>
  )
}

export default issueLicense;