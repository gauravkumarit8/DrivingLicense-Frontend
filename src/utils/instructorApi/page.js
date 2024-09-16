const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export async function loginInstructor(instructorData) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
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

export async function registerInstructor(adminName,instructorData) {
  try {
    const response = await fetch(`${BASE_URL}/api/instructor/register/${adminName}`, {
      // Replace with your actual API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to register instructor:", error);
    return { success: false, message: error.message };
  }
}

export async function updateInstructor(adminName,id, instructorData) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(`${BASE_URL}/api/instructor/update/${adminName}/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server Response:", errorText);
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}


//not in use
export async function getInstructorByEmail(InstructorEmail) {
  const token = localStorage.getItem('authToken'); 
  const response = await fetch(
    `${BASE_URL}/api/instructor/profile1/${InstructorEmail}`,
    {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Context-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}

export async function getInstructorById(instructorId) {
  const token = localStorage.getItem('authToken'); 
  const response = await fetch(
    `${BASE_URL}/api/instructor/profile/${instructorId}`,
    {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
        "Context-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}


//not in use
export async function deleteInstructor(instructorId) {
  const token = localStorage.getItem('authToken'); 
  const response = await fetch(
    `${BASE_URL}/api/instructor/delete/${instructorId}`,
    {
      method: "DELETE",
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    }
  );
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}


//not in use
export async function userSession(instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/sessions/user/${instructorId}`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}
export async function getInstructorSession(adminName,instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/users/session`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to Instructor Sessions:", error);
    return { success: false, message: error.message };
  }
}
export async function getUserSession(adminName,instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/userSessions`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed user Sessions:", error);
    return { success: false, message: error.message };
  }
}

export async function updateAvailability(adminName,instructorId, availabilityDay) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/availability`,
      {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(availabilityDay),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}

export async function addAvailability(adminName,instructorId, availabilityDay) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/availability`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(availabilityDay),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to add availability:", error);
    return { success: false, message: error.message };
  }
}

export async function deleteAvailability(adminName,instructorId, day) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/availability/${day}`,
      {
        method: "DELETE",
        headers:{
          'Authorization': `Bearer ${token}`,
        }
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}

// post log time

export async function postInstructorLogTime(
  adminName,
  instructorId,
  userId,
  sessionDate,
  time
) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/logTrainingTime?userId=${userId}&sessionDate=${sessionDate}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(time),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }
    const result = await response.text();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to post Instructor Log time:", error);
    return { success: false, message: error.message };
  }
}

// get total time

export async function getInstructorTotalTime(adminName,instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/logTrainingTime`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to get total Log Time:", error);
    return { success: false, message: error.message };
  }
}

export async function getSessionTime(adminName,instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${adminName}/${instructorId}/allSessionTime`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to get Session Time:", error);
    return { success: false, message: error.message };
  }
}

export async function getAssignedUserDetails(instructorId) {
  try {
    const token = localStorage.getItem('authToken'); 
    const response = await fetch(
      `${BASE_URL}/api/instructor/${instructorId}/details`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to get Session Time:", error);
    return { success: false, message: error.message };
  }
}

export async function logoutInstructor() {
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