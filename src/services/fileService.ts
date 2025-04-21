import axios from "axios";

import { getAuthHeaders } from "./authClientService";

const backendUrl = import.meta.env.VITE_API_URL || "https://node94.cs.colman.ac.il:4000";
const handleUpload = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios
    .post(`${backendUrl}/api/upload/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders().headers,
      },
    })
    .catch((error) => {
      console.error("Error uploading file", error);
      throw new Error(error.response.data.message);
    });

  return response;
};

export default handleUpload;
