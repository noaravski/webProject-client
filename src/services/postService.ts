import axios, { CanceledError } from "axios";
export { CanceledError };

export interface IPostResponse {
  title: string;
  content: string;
  sender: string;
}

export const getPosts = async () => {
  if (localStorage.getItem("refreshToken") === null) {
    localStorage.setItem(
      "refreshToken",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Nzk3ZDAxZjEyYTVhMWE0OTgyOWYyYmMiLCJyYW5kb20iOiIwLjMwNDE1MDIzNTU3OTI4NiIsImlhdCI6MTczODAwMjY5NiwiZXhwIjoxNzM4NjA3NDk2fQ.uTBfZCB541paxmv_BqzElZgFpCzG3K6v9VkD2Shbl-0"
    );
  }

  const response = await axios.get<IPostResponse[]>("http://localhost:3000/");
  return response.data;
};

export default { getPosts };
