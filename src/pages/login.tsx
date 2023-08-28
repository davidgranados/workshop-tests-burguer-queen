import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin } from "../hooks";
import { createSession } from "../services";

type LoginFormFields = {
  email: string;
  password: string;
};

export const Login: FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormFields>({
    email: "",
    password: "",
  });

  const { login, loginStatus } = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      payload: formData,
      options: {
        onSuccess: (res) => {
          createSession(res.accessToken, res.user);
          navigate("/");
        },
      },
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loginStatus === "loading"}>
          Login
        </button>
      </form>
      {loginStatus === "error" && <p>Invalid credentials</p>}
    </div>
  );
};
