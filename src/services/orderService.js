const BASE_URL =
"http://localhost:9090/api/customer";

export const getCustomerOrders =
async () => {

    const token =
    localStorage.getItem("accessToken");

    const response = await fetch(
        `${BASE_URL}/orders`,
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Failed to fetch orders"
        );
    }

    return response.json();
};

export const trackOrder =
async (orderId) => {

    const token =
    localStorage.getItem("accessToken");

    const response = await fetch(
        `${BASE_URL}/track/${orderId}`,
        {
            headers: {
                Authorization:
                `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Tracking failed"
        );
    }

    return response.json();
};