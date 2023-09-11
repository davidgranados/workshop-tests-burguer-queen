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
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/react
- @swc/jest

### 2: Configurar Jest

Ahora, necesitas configurar Jest en tu proyecto.
Crea un archivo llamado jest.config.cjs en la raíz de tu proyecto y pega el siguiente código:

```
module.exports = {
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
import { App } from "../App";

jest.mock('../services/auth-service.ts')

describe("App", () => {
  it("should be a teapot", () => {
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
