import axios from "axios";

export interface IPostResponse {
  title: string;
  content: string;
  sender: string;
}

export const getPosts = async () => {
  if (localStorage.getItem("refreshToken") === null) {
    return null;
  } else {
    const response = await axios.get<IPostResponse[]>("http://localhost:3000/");
    return response.data;
  }
};

export default { getPosts };
