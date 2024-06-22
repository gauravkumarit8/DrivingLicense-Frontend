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

export async function getUsers(){
    try{
        const response=await fetch("http://localhost:8080/api/admins/users",{
            method:"GET",
            headers:{
                'Content-Type':'application/text'
            }
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

export async function getInstructors(){
    try{
        const response=await fetch("http://localhost:8080/api/admins/instructors",{
            method:"GET",
            headers:{
                'Content-Type':'application/text'
            }
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

// export async function assignInstructorToUser(userId,instructorId){
//     try{
//         const response=await fetch(`http://localhost:8080/api/admins/${userId}/assign-instructor/${instructorId}`,{
//             method:"PUT",
//             headers:{
//                 'Content-Type':'application/text'
//             }
//         })
//         if(!response.ok){
//             const errorText=await response.json();
//             throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
//         }
//         const result=await response.json();
//         return {success:true,data:result};
//     }catch(err){
//         console.error("Failed to fetch user",err);
//         return {success:false,data:err.message};
//     }
// }

export async function assignInstructorToUser(userId, instructorIds) {
    try {
      const response = await fetch(`http://localhost:8080/api/admins/${userId}/assign-instructors`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(instructorIds) // Corrected body to be a JSON array
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Changed to text to handle non-JSON responses
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      console.error('Failed to assign instructors', err);
      return { success: false, data: err.message };
    }
  }
  
  

export async function reAssignInstructor(userId,instructorId){
    try{
        const response = await fetch(`http://localhost:8080/api/admins/${userId}/update-instructor/${instructorId}`,{
            method:"PUT",
            headers:{
                'Content-Type':'application/text'
            }
        })
        if(!response.ok){
            const errorText=await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
        }
        const result=await response.json();
        return {success:true};
    }catch(err){
        console.error("Failed to fetch user",err);
        return {success:false,data:err.message};
    }
}

export async function deleteUser(userId){
    try{
        const response= await fetch(`http://localhost:8080/api/admins/delete/${userId}`,{
            method:"DELETE"
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

export async function deleteInstructor(instructorId){
    try{
        const response= await fetch(`http://localhost:8080/api/admins/delete/instructor/${instructorId}`,{
            method:"DELETE"
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

export async function getInstructorsByUserAvailability(userId) {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/instructors`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      console.error('Failed to fetch instructors by user availability:', err);
      return { success: false, data: err.message };
    }
  }
  