# React + TypeScript + Vite

## Paso 1: Instalar Jest

Primero, debes instalar Jest como una dependencia de desarrollo en tu proyecto.
Para hacer esto, abre una terminal en la raíz de tu proyecto y ejecuta el siguiente comando:

```
npm install --save-dev jest @types/jest jest-environment-jsdom jest-watch-typeahead @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event @swc/jest
```

Bibliotecas que serán instalada:

- jest
- @types/jest
- jest-environment-jsdom
- jest-watch-typeahead
- @testing-library/dom
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/user-event
- @swc/jest

## Paso 2: Configurar Jest

Ahora, necesitas configurar Jest en tu proyecto.
Crea un archivo llamado jest.config.cjs en la raíz de tu proyecto y pega el siguiente código:

```
module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/mocks/**",
  ],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ["./config/jest/setupTests.js"],
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>/src"],
  transform: {
    "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "^.+\\.(svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  moduleFileExtensions: [
    // Place tsx and ts to beginning as suggestion from Jest team
    // https://jestjs.io/docs/configuration#modulefileextensions-arraystring
    "tsx",
    "ts",
    "web.js",
    "js",
    "web.ts",
    "web.tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  resetMocks: true,
};
```

## Paso 3: Archivos adicionales

Crea un archivo en /src/__tests__/example.test.tsx con el siguiente contenido:

```
import { render, screen } from "@testing-library/react";

import { App } from "../App";

describe("App", () => {
  it("should work as expected", () => {
    render(<App />);
    screen.debug();
  });
});

```

Crea un archivo en /src/__mocks__/file-mock.cjs con el siguiente contenido:

```
module.exports = "";
```

Crea en la raíz del proyecto las siguientes carpetas /config/jest con los siguientes archivos:
css-transform.cjs, file-transform.cjs

css-transform.cjs
```
"use strict";

module.exports = {
  process() {
    return {
      code: "module.exports = {};",
    };
  },
  getCacheKey() {
    return "cssTransform";
  },
};

```

file-transform.cjs
```
"use strict";

const path = require("path");
const camelcase = require("camelcase");
module.exports = {
  process(src, filename) {
    const assetFilename = JSON.stringify(path.basename(filename));

    if (filename.match(/\.svg$/)) {
      // Based on how SVGR generates a component name:
      // https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
      const pascalCaseFilename = camelcase(path.parse(filename).name, {
        pascalCase: true,
      });
      const componentName = `Svg${pascalCaseFilename}`;
      const svgComponentCode = `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
      return { code: svgComponentCode };
    }

    const fileModuleCode = `module.exports = ${assetFilename};`;
    return { code: fileModuleCode };
  },
};
```

Esto es necesario porque Jest no puede entender cómo manejar las importaciones de archivos que no son de JS (en este caso, archivos SVG), por lo que el módulo file-transform.js intercepta estas importaciones y devuelve el nombre de archivo del recurso.
Sin esta transformación, Jest no sería capaz de ejecutar el conjunto de pruebas, ya que fallaría al resolver las importaciones de archivos que no son de JS.

Crea otro archivo en /config/jest llamado setup-tests.cjs

setup-tests.cjs
```
import "@testing-library/jest-dom";

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
});

Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});

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
