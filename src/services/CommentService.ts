import axios from "axios";

export interface ICommentResponse {
  _id: "string";
  content: "string";
  postId: "string";
  sender: "string";
  createdAt: "string";
}

export const getCommentsByPost = async (postId) => {
  const response = await axios.get<ICommentResponse[]>(
    "http://localhost:3000/comments/" + postId
  );

  return response.data;
};

export default { getCommentsByPost };
