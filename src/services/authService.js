const BASE_URL = "http://localhost:9090/api";

// export const registerUser = async (userData) => {

//     const response = await fetch(`${BASE_URL}/auth/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(userData)
//     });

//     return response.text();
// };

export const registerUser = async (userData) => {

    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.text(); // backend returns string

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

// export const loginUser = async (userData) => {

//     const response = await fetch(`${BASE_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(userData)
//     });

//     return response.json();
// };


export const loginUser = async (userData) => {

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    return data;
};