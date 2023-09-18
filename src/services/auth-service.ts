import { LoginService, Session, User } from "../models";
import { API_URL } from "../settings";

class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

const TOKEN_LOCAL_STORAGE_KEY = "token";
const USER_LOCAL_STORAGE_KEY = "user";

export const createSession = (token: string, user: User) => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, token);
};

export const deleteSession = () => {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
};

export const getSession = (): Session => {
  const token = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY) || "{}")
    : null;

  return {
    token,
    user,
  };
};

export const loginService: LoginService = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new ApiError(errorMessage);
  }

  const { accessToken, user } = await response.json();

  return { accessToken, user };
};
