import { render, screen } from "@testing-library/react";

import { Home } from "./home";

describe("Home", () => {
  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });
});
