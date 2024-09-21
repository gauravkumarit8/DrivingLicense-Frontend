"use client";

import { getAdminById, getCompletedTrainingUser, getUserById } from '@/utils/adminApi/page'; 
import React, { useEffect, useState } from 'react';
import './LicenseIssuePage.css'; // Assuming you'll create this CSS file for styling
import Link from "next/link";
import { issueLicenseToUser } from '@/utils/licenseApi/page';

const LicenseIssuePage = ({ params }) => {
    const { id } = params;
    const [users, setUsers] = useState([]); // Array to store user details
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the admin data by ID
            const getAdmin = await getAdminById(id);
            setAdmin(getAdmin.data);

            // Fetch the completed training users for the admin
            const completedTrainingData = await getCompletedTrainingUser(getAdmin.data.name);

            // Array to store all the user details after fetching by ID
            const userDetailsArray = [];

            // Loop over each user ID and fetch their details
            for (const userId of Object.keys(completedTrainingData.data)) {
                const userResponse = await getUserById(getAdmin.data.name, userId);
                userDetailsArray.push({
                    ...userResponse.data,
                    totalHours: completedTrainingData.data[userId], // Attach the training hours to the user data
                });
            }

            setUsers(userDetailsArray); // Set the fetched users
        };

        fetchData();
    }, [id]);

    const handleGenerateLicense =async (userId) => {
        const generateLicense= await issueLicenseToUser(userId);

        console.log(generateLicense.data);
        console.log(`Generating license for user: ${userId} `);
    };

    return (
        <>
            <div className="admin-info">
                <h1>Admin: {admin?.name}</h1>
            </div>
            <div>
                <Link href={`/admin/profile/${id}`} className="text-black">Back</Link>
            </div>
            <div className="users-list">
                <h2>Completed Training Users:</h2>
                <div className="user-cards-container">
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div key={index} className="user-card">
                                <h3>{user.name}</h3>
                                <p>Email: {user.email}</p>
                                <p>Aadhaar Number: {user.aadhaarNumber}</p>
                                <p>Total Hours: {user.totalHours}</p>

                                {/* Conditional Rendering based on isLogged */}
                                {user.isLicenseProvided ? (
                                    <Link href={`../../license/user/${user.id}`} className="generate-license-button">
                                        View License
                                    </Link>
                                ) : (
                                    <button 
                                        className="generate-license-button" 
                                        onClick={() => handleGenerateLicense(user.id)}
                                    >
                                        Generate Driving License
                                    </button>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No users found</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default LicenseIssuePage;
