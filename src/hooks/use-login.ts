import { useState } from "react";

import { PostRequestArgs, RequestStatus, LoginResponse } from "../models";
import { loginService } from "../services";

type LoginRequestPayload = {
  email: string;
  password: string;
};

type LoginRequestArgs = PostRequestArgs<LoginRequestPayload, LoginResponse>;

type LoginRequest = (args: LoginRequestArgs) => void;

export const useLogin = () => {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>("idle");

  const login: LoginRequest = ({ payload, options }) => {
    setRequestStatus("loading");
    loginService(payload.email, payload.password)
      .then((res) => {
        if (options?.onSuccess) options.onSuccess(res);
        setRequestStatus("success");
      })
      .catch((error) => {
        if (options?.onError) options.onError(error);
        setRequestStatus("error");
      });
  };

  return {
    loginStatus: requestStatus,
    login,
  };
};
