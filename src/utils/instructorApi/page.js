export async function loginInstructor(instructorData) {
    try {
      const response = await fetch('http://localhost:8080/api/instructor/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(instructorData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to login instructor:", error);
      return { success: false, message: error.message };
    }
  }
  
  export async function registerInstructor(instructorData) {
      try {
        const response = await fetch('http://localhost:8080/api/instructor/register', { // Replace with your actual API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(instructorData),
        });
    
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
    
        const result = await response.json();
        return { success: true, data: result };
      } catch (error) {
        console.error("Failed to register instructor:", error);
        return { success: false, message: error.message };
      }
  }  
  
  export async function updateInstructor(instructorData) {
    try {
      const response = await fetch("http://localhost:8080/api/instructor/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(instructorData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Fetch Error:", error);
      throw error;
    }
  }
  
  export async function getInstructorByEmail(InstructorEmail){
      const response=await fetch(`http://localhost:8080/api/instructor/profile1/${InstructorEmail}`,{
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
  
  export async function getInstructorById(instructorId){
    const response=await fetch(`http://localhost:8080/api/instructor/profile/${instructorId}`,{
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
  
export async function deleteUser(instructorId){
    const response=await fetch(`http://localhost:8080/api/instructor/delete/${instructorId}`,{
        method:"DELETE",
    });
    if(!response.ok){
        throw new Error("No user found");
    }

    const result = await response.json();
    return { success: true, data: result };
}
  
export async function userSession(instructorId) {
  try {
    const response = await fetch(`http://localhost:8080/api/sessions/user/${instructorId}`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export async function updateAvailability(instructorId,availabilityDay){
  try{
    const response=await fetch(`http://localhost:8080/api/instructor/${instructorId}/availability`,{
      method:"PUT",
      headers: {
              "Content-Type": "application/json"
          },
      body:JSON.stringify(availabilityDay)
    })
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const result = await response.json();
    return { success: true, data: result };
  }catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}

export async function addAvailability(instructorId, availabilityDay) {
  try {
      const response = await fetch(`http://localhost:8080/api/instructor/${instructorId}/availability`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(availabilityDay)
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();
      return { success: true, data: result };
  } catch (error) {
      console.error("Failed to add availability:", error);
      return { success: false, message: error.message };
  }
}

export async function deleteAvailability(instructorId,day){
  try{
    const response=await fetch(`http://localhost:8080/api/instructor/${instructorId}/availability/${day}`,{
      method:"DELETE"
    })
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }
    const result = await response.json();
    return { success: true, data: result };
  }catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}