# React + TypeScript + Vite

## Paso 1

### 1: Instalar Jest

Primero, debes instalar Jest como una dependencia de desarrollo en tu proyecto.
Para hacer esto, abre una terminal en la raíz de tu proyecto y ejecuta el siguiente comando:

```
npm install --save-dev jest @types/jest jest-environment-jsdom jest-watch-typeahead @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event @swc/jest
```

Bibliotecas que serán instalada:

- jest
- @types/jest
- jest-environment-jsdom
- @testing-library/react
- @swc/jest

### 2: Configurar Jest

Ahora, necesitas configurar Jest en tu proyecto.
Crea un archivo llamado jest.config.cjs en la raíz de tu proyecto y pega el siguiente código:

```
module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
  ],
};
```
Crea en la raíz del proyecto un archivo llamado .swcrc con lo siguiente:

```
{
  "jsc": {
    "target": "es2017",
    "parser": {
      "syntax": "typescript",
      "tsx": true,
      "decorators": false,
      "dynamicImport": false
    },
    "transform": {
      "react": {
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false,
        "runtime": "automatic"
      },
      "hidden": {
        "jest": true
      }
    }
  },
  "module": {
    "type": "commonjs",
    "strict": false,
    "strictMode": true,
    "lazy": false,
    "noInterop": false
  }
}
```

swcrc es un archivo de configuración para el compilador de JavaScript swc.
swc es un compilador de JavaScript/TypeScript extremadamente rápido que se utiliza para transpilar y optimizar el código fuente de una aplicación

### 3: Pruebas de ejemplo

Crea un archivo en /src/__tests__/example.test.tsx con el siguiente contenido:

```
import { render, screen } from "@testing-library/react";

import { Home } from "../pages/home";

describe("Examples", () => {
  it("should be a teapot", () => {
    expect(1).toBe(1);
  });

  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });
});

```

## Paso 2 - CSS

### 1: Crear archivo

Crea una carpeta llamada `__mocks__` dentro de `src` y crea un archivo llamado `file-mock.cjs` con lo siguiente

```
module.exports = "";
```

Esto es necesario porque vite sabe leer y procesar archivos de css pero jest los intenta leer y procesar como si fueran archivos de js


### 2: Configurar Jest

Agrega la siguiente sección de configuración al archivo `jest.config.cjs``
```
moduleNameMapper: {
  "^.+\\.css$": "<rootDir>/src/__mocks__/file-mock.cjs",
},
```

## Paso 3 - CSS Modules

### 1: Prueba de ejemplo

Crea la siguiente prueba de ejemplo dentro de la carpeta `src/pages/login` en un archivo llamado `login.test.tsx`

```
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { Login } from "./login";

it("should render the login page", () => {
  render(<Login />, {wrapper: BrowserRouter})

  screen.debug();
});
```

### 2: Instalar biblioteca

Instala como dependencia de desarrollo la biblioteca `identity-obj-proxy`

```
npm install --save-dev identity-obj-proxy
```

Esta biblioteca nos sirve para mockear los css modules


## 3: Configurar Jest

Actualiza la sección `moduleNameMapper` en el archivo de configuración de jest`jest.config.cjs``
```
moduleNameMapper: {
  "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  "^.+\\.css$": "<rootDir>/src/__mocks__/file-mock.cjs",
},
```

El orden de las propiedades es importante, el mapper de css modules debe estar primero sino estos archivos serán mockeados por el mapper de css/file-mock

## Paso 4 - Imágenes

### 1: Prueba de ejemplo

Mueve la prueba de home que tenemos en `example.test.tsx` a su propio archivo cerca del componente `home.tsx`

El resultado debe ser el siguiente

src/__tests__/example.test.tsx
```
describe("Example", () => {
  it("should should be a teapot", () => {
    expect(1).toBe(1);
  });
});
```

src/pages/home/home.test.tsx
```
import { render, screen } from "@testing-library/react";

import { Home } from "./home";

describe("Home", () => {
  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });
});
```
### 2: Configurar Jest

