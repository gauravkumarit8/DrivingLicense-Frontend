"use client";

import { issueLicenseToUser } from '@/utils/licenseApi/page';
import React from 'react'

const issueLicense = ({params}) => {
    const { id } = params;

    const assignLicense=async()=>{
        const issueLicenseToId=await issueLicenseToUser(id);
        
    }
  return (
    <div>page</div>
  )
}

export default issueLicense;