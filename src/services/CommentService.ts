import axios from "axios";
import { getAuthHeaders } from "./authClientService";
export interface ICommentResponse {
  _id: "string";
  content: "string";
  postId: "string";
  sender: "string";
  createdAt: "string";
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getCommentsByPost = async (postId: string) => {
  const response = await axios.get<ICommentResponse[]>(
    backendUrl + "/comments/" + postId
  );

  return response.data;
};

export const createComment = async (
  postId: string,
  content: string,
) => {
  try {
    const response = await axios.post(
      backendUrl + `/add-comment`,
      {
        postId: postId,
        content: content,
      },
      getAuthHeaders()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export default { getCommentsByPost, createComment };
