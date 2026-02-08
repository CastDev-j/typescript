import * as THREE from "three";

interface GenerateCircleOptions {
  radius: number;
  color: THREE.ColorRepresentation;
  segments?: number;
}

export const generateCircle = ({
  color,
  radius,
  segments = 360,
}: GenerateCircleOptions) => {
  const vertices: number[] = [];

  const factor = 360 / segments;

  for (let i = 0; i < segments; i++) {
    const radians = i * factor * (Math.PI / 180);

    const outterRadius = radius;
    const innerRadius = radius * 0.9;

    const innerVertice = [
      Math.cos(radians) * innerRadius,
      Math.sin(radians) * innerRadius,
      0,
    ];

    const outterVertice = [
      Math.cos(radians) * outterRadius,
      Math.sin(radians) * outterRadius,
      0,
    ];

    vertices.push(...innerVertice, ...outterVertice);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3),
  );

  const lineMaterial = new THREE.LineBasicMaterial({ color, linewidth: 1 });

  return new THREE.LineSegments(geometry, lineMaterial);
};
