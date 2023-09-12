import { render, screen } from "@testing-library/react";

import { Home } from "../pages/home";

describe("App", () => {
  it("should should be a teapot", () => {
    expect(1).toBe(1);
  });

  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });
});
