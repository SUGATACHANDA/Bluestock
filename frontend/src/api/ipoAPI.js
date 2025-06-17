import axios from "axios";

const backend_app_url = import.meta.env.VITE_BACKEND_APP_URL;

export const createIPO = async (data, rhpFile, drhpFile) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    if (rhpFile) formData.append("rhp_pdf", rhpFile);
    if (drhpFile) formData.append("drhp_pdf", drhpFile);

    const response = await axios.post(`${backend_app_url}/ipos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getAllIPOs = async () => {
    const response = await axios.get(`${backend_app_url}/ipos`);
    return response.data;
};

export const getIPOById = async (id) => {
    const response = await axios.get(`${backend_app_url}/ipos/${id}`);
    return response.data;
};

export const updateIPO = async (id, data) => {
    const response = await axios.put(`${backend_app_url}/ipos/${id}`, data);
    return response.data;
};

export const deleteIPO = async (id) => {
    const response = await axios.delete(`${backend_app_url}/ipos/${id}`);
    return response.data;
};
