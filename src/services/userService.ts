import axios, { CanceledError } from "axios";
import {
  updateTokens,
  getAuthTokenByName,
  refreshTokenName,
  removeAuthTokens,
} from "../utils/localStorage";

export { CanceledError };

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  email: string;
  username: string;
  password: string;
  _id?: string;
}

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  await axios.post<IRegisterResponse>("http://localhost:3000/user/", {
    email,
    username,
    password,
  });

  await login(username, password);
};

export const login = async (email: string, password: string) => {
  const data = (
    await axios.post<ILoginResponse>("http://localhost:3000/user/login", {
      email,
      password,
    })
  ).data;

  updateTokens(data);
};

export const logout = async () => {
  const refreshToken = getAuthTokenByName(refreshTokenName);
  await axios.post<IRegisterResponse>(
    "http://localhost:3000/user/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
  removeAuthTokens();
};

export const googleLogin = async (credential?: string) => {
  const tokens = (
    await axios.post<ILoginResponse>(
      "http://localhost:3000/user/login/google",
      {
        credential,
      }
    )
  ).data;

  updateTokens(tokens);
  console.log("after server valid", tokens);
};

export default { register, login, logout, googleLogin };
