import { LoginService, Session, User } from "../../models";

export const createSession = (token: string, user: User) => {
  console.log("createSession");
};

export const deleteSession = () => {
  console.log("deleteSession");
};

export const getSession = (): Session => {
  return {
    token: "token",
    user: {
      id: 1,
      role: "admin",
      email: "test@email.com",
    },
  };
};

export const loginService: LoginService = async (
  email: string,
  password: string
) => {
  return {
    accessToken: "token",
    user: {
      id: 1,
      role: "admin",
      email: "test@email.com",
    },
  };
};
