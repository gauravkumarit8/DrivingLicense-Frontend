export async function calculateDistance(address){
    try {
        const response=await fetch(`${BASE_URL}/api/address/user/calculate`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        });
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to assign instructors', err);
        return { success: false, data: err.message };
    }
}

export async function saveUserAddress(userId,address){
    try {
        const response=await fetch(`${BASE_URL}/api/address/user/${userId}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        });
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to assign instructors', err);
        return { success: false, data: err.message };
    }
}

export async function saveAdminAddress(adminId,address){
    try {
        const response=await fetch(`${BASE_URL}/api/address/admin/${adminId}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address)
        });
        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to assign instructors', err);
        return { success: false, data: err.message };
    }
}