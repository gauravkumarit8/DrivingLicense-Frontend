"use client";

import { getAdminById, getCompletedTrainingUser, getUserById } from '@/utils/adminApi/page'; 
import React, { useEffect, useState } from 'react';
import './LicenseIssuePage.css';
import Link from "next/link";
import { issueLicenseToUser } from '@/utils/licenseApi/page';
import { useParams } from 'next/navigation';

const LicenseIssuePage = () => {
    const params = useParams();
    const id = params.id;
    const [users, setUsers] = useState([]); // Array to store user details
    const [admin, setAdmin] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // New loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
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
                        totalHours: completedTrainingData.data[userId],
                    });
                }

                setUsers(userDetailsArray);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false); // Set loading to false regardless of success or failure
            }
        };

        fetchData();
    }, [id]);

    const handleGenerateLicense = async (userId) => {
        try {
            const generateLicense = await issueLicenseToUser(userId);
            console.log(generateLicense.data);
            console.log(`Generating license for user: ${userId}`);
        } catch (error) {
            console.error("Error generating license:", error);
        }
    };

    // Loading component
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading...</p>
            </div>
        );
    }

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