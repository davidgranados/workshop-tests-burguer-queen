# React + TypeScript + Vite

## Paso 1

### 1: Instalar Jest

Primero, debes instalar Jest como una dependencia de desarrollo en tu proyecto.
Para hacer esto, abre una terminal en la raíz de tu proyecto y ejecuta el siguiente comando:

```
npm install --save-dev jest @types/jest jest-environment-jsdom @testing-library/react @swc/jest
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
  it("should should be a teapot", () => {
    expect(1).toBe(1);
  });

  it("should render Home", () => {
    render(<Home />);
    screen.debug();
  });
});
```
