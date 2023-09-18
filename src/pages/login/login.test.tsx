import "@testing-library/jest-dom";

describe("Login", () => {
  it("debe mostrar un mensaje de error si los credenciales son incorrectos", async () => {
    /* 1. Arrange - Preparar

      Prepare los requisitos previos para nuestra prueba.

      ejemplo:
        - mockear una función/servicio
        - renderizar un componente correctamente
    */
    // mockear el servicio
    // renderizar el componente
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
    // verificar que se muestra el mensaje de error
    // screen.debug();
  });

  it("debe redirigir a la página de inicio si los credenciales son correctos", async () => {
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
    // screen.debug();
  });
});
