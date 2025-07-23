import { useMutation } from "@tanstack/react-query";
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../type/auth";
import { useAuth } from "../contexts/AuthContext";
import { fetchClient } from "../utils/fetchClient";
import type { ApiResonse } from "../type/apiRespnse";

export const useSendOtpMutation = () => {
  const { token } = useAuth();
  return useMutation<ApiResonse<SendOtpResponse>, Error, SendOtpRequest>({
    mutationFn: (body) =>
      fetchClient(
        "auth/send-otp",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token!!
      ),
  });
};

export const useVerifyOtpMutation = () => {
  const { token, setToken } = useAuth();
  return useMutation<ApiResonse<VerifyOtpResponse>, Error, VerifyOtpRequest>({
    mutationFn: (body) =>
      fetchClient(
        "auth/verify-otp",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token!!
      ),
    onSuccess: (res) => {
      setToken(res.data.user?.token);
    },
  });
};
