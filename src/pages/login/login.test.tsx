import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { App } from "../../App";
import { User } from "../../models";
import { getSession, loginService } from "../../services";

// 1.1 Para poder renderizar el App con el browser router es necesario setear estos globals
global.Request = jest.fn();

// 1.3 Mocks
jest.mock("../../services/auth-service", () => {
  return {
    createSession: jest.fn(),
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
    // 1.3 mockear el servicio
    const userMock: User = {
      id: 1,
      role: "admin",
      email: "test@email.com",
    };
    mockedGetSession.mockReturnValue({
      token: "token",
      user: userMock,
    })
    .mockReturnValueOnce({
      token: null,
      user: null,
    });
    mockedLoginService.mockResolvedValueOnce({
      accessToken: "token",
      user: userMock,
    });

    // 1.1 renderizar el componente
    // render(<Login />) // Falla sin un router con: Error: Uncaught [Error: useNavigate() may be used only in the context of a <Router> component.]
    render(<App />);

    // 1.2 obtener los elementos del DOM con los que vamos a interactuar

    const emailInput = screen.getByTestId("login_form_email_input");
    const passwordInput = screen.getByTestId("login_form_password_input");
    const submitButton = screen.getByTestId("login_form_submit_button");

    /* 2. Act - Actuar / Interactuar

      Interactúe con el componente que está probando.

      ejemplo:
        - hacer clic en un botón
        - escribir en un campo de texto
    */

    // console.log("antes de hacer login el window.location.pathname es: ", window.location.pathname);


    // 2.1 llenar los campos del formulario
    await userEvent.type(emailInput, "grace.hopper@systers.xyz");
    await userEvent.type(passwordInput, "123456");

    // 2.2 hacer clic en el botón de submit
    await userEvent.click(submitButton); // Falla sin los mocks con: ReferenceError: fetch is not defined

    /* 3. Assert - Asegurarse / Afirmar

      Asegurarse que el resultado de la interacción es el esperado.

      ejemplo:
        - verificar que se renderizó un elemento
        - verificar que se mostró un mensaje de error
    */
    // verificar que se renderizó el componente Home
    await waitFor(() => {
      expect(screen.getByTestId("home_page")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/");
    });
    // screen.debug();
  });

  it("debe mostrar un mensaje de error si los credenciales son incorrectos", async () => {
    /* 1. Arrange - Preparar

      Prepare los requisitos previos para nuestra prueba.

      ejemplo:
        - mockear una función/servicio
        - renderizar un componente correctamente
    */
    // mockear el servicio
    // hacer un mock del component Home
    // renderizar el un router con el componente Login y Home
    // obtener los elementos del DOM con los que vamos a interactuar
    /* 2. Act - Actuar / Interactuar

      Interactúe con el componente que está probando.

      ejemplo:
        - hacer clic en un botón
        - escribir en un campo de texto
    */
    // llenar los campos del formulario
    // hacer clic en el botón de submit
    /* 3. Assert - Asegurarse / Afirmar

      Asegurarse que el resultado de la interacción es el esperado.

      ejemplo:
        - verificar que se renderizó un elemento
        - verificar que se mostró un mensaje de error
    */
    // verificar que se renderizó el componente Home
    // verificar que se muestra el mensaje de error
    // screen.debug();
  });
});
