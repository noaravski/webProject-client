import axios from "axios";
import type { ICommentResponse } from "./commentService";
import { getAuthHeaders } from "./authClientService";
export interface IPostResponse {
  _id: string;
  title: string;
  content: string;
  sender: string;
}

export interface IPostWithComments {
  _id: string;
  title: string;
  content: string;
  sender: string;
  comments: ICommentResponse[];
  likes: string[];
  createdAt: Date;
}

export const getPosts = async () => {
  const response = await axios.get<IPostResponse[]>("http://localhost:3000/");
  return response.data;
};

export const getPostsByUser = async () => {
  const response = await axios.get<IPostResponse[]>(
    `http://localhost:3000/user/posts`,
    getAuthHeaders()
  );
  return response.data;
};

export const addLike = async (postId: string) => {
  await axios.put(
    `http://localhost:3000/post/like/${postId}`,
    {},
    getAuthHeaders()
  );
};

export const removeLike = async (postId: string) => {
  await axios.put(
    `http://localhost:3000/post/unlike/${postId}`,
    {},
    getAuthHeaders()
  );
};

export const isLiked = async (postId: string) => {
  const response = await axios.get(
    `http://localhost:3000/post/isliked/${postId}`,
    getAuthHeaders()
  );

  return response.data.isLiked;
};

export default { getPosts };
