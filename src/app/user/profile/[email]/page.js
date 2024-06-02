"use client"

import { useState } from "react"


const Profile = () => {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [adhar,setAdhar]=useState('');
    const [message,setMessage]=useState('');

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const userDat={
            name,
            email,
            password,
            adhar
        };
        const result=await getUserByEmail(email);
    }

  return (
    <div>Profile</div>
  )
}

export default Profile