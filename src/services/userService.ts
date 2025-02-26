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

export const getUserById = async (id: string) => {
  const token = getAuthTokenByName("accessToken");
  const { data } = await axios.get<IRegisterResponse>(
    `http://localhost:3000/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const login = async (email: string, password: string) => {
  const data = (
    await axios.post<ILoginResponse>("http://localhost:3000/user/login", {
      email,
      password,
    })
  ).data;

  updateTokens(data);
  return data;
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

  await axios.put<IUpdateResponse>(`http://localhost:3000/user/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${getAuthTokenByName("accessToken")}`,
    },
  });

};
export default { register, login, logout, googleLogin, getUserById };
