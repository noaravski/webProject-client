import axios, { CanceledError } from "axios";
import {
  updateTokens,
  getAuthTokenByName,
  refreshTokenName,
  removeAuthTokens,
} from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { getAuthHeaders } from "./authClientService";

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
  try {
    const data = (
      await axios.post<ILoginResponse>("http://localhost:3000/user/login", {
        email,
        password,
      })
    ).data;

    updateTokens(data);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const logout = async () => {
  await axios.post<IRegisterResponse>(
    "http://localhost:3000/user/logout",
    {},
    getAuthHeaders()
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
  return true;
};

export default { register, login, logout, googleLogin };
