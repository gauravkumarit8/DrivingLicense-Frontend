export async function loginUser(userData) {
    try {
      const response = await fetch('https://example.com/api/register', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to register user:", error);
      return { success: false, message: error.message };
    }
} 

export async function registerUser(userData) {
    try {
      const response = await fetch('https://example.com/api/register', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to register user:", error);
      return { success: false, message: error.message };
    }
}  

export async function updateUser(userData){
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

export async function getUserByEmail(userEmail){
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

export async function deleteUser(userId){
    const response=await fetch(`/${userId}`,{
        method:"DELETE",
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}