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
  imageUrl?:string;
  senderId:string;
  profilePic:string;
}

export const getPosts = async () => {
  const response = await axios.get<IPostWithComments[]>(
    "http://localhost:3000/posts"
  );
  return response.data;
};

export const getPostsByUser = async () => {
  const response = await axios.get<IPostWithComments[]>(
    `http://localhost:3000/user/posts`,
    getAuthHeaders()
  );
  return response.data;
};

export const getPostById = async (_id: string) => {
  const response = await axios.get<ICreatePost>(
    `http://localhost:3000/post/${_id}`,
    getAuthHeaders()
  );
  return response.data;
};


export const createPost = async (postData: ICreatePost) => {
  try {
    const formData = new FormData();
    formData.append("content", postData.content);
    formData.append("image", postData.image as Blob);

    const response = await axios.post<ICreatePost>(
      "http://localhost:3000/api/post",
      formData,
      {
        headers: {
          ...getAuthHeaders().headers,
          "Content-Type": "multipart/form-data",
        },
      }
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
      `http://localhost:3000/post/${_id}`,
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
      `http://localhost:3000/post/${postData._id}`,
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
