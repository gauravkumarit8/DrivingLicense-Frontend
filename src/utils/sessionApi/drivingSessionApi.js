const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

export async function scheduleSession(userId, { availability, scheduleDate }) {
  const token = localStorage.getItem('authToken'); // Retrieve token

  try {
    const response = await fetch(
      `${BASE_URL}/api/sessions/schedule/${userId}`,
      {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in Authorization header
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availability, scheduleDate }),
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
    console.error("Failed to schedule session:", error);
    return { success: false, message: error.message };
  }
}

export async function getSessionByUser(userId) {
  const token = localStorage.getItem('authToken'); // Retrieve token

  try {
    const response = await fetch(`${BASE_URL}/api/sessions/user/${userId}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`, // Add token in Authorization header
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
    console.error("Failed to get session by user:", error);
    return { success: false, message: error.message };
  }
}

export async function getSessionByInstructor(instructorId) {
  const token = localStorage.getItem('authToken'); // Retrieve token

  try {
    const response = await fetch(
      `${BASE_URL}/api/sessions/instructor/${instructorId}`,
      {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in Authorization header
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
    console.error("Failed to get session by instructor:", error);
    return { success: false, message: error.message };
  }
}

export async function deleteSession(sessionId) {
  const token = localStorage.getItem('authToken'); // Retrieve token

  try {
    const response = await fetch(
      `${BASE_URL}/api/sessions/delete/${sessionId}`,
      {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`, // Add token in Authorization header
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
    console.log("Session deleted successfully");
  } catch (error) {
    console.error("Failed to delete session:", error);
    return { success: false, message: error.message };
  }
}
