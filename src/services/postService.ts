import axios from "axios";
import type { ICommentResponse } from "./commentService";
import { getAuthHeaders } from "./authClientService";
import { ICreatePost } from "../interfaces/post";

export interface IPostWithComments {
  _id: string;
  content: string;
  sender: string;
  comments: ICommentResponse[];
  likes: string[];
  createdAt: Date;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const getPosts = async () => {
  const response = await axios.get<IPostWithComments[]>(backendUrl + "/posts");
  console.log(response.data);
  return response.data;
};

export const getPostsByUser = async () => {
  const response = await axios.get<IPostWithComments[]>(
    backendUrl + `/user/posts`,
    getAuthHeaders()
  );
  return response.data;
};

export const getPostById = async (_id: string) => {
  const response = await axios.get<ICreatePost>(
    backendUrl + `/post/${_id}`,
    getAuthHeaders()
  );
  return response.data;
};

export const createPost = async (postData: ICreatePost) => {
  try {
    const response = await axios.post<ICreatePost>(
      backendUrl + "/post",
      postData,
      getAuthHeaders()
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to create post");
  }
};

export const deletePost = async (_id: string) => {
  try {
    const response = await axios.delete<ICreatePost>(
      backendUrl + `/post/${_id}`,
      getAuthHeaders()
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to delete post");
  }
};

export const updatePost = async (postData: ICreatePost) => {
  try {
    const response = await axios.put<ICreatePost>(
      backendUrl + `/post/${postData._id}`,
      postData,
      getAuthHeaders()
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to update post");
  }
};

export const addLike = async (postId: string) => {
  await axios.put(backendUrl + `/post/like/${postId}`, {}, getAuthHeaders());
};

export const removeLike = async (postId: string) => {
  await axios.put(backendUrl + `/post/unlike/${postId}`, {}, getAuthHeaders());
};

export const isLiked = async (postId: string) => {
  const response = await axios.get(
    backendUrl + `/post/isliked/${postId}`,
    getAuthHeaders()
  );

  return response.data.isLiked;
};

export default { getPosts };