Modifica la siguiente propiedad en la sección `moduleNameMapper` de configuración de jest
```
moduleNameMapper: {
  ...
  "^.+\\.(css|png|jpg|jpeg)$": "<rootDir>/src/__mocks__/file-mock.cjs",
},
```

Este cambio hará que no solo los archivos con extensión `.css` sean mockeados con nuestro `file-mock.csj` sino que ahora también serán mockeados los archivos con las extensiones `.png`, `.jpg` y `.jpeg`


## Pruebas del Login

### Tipos de pruebas

- Unit Testing / Pruebas unitarias: Las pruebas unitarias implican probar una unidad (o un fragmento de código) de forma aislada, para determinar si hace lo que esperamos. En React, normalmente la "unidad" se refiere a una función de utilidad, componente de función o componente de clase.

- Integration Testing / Pruebas de integración: Es útil pensar en las pruebas de integración como una prueba unitaria más grande, excepto que la unidad que estás probando es la combinación de varios componentes más pequeños. Más concretamente, en lugar de simplemente probar un componente Button o un componente TextField por sí solos, una prueba de integración garantiza que varios componentes TextField colocados junto a un componente Button, dentro de un componente Form, se comporten como esperamos.

- End to End Testing

- Snapshot Testing

### Qué debemos probar? (Para qué hacemos pruebas?)

Puede ser bastante difícil determinar qué es exactamente lo que deberías probar cuando se trata de escribir pruebas en React. Particularmente cuando la mitad de los ejemplos en los artículos en línea parecen hacerlo "a la antigua" (probar que los componentes actualicen correctamente el estado después de ejecutar alguna función, probar que x función fue llamada con x argumentos...), en lugar de probar la funcionalidad (probar que los usuarios puedan ingresar datos y enviar un formulario, ser redirigidos a una pantalla nuevo o ver un mensaje de error).

Sin embargo, normalmente, cuando empiezo a escribir pruebas para un nuevo proyecto, empiezo a probar pantallas completas siempre que sea posible (y si es estrictamente necesario, queda tiempo y es rentable le hago pruebas a los componentes reutilizables), lo que significa que primero empiezo con las pruebas de integración.

### Cómo organizar el código en las pruebas?

Arrange/Act/Assert (AAA) es un patrón para organizar y formatear el código en tus pruebas.

Se recomienda para crear pruebas de una forma más natural y cómoda. La idea es desarrollar una prueba siguiendo estos 3 sencillos pasos:

- Arrange - Preparar/Organizar: configurar los objetos de prueba y preparar los requisitos previos para su prueba.
- Act - Actuar/Interactuar: realizar el trabajo real de la prueba.
- Assert - Asegurar/Afirmar: verificar el resultado.


### 1. Instalar user-event y jest-dom

```
npm install --save-dev @testing-library/user-event @testing-library/jest-dom
```

user-event intenta simular los eventos reales que sucederían en el navegador cuando el usuario interactúa con él.

La biblioteca @testing-library/jest-dom proporciona un conjunto de comparadores (matchers) de jest personalizados que puedes usar para extender jest. Esto hará que sus pruebas sean más declarativas, claras de leer y de mantener.

### 2. Agregar data-testid

`data-testid`:
- Es un atributo utilizado para identificar un nodo DOM con fines de prueba.
- Debe usarse como controlador del código de prueba.
- Necesitamos asegurarnos de que su valor sea único para no causar conflictos entre componentes.

Beneficios de `data-testid`: Si estamos haciendo pruebas de integración los selectores pueden ser ambiguos y cambiar inesperadamente cuando cambia la implementación. Sin embargo, un `data-testid` no es ambiguo y al encontrarnos con uno en el código sabemos que se agregó exclusiva e intencionalmente para las pruebas.


### 3. Hacer las pruebas

src/pages/login/login.test.tsx
```
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
```
