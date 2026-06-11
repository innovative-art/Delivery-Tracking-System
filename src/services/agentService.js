const AGENT_URL =
"http://localhost:9090/agent";

export const updateOrderStatus =
async (orderId, status) => {

    const token =
    localStorage.getItem("accessToken");

    const response = await fetch(
        `${AGENT_URL}/update-status`,
        {
            method:"POST",

            headers:{
                "Content-Type":
                "application/json",

                Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
                orderId,
                status
            })
        }
    );

    if(!response.ok){
        throw new Error(
            "Status update failed"
        );
    }

    return response.text();
};