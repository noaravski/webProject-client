import axios from "axios";
import type { ICommentResponse } from "./commentService";
import { getAuthTokenByName } from "../utils/localStorage";
import { refreshTokenName } from "../utils/localStorage";
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
  likes: number;
}

export const getPosts = async () => {
  const response = await axios.get<IPostResponse[]>("http://localhost:3000/");
  return response.data;
};

export const addLike = async (postId: string) => {
  const refreshToken = getAuthTokenByName(refreshTokenName);
  await axios.put(
    `http://localhost:3000/post/like/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

export const removeLike = async (postId: string) => {
  const refreshToken = getAuthTokenByName(refreshTokenName);

  await axios.put(
    `http://localhost:3000/post/unlike/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

export const isLiked = async (postId: string) => {
  const refreshToken = getAuthTokenByName(refreshTokenName);

  const response = await axios.get(
    `http://localhost:3000/post/isliked/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );

  return response.data.isLiked;
};

export default { getPosts };
