import "../global.css";
import { WebGLRenderer } from "./webgl/renderer";
import { Clock } from "./lib/generate-clock";
import * as THREE from "three";
import Stats from "stats.js";

const canvas = document.getElementById("webgl-canvas") as HTMLCanvasElement;
if (!canvas) {
  throw new Error("Canvas element not found");
}

const renderer = new WebGLRenderer(canvas);

const stats = new Stats();
stats.showPanel(0);
stats.dom.style.position = "fixed";
stats.dom.style.left = "0";
stats.dom.style.top = "0";
stats.dom.style.zIndex = "1000";
document.body.appendChild(stats.dom);

const clocksAmount = 50;

const clocks = Array.from({ length: clocksAmount }, (_, index) => {
  const clockRadius = 1.5;
  const color = new THREE.Color().setHSL(index / clocksAmount, 1, 0.5);
  const position = new THREE.Vector3(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  );
  return new Clock({
    clockRadius,
    clockColor: color,
    hourHandColor: color,
    minuteHandColor: color,
    secondHandColor: color,
    position,
  });
});

const clocksCopy = clocks.map((clock) => {
  const clockCopy = clock.getProperties();
  return new Clock(clockCopy);
});

const centerClock = new Clock({
  clockRadius: 1,
  clockColor: "#ffffff",
  hourHandColor: "#ffffff",
  minuteHandColor: "#ffffff",
  secondHandColor: "#ffffff",
  position: new THREE.Vector3(0, 0, 0),
});

renderer.scene.add(centerClock.mesh);

clocks.forEach((clock) => {
  renderer.scene.add(clock.mesh);
});

clocksCopy.forEach((clock) => {
  renderer.scene.add(clock.mesh);
});

renderer.animate(
  () => {
    stats.begin();
    const time = Date.now() * 0.0001;

    clocks.forEach((clock, index) => {
      const factor = index / clocksAmount;
      clock.mesh.position.x = Math.cos(time + factor * Math.PI * 2) * 5;
      clock.mesh.position.y = Math.sin(time + factor * Math.PI * 2) * 5;
      clock.mesh.position.z = Math.sin(time + factor * Math.PI * 2) * 5;
    });

    clocksCopy.forEach((clock, index) => {
      const factor = index / clocksAmount;
      clock.mesh.position.x = -Math.cos(time + factor * Math.PI * 2) * 5;
      clock.mesh.position.y = -Math.sin(time + factor * Math.PI * 2) * 5;
      clock.mesh.position.z = Math.sin(time + factor * Math.PI * 2) * 5;
    });
  },
  () => {
    stats.end();
  },
);
