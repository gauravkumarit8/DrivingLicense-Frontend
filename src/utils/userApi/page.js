const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export async function loginUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      // Replace with your actual API endpoint
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
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}

export async function registerUser(userData) {
  try {
    console.log("Gaurav", userData);
    console.log("Ankit", JSON.stringify(userData));
    const response = await fetch(`${BASE_URL}/api/users/register`, {
      // Replace with your actual API endpoint
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
    console.log("data recieved", result);
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to register user:", error);
    return { success: false, message: error.message };
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await fetch(`${BASE_URL}/api/users/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
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

export async function getUserByEmail(userEmail) {
  const response = await fetch(`${BASE_URL}/api/users/profile1/${userEmail}`, {
    method: "GET",
    headers: {
      "Context-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}

export async function getUserById(userId) {
  const response = await fetch(`${BASE_URL}/api/users/profile/${userId}`, {
    method: "GET",
    headers: {
      "Context-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}

export async function deleteUser(userId) {
  const response = await fetch(`${BASE_URL}/api/user${userId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("No user found");
  }

  const result = await response.json();
  return { success: true, data: result };
}

export async function userSession(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/sessions/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    console.error("Failed to login user:", error);
    return { success: false, message: error.message };
  }
}

// post log time

export async function postLogTime(userId, time) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/users/profile/${userId}/totalTime`,
      {
        method: "POST",
        headers: {
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
    console.error("Failed to post Log time:", error);
    return { success: false, message: error.message };
  }
}

// get total time

export async function getTotalTime(userId) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/users/profile/${userId}/totalTime`,
      {
        method: "GET",
        headers: {
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
