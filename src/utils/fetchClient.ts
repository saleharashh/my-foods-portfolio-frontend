export const BASE_URL = "http://localhost:5000/api/";
import type { AuthContextType } from "../contexts/AuthContext";
import { refreshTokenRequest } from "../requests/refreshTokenRequest";

export const fetchClient = async (
  url: string,
  options = {},
  auth: AuthContextType
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options,
    },
  };

  let response = await fetch(`${BASE_URL}${url}`, config);
  if (response.status === 401 && auth.refreshToken) {
    try {
      const refreshRes = await refreshTokenRequest(auth.refreshToken);
      const newToken = refreshRes.data.newToken;
      auth.setToken(newToken);

      // Retry request with new token
      const retryConfig: RequestInit = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
        },
      };

      response = await fetch(`${BASE_URL}${url}`, retryConfig);
    } catch {
      throw new Error("Session expired. Please log in again.");
    }
  }
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API error");
  }

  return response.json();
};
