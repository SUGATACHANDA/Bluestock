import axios from "axios";

const backend_app_url = import.meta.env.VITE_BACKEND_APP_URL;

export const uploadDocuments = async (ipo_id, rhpFile, drhpFile) => {
    const formData = new FormData();
    formData.append("ipo_id", ipo_id);
    if (rhpFile) formData.append("rhp_pdf", rhpFile);
    if (drhpFile) formData.append("drhp_pdf", drhpFile);

    const response = await axios.post(`${backend_app_url}/documents/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};
