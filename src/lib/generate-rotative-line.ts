import * as THREE from "three";

export class RotativeLine {
  public mesh: THREE.LineSegments;
  private material: THREE.LineBasicMaterial;
  private vertices: Float32Array;
  private size: number;

  constructor(
    color: THREE.ColorRepresentation,
    size: number,
    segment: number = 0,
  ) {
    this.material = new THREE.LineBasicMaterial({ color });
    this.vertices = new Float32Array(6);
    this.size = size * 0.75;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.vertices, 3),
    );

    this.mesh = new THREE.LineSegments(geometry, this.material);
    this.update(segment);
  }

  update(segment: number): void {
    const radians = (90 - segment) * (Math.PI / 180);

    this.vertices[0] = 0;
    this.vertices[1] = 0;
    this.vertices[2] = 0;

    this.vertices[3] = Math.cos(radians) * this.size;
    this.vertices[4] = Math.sin(radians) * this.size;
    this.vertices[5] = 0;

    this.mesh.geometry.attributes.position.needsUpdate = true;
  }
}
