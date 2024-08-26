const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export async function loginAdmin(adminData){
    try {
        const response = await fetch(`${BASE_URL}/api/admins/login`, { // Replace with your actual API endpoint
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
        const response=await fetch(`${BASE_URL}/api/admins/register`,{
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
        const response=await fetch(`${BASE_URL}/api/admins/${adminId}`,{
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
        const response=await fetch(`${BASE_URL}/api/admins/update`,{
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

export async function getUsers(adminName){
    try{
        const response=await fetch(`${BASE_URL}/api/admins/users/${adminName}`,{
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

export async function getInstructors(adminName){
    try{
        const response=await fetch(`${BASE_URL}/api/admins/instructors/${adminName}`,{
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
//         const response=await fetch(`${BASE_URL}/api/admins/${userId}/assign-instructor/${instructorId}`,{
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

// export async function assignInstructorToUser(userId, assignments) {
//     try {
//       const response = await fetch(`${BASE_URL}/api/admins/${userId}/assign-instructors-to-days`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(assignments) // Passing the list of assignments
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text(); // Extracting error message for detailed error reporting
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }
  
//       const result = await response.json();
//       return { success: true, data: result };
//     } catch (err) {
//       console.error('Failed to assign instructors', err);
//       return { success: false, data: err.message };
//     }
//   }
  
export async function assignInstructorToUser(adminName,userId, assignments) {
    try {
      const response = await fetch(`${BASE_URL}/api/admins/${adminName}/${userId}/assign-instructors-to-days`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignments) // Passing the list of assignments
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Extracting error message for detailed error reporting
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      console.error('Failed to assign instructors', err);
      return { success: false, data: err.message };
    }
  }
  

// export async function assignInstructorToUser(adminName,userId, instructorIds) {
//     try {
//       const response = await fetch(`${BASE_URL}/api/admins/${adminName}/${userId}/assign-instructors`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(instructorIds) // Corrected body to be a JSON array
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text(); // Changed to text to handle non-JSON responses
//         throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
//       }
  
//       const result = await response.json();
//       return { success: true, data: result };
//     } catch (err) {
//       console.error('Failed to assign instructors', err);
//       return { success: false, data: err.message };
//     }
//   }
  
  

export async function reAssignInstructorUpdate(adminName,userId, instructorId, day) {
    try {
      const response = await fetch(
        `${BASE_URL}/api/admins/${adminName}/${userId}/update-instructor?day=${day}&newInstructorId=${instructorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      console.error("Failed to reassign instructor", err);
      return { success: false, data: err.message };
    }
}

export async function deleteUser(admin,userId){
    try{
        const response= await fetch(`${BASE_URL}/api/admins/delete/${admin}/${userId}`,{
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
 
export async function deleteInstructor(admin,instructorId){
    try{
        const response= await fetch(`${BASE_URL}/api/admins/delete/${admin}/instructor/${instructorId}`,{
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

export async function getInstructorsByUserAvailability(adminName,userId) {
    try {
      const response = await fetch(`${BASE_URL}/api/admins/${adminName}/instructors`,{
        method:"Post",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userId),
      });
      if (!response.ok) {
        const errorText = await response.text(); // Get error text for better logging
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      const result = await response.json();
      return { success: true, data: result };
    } catch (err) {
      console.error("Failed to fetch instructors by user availability:", err);
      return { success: false, data: err.message };
    }
  }

export async function getUsersWithAvailability(adminName){
    try{
        const response=await fetch(`${BASE_URL}/api/admins/${adminName}/usersWithAvailability`,{
            method:"GET"
        });
        if (!response.ok) {
            const errorText = await response.text(); // Get error text for better logging
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch instructors by user availability:", err);
        return { success: false, data: err.message };
    }
}
  
export async function getAvailableInstructors(adminName,day){
    try{
        const response=await fetch(`${BASE_URL}/api/admins/${adminName}/instructors/available?day=${day}`,{
            method:"GET",
            
        });
        if (!response.ok) {
            const errorText = await response.text(); // Get error text for better logging
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch instructors by user availability:", err);
        return { success: false, data: err.message };
    }
}

export async function getAllAdmin(){
    try{
        const response=await fetch(`${BASE_URL}/api/admins/allAdmin`,{
            method:"GET",
            
        });
        if (!response.ok) {
            const errorText = await response.text(); // Get error text for better logging
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        return { success: false, data: err.message };
    }
}