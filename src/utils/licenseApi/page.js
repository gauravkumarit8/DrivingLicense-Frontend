const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;
export async function issueLicenseToUser(userId) {
    try {
      const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${BASE_URL}/api/license/issue?userId=${userId}`,  // Pass userId as a query parameter
          {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${token}`,
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
        // console.error("Failed to issue license", err);
        return { success: false, data: err.message };
    }
}


export async function getUserLicenseDetails(userId) {
    try {
      const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${BASE_URL}/api/license/user/${userId}`,
          {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
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
        return { success: false, data: err.message };
      }
}

export async function getLicenseDetails(licenseId) {
    try {
      const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${BASE_URL}/api/license/${licenseId}`,
          {
            method: "GET",
            headers: {
              'Authorization': `Bearer ${token}`,
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
        return { success: false, data: err.message };
      }
}


export async function updateLicenseDetails(licenseDetails) {
    try {
      const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${BASE_URL}/api/license/update`,
          {
            method: "PATCH",
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(licenseDetails)
          }
        );
        if (!response.ok) {
          const errorText = await response.json();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
      } catch (err) {
        return { success: false, data: err.message };
      }
}


export async function deleteLicenseDetails(licenseId) {
    try {
      const token = localStorage.getItem('authToken');
        const response = await fetch(
          `${BASE_URL}/api/license/delete/${liceseId}`,
          {
            method: "DELETE",
            headers: {
              'Authorization': `Bearer ${token}`,
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
        return { success: false, data: err.message };
      }
}

