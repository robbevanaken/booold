// Unicorn Studio gradient export - renders locally without external dependencies
export const gradientData = {
  history: [
    {
      visible: true,
      layerType: "effect",
      type: "gradient",
      speed: 2.25,
      trackMouse: 0,
      animating: false,
      compiledFragmentShaders: [
        `#version 300 es
precision highp float;in vec2 vTextureCoord;uniform vec2 uMousePos;vec3 getColor(int index) {
switch(index) {
case 0: return vec3(0, 0, 0);
case 1: return vec3(0, 0, 0);
case 2: return vec3(0, 0, 0);
case 3: return vec3(0, 0, 0);
case 4: return vec3(0, 0, 0);
case 5: return vec3(0, 0, 0);
case 6: return vec3(0, 0, 0);
case 7: return vec3(0, 0, 0);
case 8: return vec3(0, 0, 0);
case 9: return vec3(0, 0, 0);
case 10: return vec3(0, 0, 0);
case 11: return vec3(0, 0, 0);
case 12: return vec3(0, 0, 0);
case 13: return vec3(0, 0, 0);
case 14: return vec3(0, 0, 0);
case 15: return vec3(0, 0, 0);
default: return vec3(0.0);
}
}const float PI = 3.14159265;vec2 rotate(vec2 coord, float angle) {
float s = sin(angle);
float c = cos(angle);
return vec2(
coord.x * c - coord.y * s,
coord.x * s + coord.y * c
);
}out vec4 fragColor;vec3 getColor(vec2 uv) {return vec3(0, 0, 0);
}void main() {vec2 uv = vTextureCoord;
vec2 pos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), 0.0000);
uv -= pos;
uv /= max(0.5000*2., 1e-5);
uv = rotate(uv, (0.0000 - 0.5) * 2. * PI);
vec4 color = vec4(getColor(uv), 1.0000);
fragColor = color;
}`
      ],
      compiledVertexShaders: [
        `#version 300 es
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = aTextureCoord;
}`
      ],
      data: { downSample: 0.5, depth: false, uniforms: {}, isBackground: true },
      id: "gradient"
    },
    {
      visible: true,
      layerType: "effect",
      type: "noiseFill",
      speed: 2.35,
      trackMouse: 0,
      animating: true,
      compiledFragmentShaders: [
        `#version 300 es
precision highp float;
in vec2 vTextureCoord;
in vec3 vVertexPosition;uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMousePos;
uniform vec2 uResolution;
uvec2 pcg2d(uvec2 v) {
v = v * 1664525u + 1013904223u;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
v ^= v >> 16;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
return v;
}float randFibo(vec2 p) {
uvec2 v = floatBitsToUint(p);
v = pcg2d(v);
uint r = v.x ^ v.y;
return float(r) / float(0xffffffffu);
}out vec4 fragColor;const float PI = 3.14159265359;
const float TAU = 6.28318530718;vec3 anchoredPal(float t, vec3 col1, vec3 col2) {
vec3 mid = 0.5 * (col1 + col2);
vec3 axisAmp = 0.5 * (col2 - col1);vec3 base = mid + axisAmp * cos(TAU * t);vec3 axis = length(axisAmp) > 0.0001 ? normalize(axisAmp) : vec3(1.0, 0.0, 0.0);
vec3 ref = abs(axis.x) > 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
vec3 tangent1 = normalize(cross(axis, ref));
vec3 tangent2 = normalize(cross(axis, tangent1));float richness = 0.24 * length(axisAmp) + 0.02;
vec3 ripple =
tangent1 * sin(TAU * (t * 2.0 + 0.123)) +
tangent2 * sin(TAU * (t * 3.0 + 0.437));vec3 col = base + (richness * 0.6300) * ripple;
col = clamp(col, -10.0, 10.0);
col = 1./(1. + exp(-col * 4. + 0.25) * 7.5);
return clamp(col, 0.0, 1.0);
}mat2 rot(float a) {
return mat2(cos(a),-sin(a),sin(a),cos(a));
}vec3 hash3(vec2 p) {
vec3 q = vec3(dot(p,vec2(127.1,311.7)),
dot(p,vec2(269.5,183.3)),
dot(p,vec2(419.2,371.9)));
return fract(sin(q)*43758.5453);
}float voronoise(vec2 uv) {
float u = 1.;
float v = 1.;
vec2 drift = vec2(0, 0.0000 * uTime * 0.008);
vec2 skew = vec2(0.5000, 1.0 - 0.5000);vec2 x = (uv * skew * 2.) - drift * mix(1., 14., 0.1200) * 2.;
vec2 p = floor(x);
vec2 f = fract(x);
float k = 1.0 + 63.0 * pow(1.0-v,4.0);
float va = 0.0;
float wt = 0.0;
for( int j=-2; j<=2; j++ )
for( int i=-2; i<=2; i++ ) {
vec2 g = vec2( float(i),float(j) );
vec3 o = hash3( p + g ) * vec3(u,u,1.0);
o.xy += 0.5 * vec2(
sin(uTime * 0.1 + 0.0000 + o.x * 6.28),
cos(uTime * 0.1 + 0.0000 + o.y * 6.28)
);
vec2 r = g - f + o.xy;
float d = dot(r,r);
float ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(d)), k );
va += o.z*ww;
wt += ww;
}
return va / max(wt, 1e-5);
}
float getVoronoiNoise(vec2 uv) {
float turb = 0.5400 * 2.5;
float noise = voronoise(uv);
return mix(0.5, noise, turb);
}float getNoise(vec2 uv) {
return getVoronoiNoise(uv);
}void main() {
vec2 uv = vTextureCoord;
float aspectRatio = uResolution.x/uResolution.y;
vec2 aspect = vec2(aspectRatio, 1.0);vec2 mPos = vec2(0.5, 0.5) + mix(vec2(0), (uMousePos-0.5), 0.0000);vec2 pos = mix(vec2(0.5, 0.5), mPos, 0.0000);
float scale = mix(1., 14., 0.1200);
vec2 drift = vec2(0, 0.0000 * uTime * 0.0125);
mat2 rotation = rot(0.0000 * 2. * PI);vec2 st = (uv - pos) * aspect * scale * rotation;
float noise = getNoise(st);noise = getNoise(st);noise = smoothstep(noise - 0.5, noise + 0.5, 0.5000);vec4 color = texture(uTexture, uv);
vec4 bg = color;
float shift = 0.3100 + (1.0000 * uTime * 0.01);
vec3 noiseColor = anchoredPal(noise + shift, vec3(0.058823529411764705, 0.058823529411764705, 0.058823529411764705), vec3(1, 0.30196078431372547, 0));
color.rgb = noiseColor.rgb;float dither = (randFibo(gl_FragCoord.xy) - 0.5) / 255.0;
color.rgb += dither * 0.5;color.rgb = mix(bg.rgb, color.rgb, 1.0000);
color.a = max(bg.a, 1.0000);
color = clamp(color, 0.0, 1.0);
fragColor = color;}`
      ],
      compiledVertexShaders: [
        `#version 300 es
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}`
      ],
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "noise_fill"
    },
    {
      visible: true,
      layerType: "effect",
      type: "circle",
      trackMouse: 0.67,
      mouseMomentum: 1,
      animating: false,
      compiledFragmentShaders: [
        `#version 300 es
precision highp float;
in vec3 vVertexPosition;
in vec2 vTextureCoord;
uniform sampler2D uTexture;
uniform vec2 uMousePos;
uniform vec2 uResolution;
vec3 blend (int blendMode, vec3 src, vec3 dst) {
return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)), (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)), (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));
}out vec4 fragColor;mat2 rot(float a) {
return mat2(cos(a),-sin(a),sin(a),cos(a));
}float luma(vec3 color) {
return dot(color, vec3(0.299, 0.587, 0.114));
}
void main() {
vec2 uv = vTextureCoord;
vec4 bg = texture(uTexture, uv);
float lum = luma(bg.rgb);
float displacement = (lum - 0.5) * 0.3200 * 0.5;
vec2 aspectRatio = vec2(uResolution.x/uResolution.y, 1.0);
vec2 skew = vec2(max(0.5000, 0.001), max(1.0 - 0.5000, 0.001));
float halfRadius = 0.5840 * 0.5;
float falloffAmount = max(1.0000, 0.001);
float innerEdge = halfRadius - falloffAmount * halfRadius * 0.5;
float outerEdge = halfRadius + falloffAmount * halfRadius * 0.5;
vec2 pos = vec2(0.5, 0.5);pos += (uMousePos - 0.5) * 0.6700;
const float TWO_PI = 6.28318530718;
vec2 scaledUV = uv * aspectRatio * rot(0.0054 * TWO_PI) * skew;
vec2 scaledPos = pos * aspectRatio * rot(0.0054 * TWO_PI) * skew;
float radius = distance(scaledUV, scaledPos);
float falloff = smoothstep(innerEdge + displacement, outerEdge + displacement, radius);
falloff = (1.0 - falloff) * 0.8400;
vec3 circle = vec3(0, 0.7450980392156863, 0.9725490196078431) * falloff;vec3 blended = blend(5, vec3(0, 0.7450980392156863, 0.9725490196078431), bg.rgb);
circle = mix(bg.rgb, blended, falloff);
vec4 color = vec4(circle, max(bg.a, falloff));
fragColor = color;}`
      ],
      compiledVertexShaders: [
        `#version 300 es
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}`
      ],
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "circle"
    },
    {
      visible: true,
      layerType: "effect",
      type: "flowField",
      speed: 2.25,
      trackMouse: 0,
      animating: true,
      compiledFragmentShaders: [
        `#version 300 es
precision highp float;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform float uTime;uniform vec2 uMousePos;
uniform vec2 uResolution;float ease (int easingFunc, float t) {
return t;
}vec3 hash33(vec3 p3) {
p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
p3 += dot(p3, p3.yxz + 19.19);
return -1.0 + 2.0 * fract(vec3(
(p3.x + p3.y) * p3.z,
(p3.x + p3.z) * p3.y,
(p3.y + p3.z) * p3.x
));
}float perlin_noise(vec3 p) {
vec3 pi = floor(p);
vec3 pf = p - pi;vec3 w = pf * pf * (3.0 - 2.0 * pf);float n000 = dot(pf - vec3(0.0, 0.0, 0.0), hash33(pi + vec3(0.0, 0.0, 0.0)));
float n100 = dot(pf - vec3(1.0, 0.0, 0.0), hash33(pi + vec3(1.0, 0.0, 0.0)));
float n010 = dot(pf - vec3(0.0, 1.0, 0.0), hash33(pi + vec3(0.0, 1.0, 0.0)));
float n110 = dot(pf - vec3(1.0, 1.0, 0.0), hash33(pi + vec3(1.0, 1.0, 0.0)));
float n001 = dot(pf - vec3(0.0, 0.0, 1.0), hash33(pi + vec3(0.0, 0.0, 1.0)));
float n101 = dot(pf - vec3(1.0, 0.0, 1.0), hash33(pi + vec3(1.0, 0.0, 1.0)));
float n011 = dot(pf - vec3(0.0, 1.0, 1.0), hash33(pi + vec3(0.0, 1.0, 1.0)));
float n111 = dot(pf - vec3(1.0, 1.0, 1.0), hash33(pi + vec3(1.0, 1.0, 1.0)));float nx00 = mix(n000, n100, w.x);
float nx01 = mix(n001, n101, w.x);
float nx10 = mix(n010, n110, w.x);
float nx11 = mix(n011, n111, w.x);float nxy0 = mix(nx00, nx10, w.y);
float nxy1 = mix(nx01, nx11, w.y);float nxyz = mix(nxy0, nxy1, w.z);return nxyz;
}const int MAX_ITERATIONS = 8;
const float PI = 3.14159265359;vec2 flow (in vec2 st) {
float aspectRatio = uResolution.x / max(uResolution.y, 0.001);
vec2 aspectVec = vec2(aspectRatio, 1.);vec2 mPos = vec2(0.5017421602787456, 0.49163763066202093) + mix(vec2(0), (uMousePos-0.5), 0.0000);
float mixRadiusStep = step(1.0, 1.0000);
vec2 pos = mix(vec2(0.5017421602787456, 0.49163763066202093), mPos, mixRadiusStep);
float dist = ease(0, max(0.,1. - length(st * aspectVec - mPos * aspectVec) * 4. * (1. - 1.0000)));float sprd = (0.2000 + 0.01) / ((aspectRatio + 1.) / 2.);
float amt = (0.7200 * 2.0) * 0.01 * dist;
if(amt <= 0.) {
return st;
}vec2 invPos = 1. - pos;
float freq = 5. * sprd;
float t = 0.0000 * 5. + uTime * 0.0166;
float degrees = 360. * (0.5000 * 6.);
float rad = degrees * PI / 180.;for (int i = 0; i < MAX_ITERATIONS; i++) {
vec2 clampedSt = clamp(st, -1., 2.);
vec2 scaled = (clampedSt - 0.5) * aspectVec + invPos;
float perlin = perlin_noise(vec3((scaled - 0.5) * freq, t)) - 0.5;
float ang = perlin * rad;
st += vec2(cos(ang), sin(ang)) * amt;
}return clamp(st, 0., 1.);
}out vec4 fragColor;void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, mix(uv, flow(uv), 1.0000));
fragColor = color;}`
      ],
      compiledVertexShaders: [
        `#version 300 es
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}`
      ],
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "flow_field"
    },
    {
      visible: true,
      layerType: "effect",
      type: "grain",
      speed: 2.5,
      animating: true,
      compiledFragmentShaders: [
        `#version 300 es
precision highp float;
precision highp int;in vec3 vVertexPosition;
in vec2 vTextureCoord;uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uResolution;
vec3 blend (int blendMode, vec3 src, vec3 dst) {
return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)), (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)), (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));
}
uvec2 pcg2d(uvec2 v) {
v = v * 1664525u + 1013904223u;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
v ^= v >> 16;
v.x += v.y * v.y * 1664525u + 1013904223u;
v.y += v.x * v.x * 1664525u + 1013904223u;
return v;
}float randFibo(vec2 p) {
uvec2 v = floatBitsToUint(p);
v = pcg2d(v);
uint r = v.x ^ v.y;
return float(r) / float(0xffffffffu);
}out vec4 fragColor;void main() {
vec2 uv = vTextureCoord;
vec4 color = texture(uTexture, uv);if(color.a <= 0.001) {
fragColor = vec4(0);
return;
}vec2 st = uv;
vec3 grainRGB = vec3(0);st *= uResolution;float delta = fract((floor(uTime)/20.));if(1 == 1) {
grainRGB = vec3(
randFibo(st + vec2(1, 2) + delta),
randFibo(st + vec2(2, 3) + delta),
randFibo(st + vec2(3, 4) + delta)
);
} else {
grainRGB = vec3(randFibo(st + vec2(delta)));
}
color.rgb = mix(color.rgb, blend(5, grainRGB, color.rgb), 0.1300);
fragColor = color;}`
      ],
      compiledVertexShaders: [
        `#version 300 es
precision mediump float;in vec3 aVertexPosition;
in vec2 aTextureCoord;uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uTextureMatrix;out vec2 vTextureCoord;
out vec3 vVertexPosition;void main() {
gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
vTextureCoord = (uTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
}`
      ],
      data: { depth: false, uniforms: {}, isBackground: false },
      id: "grain"
    }
  ],
  options: { name: "Flow gradient", fps: 60, dpi: 1.5, scale: 1 },
  version: "2.0.4",
  id: "8vJHuObLYlYmAivRgROK"
}
