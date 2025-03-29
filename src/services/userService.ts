import axios, { CanceledError } from "axios";
import {
  updateTokens,
  getAuthTokenByName,
  removeAuthTokens,
} from "../utils/localStorage";
import { getAuthHeaders } from "./authClientService";

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

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const register = async (
  email: string,
  username: string,
  password: string
) => {
  await axios.post<IRegisterResponse>(backendUrl + "/user/", {
    email,
    username,
    password,
  });

  await login(username, password);
};

export const getUserDetails = async () => {
  const response = await axios.get(
    backendUrl + "/user/details",
    getAuthHeaders()
  );

  return response.data;
};

export const login = async (email: string, password: string) => {
  try {
    const data = (
      await axios.post<ILoginResponse>(backendUrl + "/user/login", {
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
    backendUrl + "/user/logout",
    {},
    getAuthHeaders()
  );
  removeAuthTokens();
};

export const googleLogin = async (credential?: string) => {
  const tokens = (
    await axios.post<ILoginResponse>(backendUrl + "/user/login/google", {
      credential,
    })
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

  await axios.put<IUpdateResponse>(backendUrl + `/user/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${getAuthTokenByName("accessToken")}`,
    },
  });
};
export default { register, login, logout, googleLogin, getUserDetails, updateUser };
