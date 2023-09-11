export type RequestStatus = "loading" | "success" | "error" | "idle";

export type RequestOptions<TResponse = any, TError = Error> = {
  onSuccess?: (response: TResponse) => void;
  onError?: (error: TError) => void;
};

export type PostRequestArgs<TPayload = any, TResponse = any> = {
  payload: TPayload;
  options?: RequestOptions<TResponse>;
};
