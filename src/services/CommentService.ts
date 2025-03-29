import axios from "axios";
import { getAuthHeaders } from "./authClientService";
export interface ICommentResponse {
  _id: string;
  content: string;
  postId: string;
  sender: string;
  senderId: string;
  createdAt: string;
  profilePic:string;
}

interface IUserDetails {
  _id: string;
  name: string;
  email: string;
}

interface IComment {
  sender: string;
  // Add other comment fields as needed
}

export const getUserProfilePic = async (senderId: string): Promise<string> => {
  try {
    const response = await axios.get(
      `http://localhost:3000/user/profilePic/${senderId}`
    );
    return `${response.data.id}/${response.data.profilePic}`;
  } catch (error) {
    console.error("Error fetching user profile picture:", error);
    throw error;
  }
};

export const getCommentsByPost = async (postId) => {
  const response = await axios.get<ICommentResponse[]>(
    "http://localhost:3000/comments/" + postId
  );

  return response.data;
};

export const createComment = async (postId: string, content: string) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/add-comment`,
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
