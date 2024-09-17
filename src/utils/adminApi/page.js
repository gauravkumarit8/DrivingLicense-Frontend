const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

// Login Admin
export async function loginAdmin(userData) {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }
  
      const result = await response.json();
  
      // Store accessToken in localStorage
      if (result.accessToken) {
        localStorage.setItem('authToken', result.accessToken);
      }
  
      return { success: true, data: result };
    } catch (error) {
      console.error("Failed to login user:", error);
      return { success: false, message: error.message };
    }
  }

// Register Admin
export async function registerAdmin(adminData){
    try {
        const response = await fetch(`${BASE_URL}/api/admins/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adminData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to register Admin", err);
        return { success: false, message: err.message };
    }
}

// Get Admin by ID
export async function getAdminById(adminId){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/user/${adminId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch admin", err);
        return { success: false, data: err.message };
    }
}

// Update Admin
export async function updateAdmin(adminData){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            },
            body: JSON.stringify(adminData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to update admin", err);
        return { success: false, data: err.message };
    }
}

// Get Users under Admin
export async function getUsers(adminName){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/users/${adminName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch users", err);
        return { success: false, data: err.message };
    }
}

// Get Instructors under Admin
export async function getInstructors(adminName){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/instructors/${adminName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/text',
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch instructors", err);
        return { success: false, data: err.message };
    }
}

// Assign Instructor to User
export async function assignInstructorToUser(adminName, userId, assignments) {
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/${adminName}/${userId}/assign-instructors-to-days`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            },
            body: JSON.stringify(assignments)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error('Failed to assign instructors', err);
        return { success: false, data: err.message };
    }
}

// Reassign Instructor
export async function reAssignInstructorUpdate(adminName, userId, instructorId, day) {
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/${adminName}/${userId}/update-instructor?day=${day}&newInstructorId=${instructorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

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

// Delete User
export async function deleteUser(adminName, userId){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/delete/${adminName}/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to delete user", err);
        return { success: false, data: err.message };
    }
}

// Delete Instructor
export async function deleteInstructor(adminName, instructorId){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/delete/${adminName}/instructor/${instructorId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to delete instructor", err);
        return { success: false, data: err.message };
    }
}

// Get Available Instructors
export async function getAvailableInstructors(adminName, day){
    const token = localStorage.getItem('authToken'); // Retrieve token
    try {
        const response = await fetch(`${BASE_URL}/api/admins/${adminName}/instructors/available?day=${day}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Authorization for Admin
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (err) {
        console.error("Failed to fetch available instructors:", err);
        return { success: false, data: err.message };
    }
}

export async function getUsersWithAvailability(adminName){
    try{
        const token = localStorage.getItem('authToken'); 
        const response=await fetch(`${BASE_URL}/api/admins/${adminName}/usersWithAvailability`,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`,
            }
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

export async function getInstructorsByUserAvailability(adminName,userId) {
    try {
        const token = localStorage.getItem('authToken'); 
      const response = await fetch(`${BASE_URL}/api/admins/${adminName}/instructors`,{
        method:"Post",
        headers: {
            'Authorization': `Bearer ${token}`,
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


export async function logoutAdmin() {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token
        const response = await fetch(`${BASE_URL}/api/auth/logout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Pass JWT token in the Authorization header
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
        console.error("Logout failed:", error);
        return { success: false, message: error.message };
    }
  }