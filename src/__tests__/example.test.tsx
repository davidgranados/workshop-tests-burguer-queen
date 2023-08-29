import { render, screen } from "@testing-library/react";

import { Home } from "../pages/home";
import { App } from "../App";

jest.mock('../services/auth-service.ts')

describe("App", () => {
  it("should should be a teapot", () => {
    expect(1).toBe(1);
  });

  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });

  it("should render App", () => {
    render(<App />);
    screen.debug();
  });
});
