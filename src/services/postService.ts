import axios from "axios";
import type { ICommentResponse } from "./commentService";

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
}

export const getPosts = async () => {
  const response = await axios.get<IPostResponse[]>("http://localhost:3000/");
  return response.data;
};

export default { getPosts };
