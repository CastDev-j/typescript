uniform vec3 uColor;
uniform float uSize;
varying vec3 vColor;

void main() {
    vColor = uColor;
    gl_PointSize = uSize;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}