import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Login } from "./login";

it("should render the login page", () => {
  render(<Login />, {wrapper: BrowserRouter})

  screen.debug();
});
