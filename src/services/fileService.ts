import axios from "axios";

import { getAuthHeaders } from "./authClientService";

const handleUpload = async (file: File, userId: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axios
    .post(`http://localhost:3000/api/upload/${userId}`, formData, {
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
