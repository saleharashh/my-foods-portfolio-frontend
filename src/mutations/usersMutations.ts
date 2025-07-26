import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../contexts/AuthContext";
import type { UpdateUserBody, UpdateUserResponse } from "../type/user";
import { fetchClient } from "../utils/fetchClient";
import type { ApiResonse } from "../type/apiRespnse";

export const useUpdateUser = () => {
  const { token } = useAuth();
  return useMutation<ApiResonse<UpdateUserResponse>, Error, UpdateUserBody>({
    mutationFn: (body) =>
      fetchClient(
        "user/update-user",
        { method: "POST", body: JSON.stringify(body) },
        token!!
      ),
  });
};

export const useGetUser = () => {
  const { token } = useAuth();
  return useMutation<undefined, Error, undefined>({
    mutationFn: (body) =>
      fetchClient(
        "user/get-user",
        { method: "GET", body: JSON.stringify(body) },
        token!!
      ),
  });
};
