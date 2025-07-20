const BASE_URL = "http://localhost:5000/api/";

export const fetchClient = async (url: string, options = {}, token: string) => {
  // const token = localStorage.getItem("token"); // or from cookies, context, etc.

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
