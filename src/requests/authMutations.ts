import { useMutation } from "@tanstack/react-query";
import type {
  RefreshTokenBody,
  RefreshTokenResponse,
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../type/auth";
import { useAuth } from "../contexts/AuthContext";
import { fetchClient } from "../utils/fetchClient";
import type { ApiResonse } from "../type/apiRespnse";

export const useSendOtpMutation = () => {
  const auth = useAuth();
  return useMutation<ApiResonse<SendOtpResponse>, Error, SendOtpRequest>({
    mutationFn: (body) =>
      fetchClient(
        "auth/send-otp",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        auth
      ),
  });
};

export const useVerifyOtpMutation = () => {
  const auth = useAuth();
  return useMutation<ApiResonse<VerifyOtpResponse>, Error, VerifyOtpRequest>({
    mutationFn: (body) =>
      fetchClient(
        "auth/verify-otp",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        auth
      ),
    onSuccess: (res) => {
      if (res.isSuccess) auth.setToken(res.data.user?.token);
    },
    onError: (err) => {
      console.log(err.name);
    },
  });
};

// export const refreshTokenRequest = async (
//   refreshToken: string
// ): Promise<ApiResonse<RefreshTokenResponse>> => {
//   const response = await fetch(`${BASE_URL}auth/refresh-token`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
//     },
//     body: JSON.stringify({ refreshToken }),
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(error.message || "Failed to refresh token");
//   }

//   return response.json();
// };

export const useRefreshToken = () => {
  const auth = useAuth();
  return useMutation<ApiResonse<RefreshTokenResponse>, Error, RefreshTokenBody>(
    {
      mutationFn: (body) =>
        fetchClient(
          "auth/refresh-token",
          { method: "POST", body: JSON.stringify(body) },
          auth
        ),
      onSuccess: (res) => {
        let currentToken = localStorage.getItem("token");

        if (currentToken) {
          auth.setToken(res.data.newToken);
        }
      },
      onError: (err) => {
        console.log(err.name);
      },
    }
  );
};
