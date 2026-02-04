# WebGL + GLSL + TypeScript

Un proyecto base para trabajar con WebGL, GLSL y TypeScript.

## Estructura

```
src/
├── index.ts              # Punto de entrada
├── webgl/
│   ├── renderer.ts       # Clase renderizadora
│   └── shader.ts         # Funciones de compilación de shaders
├── shaders/
│   ├── vertex.glsl       # Vertex shader
│   └── fragment.glsl     # Fragment shader
├── math/
│   └── matrix.ts         # Utilidades matemáticas
└── examples/
    └── advanced.ts       # Ejemplos avanzados
```

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Uso

Los shaders GLSL están separados en archivos `.glsl` y se importan usando `?raw`:

```typescript
import vertexShaderSource from "./shaders/vertex.glsl?raw";
import fragmentShaderSource from "./shaders/fragment.glsl?raw";
```

Los shaders se compilan con `createShaderProgram()`:

```typescript
const shaderProgram = createShaderProgram(
  gl,
  vertexShaderSource,
  fragmentShaderSource,
);
```

El renderizador maneja la configuración de buffers y el dibujado:

```typescript
const renderer = new WebGLRenderer(gl, shaderProgram);
renderer.setVertices(vertices);
renderer.setColors(colors);
renderer.draw(vertexCount);
```

│ │ ├── shader.ts # Compilación de shaders GLSL
│ │ └── renderer.ts # Clase renderizadora WebGL
│ ├── math/
│ │ └── matrix.ts # Utilidades matemáticas (Matrix4, Vector3)
│ └── examples/
│ └── advanced.ts # Ejemplo avanzado con animación
├── index.html # Archivo HTML principal
├── vite.config.ts # Configuración de Vite
├── tsconfig.json # Configuración de TypeScript
└── package.json # Dependencias del proyecto

````

## Cómo Funciona

### 1. Shaders GLSL

Los shaders se definen como strings en TypeScript:

```typescript
const vertexShaderSource = `
  attribute vec4 aPosition;
  attribute vec4 aColor;

  varying vec4 vColor;

  void main() {
    gl_Position = aPosition;
    vColor = aColor;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec4 vColor;

  void main() {
    gl_FragColor = vColor;
  }
`;
````

### 2. Compilación de Shaders

```typescript
import { createShaderProgram } from "./webgl/shader";

const shaderProgram = createShaderProgram(
  gl,
  vertexShaderSource,
  fragmentShaderSource,
);
```

### 3. Renderizado

```typescript
import { WebGLRenderer } from "./webgl/renderer";

const renderer = new WebGLRenderer(gl, shaderProgram);
renderer.setVertices(vertices);
renderer.setColors(colors);
renderer.draw(3);
```

## Ejemplos

### Ejemplo Básico: Triángulo

Ver [src/index.ts](src/index.ts) para un triángulo estático de tres colores.

### Ejemplo Avanzado: Triángulo Animado

Ver [src/examples/advanced.ts](src/examples/advanced.ts) para una versión con rotación y transformaciones.

## Funciones Disponibles

### WebGLRenderer

- `setVertices(vertices: number[])` - Define los vértices
- `setColors(colors: number[])` - Define los colores
- `draw(vertexCount: number)` - Dibuja los vértices
- `clear(r, g, b, a)` - Limpia el canvas con un color
- `dispose()` - Libera recursos

### Matrix4

- `identity()` - Matriz identidad
- `translate(x, y, z)` - Traslación
- `rotateZ(angle)` - Rotación en Z
- `scale(x, y, z)` - Escala

### Vector3

- `add(other)` - Suma
- `subtract(other)` - Resta
- `multiply(scalar)` - Multiplicación escalar
- `dot(other)` - Producto punto
- `length()` - Magnitud
- `normalize()` - Normalizar

## Recursos

- [MDN WebGL Documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [GLSL Reference](https://www.khronos.org/registry/OpenGL/specs/es/2.0/GLSL_ES_Specification_1.20.pdf)
- [Learn WebGL](https://learnopengl.com/)

## Licencia

MIT
