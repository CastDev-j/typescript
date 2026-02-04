import "../global.css";
import * as THREE from "three";
import { WebGLRenderer } from "./webgl/renderer";

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer = new WebGLRenderer(canvas);

// Add a point at the center of the screen
const points = Array.from({ length: 1000 }, () => {
  const x = (Math.random() - 0.5) * 10;
  const y = (Math.random() - 0.5) * 10;
  const z = (Math.random() - 0.5) * 10;

  const color = new THREE.Color(Math.random(), Math.random(), Math.random());
  const size = Math.random() * 20 + 5;

  const point = renderer.addPoint(x, y, z, color, size);
  return point;
});

// Render the scene
renderer.animate(() => {
  points.forEach((point, index) => {
    point.position.y = Math.sin(Date.now() * 0.001 + index) * 1.0;
    point.position.x = Math.cos(Date.now() * 0.001 + index) * 1.0;
  });
});
