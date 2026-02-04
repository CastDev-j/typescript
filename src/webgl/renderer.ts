import * as THREE from "three";
import vertexShaderSource from "../shaders/vertex.glsl?raw";
import fragmentShaderSource from "../shaders/fragment.glsl?raw";

export class WebGLRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Camera setup
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Handle window resize
    window.addEventListener("resize", () => this.onWindowResize());
  }

  /**
   * Add a point to the scene
   */
  addPoint(
    x: number,
    y: number,
    z: number,
    color: THREE.Color | number,
    size: number = 10,
  ): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([x, y, z]), 3),
    );

    const material = new THREE.ShaderMaterial({
      fragmentShader: fragmentShaderSource,
      vertexShader: vertexShaderSource,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uResolution: {
          value: new THREE.Vector2(
            this.renderer.domElement.clientWidth,
            this.renderer.domElement.clientHeight,
          ),
        },
        uSize: { value: size },
      },
    });

    const points = new THREE.Points(geometry, material);
    this.scene.add(points);
    return points;
  }

  /**
   * Render the scene
   */
  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Animate the scene
   */
  animate(callback: () => void): void {
    const loop = () => {
      callback();
      this.render();
      requestAnimationFrame(loop);
    };
    loop();
  }

  /**
   * Clear the scene
   */
  clear(): void {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }

  /**
   * Handle window resize
   */
  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Cleanup resources
   */
  dispose(): void {
    this.renderer.dispose();
  }
}
