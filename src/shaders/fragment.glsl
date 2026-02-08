precision mediump float;

varying vec3 vColor;

uniform vec2 uResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;

    vec3 color = vec3(uv.x, uv.y, (uv.x + uv.y) * 0.5);

    gl_FragColor = vec4(vColor, 1.0);
}