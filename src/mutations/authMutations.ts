import { useMutation } from "@tanstack/react-query";
import type {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../type/auth";
import { useAuth } from "../contexts/AuthContext";
import { fetchClient } from "../utils/fetchClient";

export const useSendOtpMutation = () => {
  const { token } = useAuth();
  return useMutation<SendOtpResponse, Error, SendOtpRequest>({
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
  return useMutation<VerifyOtpResponse, Error, VerifyOtpRequest>({
    mutationFn: (body) =>
      fetchClient(
        "auth/verify-otp",
        {
          method: "POST",
          body: JSON.stringify(body),
        },
        token!!
      ),
    onSuccess: (data) => {
      setToken(data.token);
    },
  });
};
