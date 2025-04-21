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
  _id: string;
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

const backendUrl = import.meta.env.VITE_API_URL || "https://node94.cs.colman.ac.il:4000";

export const register = async (
  email: string,
  username: string,
  password: string,
  profilePic?: File
) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("image", profilePic as Blob);

  const response = await axios.post<IRegisterResponse>(
    backendUrl + "/user",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  if (response.status !== 201) {
    return false;
  }

  return await login(email, password);
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
    const response = await axios.post<ILoginResponse>(
      backendUrl + "/user/login",
      {
        email,
        password,
      }
    );
    const data = response.data;

    if (response.status !== 200) {
      return false;
    } else {
      updateTokens(data);
      return data;
    }
  } catch (e) {
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
  image?: File
) => {
  const formData = new FormData();
  if (email) {
    formData.append("email", email);
  }
  if (username) {
    formData.append("username", username);
  }
  if (description) {
    formData.append("description", description);
  }
  if (image) {
    formData.append("image", image as Blob);
  }

  await axios.put<IUpdateResponse>(backendUrl + `/user/${id}`, formData, {
    headers: {
      ...getAuthHeaders().headers,
      Authorization: `Bearer ${getAuthTokenByName("accessToken")}`,
    },
  });
};
export default {
  register,
  login,
  logout,
  googleLogin,
  getUserDetails,
  updateUser,
};
