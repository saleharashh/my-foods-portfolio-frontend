import { BASE_URL } from "../utils/fetchClient";

export const refreshTokenRequest = async (refreshToken: string) => {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json(); // must include newToken
};
