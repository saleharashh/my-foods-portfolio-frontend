const BASE_URL = "http://localhost:5000/api/";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
export const fetchClient = async (
  url: string,
  options = {},
  token: string,
) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options,
    },
  };

  const response = await fetch(`${BASE_URL}${url}`, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API error");
  }

  return response.json();
};
