import axios from "axios"

const backend_app_url = import.meta.env.VITE_BACKEND_APP_URL

export const registerUser = async (userData) => {
    const response = await axios.post(`${backend_app_url}/users/register`, userData)
    return response.data
}

export const loginUser = async (credentials) => {
    const response = await axios.post(`${backend_app_url}/users/login`, credentials);
    return response.data;
};

export const forgotPassword = async (email) => {
    const response = await axios.post(`${backend_app_url}/users/forgot-password`, { email });
    return response.data;
};

export const resetPassword = async (data) => {
    const response = await axios.post(`${backend_app_url}/users/reset-password`, data);
    return response.data;
};