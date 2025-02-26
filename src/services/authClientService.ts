import { getAuthTokenByName } from "../utils/localStorage";
import { refreshTokenName } from "../utils/localStorage";

export const getAuthHeaders = () => {
  const refreshToken = getAuthTokenByName(refreshTokenName);
  return {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };
};
