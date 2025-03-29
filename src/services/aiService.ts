import axios from "axios";

export const aiEnhanceRequest = async (content:string) => {
  const response = await axios.post("http://localhost:3000/ai/enhance", {
    content: content,
  });

  return response.data
};
