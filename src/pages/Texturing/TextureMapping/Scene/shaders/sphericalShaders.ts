export const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
      vUv = uv; 
      vPos = vec3(modelMatrix * vec4(position, 1.0));
      
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
  }
`;

export const fragmentShader = `

    uniform bool xAxis;
    uniform bool yAxis;
    uniform bool zAxis;

    uniform float sphereRadius;
    uniform vec3 spherePosition;
    uniform mat4 sphereRotation;

    varying vec2 vUv;
    varying vec3 vPos;

    uniform sampler2D myTex;

    #define TWOPI 6.28318530718
    #define PI 3.14159265359

    vec4 defaultColor = vec4(0.8, 0.8, 0.8, 1.0);

    void main() {
        vec3 textureCenter = spherePosition;
        float textureRadius = sphereRadius;
        vec3 center = vec3(0.0, 0.0, 0.0);

        if(length(vPos - textureCenter) < textureRadius) {
          if(xAxis) {
            // ray direction
            vec3 rd = normalize(vPos - center);
            // ray origin
            vec3 ro = vPos - (rd * 2.0 * textureRadius);
    
            // center of texture sphere
            vec3 s = textureCenter;
            // radius of the texture sphere
            float r = textureRadius;
    
            float t = dot(s - ro, rd);
            vec3 p = ro + rd * t;
    
            float y = length(s-p);
    
            vec3 pointOnTextureSphere;
    
            if(y < r) {
                float x = sqrt(r*r - y*y);
                float t1 = t-x;
                float t2 = t+x;
    
                vec3 p1 = ro + rd * t1;
                vec3 p2 = ro + rd * t2;
    
                vec3 objToP1 = p1 - center;
                vec3 objToP2 = p2 - center;
    
                // less than 90 deg apart => ~same direction
                if(dot(objToP1, rd) > 0.0) {
                  pointOnTextureSphere = p1;
                } else {
                  pointOnTextureSphere = p2;
                }
            }
    
            // ray from center of texture to the where it should sample
            vec3 ray = normalize(s - pointOnTextureSphere);
            
            vec4 textureSamplerRay = sphereRotation * vec4(ray, 1.0);
    
            float u = 0.5 + ( atan( textureSamplerRay.x, textureSamplerRay.z ) / TWOPI );
            float v = 0.5 - ( asin( textureSamplerRay.y ) / PI );
    
            vec4 texelColor = texture2D( myTex, vec2(u, v));
            gl_FragColor = texelColor;
          }
        } else {
            gl_FragColor = defaultColor;
        }
    }
    `;
