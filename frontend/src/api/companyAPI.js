import axios from "axios";

const backend_app_url = import.meta.env.VITE_BACKEND_APP_URL

export const createCompany = async (formData) => {
    const response = await axios.post(`${backend_app_url}/companies`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const getAllCompanies = async () => {
    const response = await axios.get(`${backend_app_url}/companies`);
    return response.data;
};

export const getCompanyById = async (id) => {
    const response = await axios.get(`${backend_app_url}/companies/${id}`);
    return response.data;
};

export const updateCompany = async (id, data) => {
    const response = await axios.put(`${backend_app_url}/companies/${id}`, data);
    return response.data;
};

export const deleteCompany = async (id) => {
    const response = await axios.delete(`${backend_app_url}/companies/${id}`);
    return response.data;
};