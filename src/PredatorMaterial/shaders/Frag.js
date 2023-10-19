export default /* glsl */ ` 
// based on: https://www.shadertoy.com/view/wlKfzc

float fadeTimer = 0.0;
uniform float gridWidth;
uniform float gridHeight;
uniform float uTime;
uniform float uProgress;
varying vec3 csm_vPosition;
varying vec2 vUv;

              
void main() {

  fadeTimer = 1.3 * uProgress;

  vec4 outcol;
  
  vec2 posI =  vec2(vUv.x * gridWidth * 3.0, vUv.y * gridHeight * 3.0);
  
  vec2 finalPos = mod(posI,2.) - vec2(1.0,2.0);
  float size;
  
  posI = vec2(floor(posI.x/2.0)/gridWidth,floor(posI.y/2.0)/gridHeight);
  
  size = clamp(pow(fadeTimer + posI.y ,3.5), 0.0, 20.5);

  size = abs(size * uProgress);
  
  outcol = csm_DiffuseColor;
  
  if(abs(finalPos.x + 0.25) + abs(finalPos.y ) < size){
      outcol =  vec4(0.9);
      csm_Roughness =  max(pow(sin(uProgress * 15. + uTime * 2.0 + dot(vNormal.y, 10.5 )), 2.), .6);
      csm_Metalness = 0.003;
  }

  vec4 finalColor = mix(csm_DiffuseColor, outcol , 1.0);
  csm_DiffuseColor = vec4(finalColor.rgb, 1.0);
}

`
