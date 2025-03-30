import axios from "axios";
import { getAuthHeaders } from "./authClientService";

export interface ICommentResponse {
  _id: string;
  content: string;
  postId: string;
  sender: string;
  senderId: string;
  createdAt: string;
  profilePic: string;
}

const backendUrl = import.meta.env.VITE_API_URL || "https://node94.cs.colman.ac.il:4000";

export const getUserProfilePic = async (senderId: string): Promise<string> => {
  try {
    const response = await axios.get(
      `${backendUrl}/user/profilePic/${senderId}`
    );
    return `${response.data.id}/${response.data.profilePic}`;
  } catch (error) {
    console.error("Error fetching user profile picture:", error);
    throw error;
  }
};

export const getCommentsByPost = async (postId: string) => {
  const response = await axios.get<ICommentResponse[]>(
    backendUrl + "/comments/" + postId
  );

  return response.data;
};

export const createComment = async (postId: string, content: string) => {
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

export default { getCommentsByPost, createComment, getUserProfilePic };
