import axios from "axios";

const backendUrl = import.meta.env.VITE_API_URL || "https://node94.cs.colman.ac.il:4000";

export const aiEnhanceRequest = async (content:string) => {
  const response = await axios.post(`${backendUrl}/ai/enhance`, {
    content: content,
  });

  return response.data
};
