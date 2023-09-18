import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { loginService, getSession } from "../../services/auth-service";
// import { Login } from "./login";
import { User } from "../../models";
import { App } from "../../App";

// Para poder renderizar el App con el browser router es necesario setear estos globals
global.fetch = jest.fn();
global.Request = jest.fn();
global.Headers = jest.fn();

jest.mock("../../services/auth-service", () => {
  return {
    ...jest.requireMock("../../services/__mocks__/auth-service"),
    getSession: jest.fn(),
    loginService: jest.fn(),
  };
});

const mockedLoginService = loginService as jest.MockedFunction<
  typeof loginService
>;
const mockedGetSession = getSession as jest.MockedFunction<typeof getSession>;

describe("Login", () => {
  it("debe redirigir a la página de inicio si los credenciales son correctos", async () => {
    /* 1. Arrange - Preparar

      Prepare los requisitos previos para nuestra prueba.

      ejemplo:
        - mockear una función/servicio
        - renderizar un componente correctamente
    */
    const userMock: User = {
      id: 1,
      role: "admin",
      email: "test@email.com",
    };
    mockedLoginService.mockResolvedValueOnce({
      accessToken: "token",
      user: userMock,
    });
    mockedGetSession
    .mockReturnValue({
      token: "token",
      user: userMock,
    })
    .mockReturnValueOnce({
      token: null,
      user: null,
    });

    render(<App />);

    // console.log("window.location.pathname", window.location.pathname);

    const emailInput = screen.getByTestId("login_form_email_input");
    const passwordInput = screen.getByTestId("login_form_password_input");
    const submitButton = screen.getByTestId("login_form_submit_button");

    /* 2. Act - Actuar / Interactuar

      Interactúe con el componente que está probando.

      ejemplo:
        - hacer clic en un botón
        - escribir en un campo de texto
    */

    await userEvent.type(emailInput, userMock.email);
    await userEvent.type(passwordInput, "noImportaElServicioEstaMockeado");

    await userEvent.click(submitButton); // Falla sin los mocks con: ReferenceError: fetch is not defined

    /* 3. Assert - Asegurarse / Afirmar

      Asegurarse que el resultado de la interacción es el esperado.

      ejemplo:
        - verificar que se renderizó un elemento
        - verificar que se mostró un mensaje de error
    */

    await waitFor(() => {
      expect(screen.getByTestId("home_page")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/");
    });

    // console.log("window.location.pathname", window.location.pathname);
    // screen.debug();
  });

  it("debe mostrar un mensaje de error si los credenciales son incorrectos", async () => {
    /* 1. Arrange - Preparar

      Prepare los requisitos previos para nuestra prueba.

      ejemplo:
        - mockear una función/servicio
        - renderizar un componente correctamente
    */
    mockedGetSession.mockReturnValueOnce({
      token: null,
      user: null,
    });
    mockedLoginService.mockRejectedValueOnce(new Error("Invalid credentials"));
    // render(<Login />) // Falla sin un router con: Error: Uncaught [Error: useNavigate() may be used only in the context of a <Router> component.]
    render(<App />); // Falla sin el mockedGetSession con: TypeError: Cannot destructure property 'token' of '(0 , _services.getSession)(...)' as it is undefined.

    // console.log("window.location.pathname", window.location.pathname);

    const emailInput = screen.getByTestId("login_form_email_input");
    const passwordInput = screen.getByTestId("login_form_password_input");
    const submitButton = screen.getByTestId("login_form_submit_button");

    /* 2. Act - Actuar / Interactuar

      Interactúe con el componente que está probando.

      ejemplo:
        - hacer clic en un botón
        - escribir en un campo de texto
    */

    await userEvent.type(emailInput, "wrong@email.com");
    await userEvent.type(passwordInput, "wrongpassword");

    await userEvent.click(submitButton); // Falla sin los mocks con: ReferenceError: fetch is not defined

    /* 3. Assert - Asegurarse / Afirmar

      Asegurarse que el resultado de la interacción es el esperado.

      ejemplo:
        - verificar que se renderizó un elemento
        - verificar que se mostró un mensaje de error
    */

    expect(screen.getByTestId("login_form_error_message")).toBeInTheDocument();
    expect(window.location.pathname).toBe("/login");

    // console.log("window.location.pathname", window.location.pathname);
    // screen.debug();
  });
});
