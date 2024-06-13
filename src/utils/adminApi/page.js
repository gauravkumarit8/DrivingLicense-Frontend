export async function loginAdmin(adminData){
    try {
        const response = await fetch('http://localhost:8080/api/admins/login', { // Replace with your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(adminData),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    
        const result = await response.json();
        return { success: true, data: result };
      } catch (error) {
        console.error("Failed to login user:", error);
        return { success: false, message: error.message };
    }
}

export async function registerAdmin(adminData){
    try{
        const response=await fetch("http://localhost:8080/api/admins/register",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(adminData)
        })
        if(!response.ok){
            const errorText=await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result=await response.json();
        return {success:true,data:result};
    }catch(err){
        console.error("Failed to register Admin",err);
        return {success:false,message:err.message};
    }
}

export async function getAdminById(adminId){
    try{
        const response=await fetch(`http://localhost:8080/api/admins/${adminId}`,{
            method:'GET'
        })
        if(!response.ok){
            const errorText=await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result=await response.json();
        return {success:true,data:result};
    }catch(err){
        console.error("Failed to fetch user",err);
        return {success:false,data:err.message};
    }
}

export async function updateAdmin(adminData){
    try{
        const response=await fetch("http://localhost:8080/api/admins/update",{
            method:"PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(adminData)
        })
        if(!response.ok){
            const errorText=await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result=await response.json();
        return {success:true,data:result};
    }catch(err){
        console.error("Failed to fetch user",err);
        return {success:false,data:err.message};
    }
}

