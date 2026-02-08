import "../global.css";
import { WebGLRenderer } from "./webgl/renderer";
import { Clock } from "./lib/generate-clock";
import * as THREE from "three";

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer = new WebGLRenderer(canvas);

const clocksAmount = 25;

for (let index = 0; index < clocksAmount; index++) {
  const clockRadius = 1.5;
  const color = new THREE.Color().setHSL(index / clocksAmount, 1, 0.5);
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  );

  const clock = new Clock({
    clockRadius,
    clockColor: color,
    hourHandColor: color,
    minuteHandColor: color,
    secondHandColor: color,
    position,
  });

  renderer.scene.add(clock.mesh);
}

const centerClock = new Clock({
  clockRadius: 1,
  clockColor: "#ffffff",
  hourHandColor: "#ffffff",
  minuteHandColor: "#ffffff",
  secondHandColor: "#ffffff",
  position: new THREE.Vector3(0, 0, 0),
});

renderer.scene.add(centerClock.mesh);

renderer.animate(() => {});
