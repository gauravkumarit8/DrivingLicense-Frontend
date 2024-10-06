const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

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
        console.error('Failed to calculate distance', error);
        return { success: false, data: error.message };
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
        console.error('Failed to save user address', error);
        return { success: false, data: error.message };
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
        console.error('Failed to save admin address', error);
        return { success: false, data: error.message };
    }
}