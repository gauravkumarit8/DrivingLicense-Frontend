export default async function loginUser(userData){
    const response=await fetch("",{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{
            'Context-Type':'application/json'
        }
    })
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}

export default async function registerUser(userData){
    const response=await fetch("",{
        method:"POST",
        body:JSON.stringify(userData),
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}

export default async function updateUser(userData){
    const response=await fetch("",{
        method:"PUT",
        body:JSON.stringify(userData),
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}

export default async function getUserByEmail(userEmail){
    const response=await fetch(`/${userEmail}`,{
        method:"GET",
        headers:{
            'Context-Type':'application/json',
        }
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}

export default async function deleteUser(userId){
    const response=await fetch(`/${userId}`,{
        method:"DELETE",
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}