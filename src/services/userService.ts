import axios, { CanceledError } from "axios";
import {
  updateTokens,
  getAuthTokenByName,
  removeAuthTokens,
} from "../utils/localStorage";
import { getAuthHeaders } from "./authClientService";
import { get } from "react-hook-form";

export { CanceledError };

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  _id?: string;
}

export interface IRegisterResponse {
  email: string;
  username: string;
  password: string;
  _id?: string;
}

export interface IUpdateResponse {
  email: string;
  username: string;
  description?: string;
  image?: string;
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

export const getUserDetails = async () => {
  const response = await axios.get(
    "http://localhost:3000/user/details",
    getAuthHeaders()
  );

  return response.data;
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

export const updateUser = async (
  id: string,
  email: string,
  username: string,
  description?: string,
  image?: string
) => {
  const payload: Partial<IUpdateResponse> = {
    email,
    username,
  };

  if (description) {
    payload.description = description;
  }

  if (image) {
    payload.image = image;
  }

  await axios.put<IUpdateResponse>(
    `http://localhost:3000/user/${id}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${getAuthTokenByName("accessToken")}`,
      },
    }
  );
};
export default { register, login, logout, googleLogin, getUserDetails, updateUser };
