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

    uniform float cylinderRadius;
    uniform float cylinderHeight;
    uniform vec3 cylinderPosition;

    varying vec2 vUv;
    varying vec3 vPos;

    uniform sampler2D myTex;

    // Dot Product
    // If ratio = 0, the vectors are 90 degrees apart (orthogonal or perpendicular).
    // If ratio < 0, the vectors are more than 90 degrees apart.
    // If ratio > 0, the vectors are less than 90 degrees apart.

    void main() {

        vec4 defaultColor = vec4(0.8, 0.8, 0.8, 1.0);

        if(xAxis) {
          float cylinderTop = cylinderPosition.y + cylinderHeight / 2.0;
          float cylinderBottom = cylinderPosition.y - cylinderHeight / 2.0;
          if(vPos.y > cylinderBottom && vPos.y < cylinderTop ) {
            vec3 cylinderCenter = cylinderPosition;
            vec3 myObjectCenter = vec3(0.0, 0.0, 0.0);

            vec2 rd = normalize(vPos.xz - myObjectCenter.xz);
            vec2 ro = vPos.xz - (rd * 2.0 * cylinderRadius);

            vec2 s = cylinderCenter.xz;
            float r = cylinderRadius;

            float t = dot(s - ro, rd);
            vec2 p = ro + rd * t;

            float y = length(s-p);

            vec2 pointOnCylinder;

            if(y < r) {
              float x = sqrt(r*r - y*y);
              float t1 = t-x;
              float t2 = t+x;

              vec2 p1 = ro + rd * t1;
              vec2 p2 = ro + rd * t2;

              vec2 objToP1 = p1 - myObjectCenter.xz;
              vec2 objToP2 = p2 - myObjectCenter.xz;

              // less than 90 deg apart => ~same direction
              if(dot(objToP1, rd) > 0.0) {
                pointOnCylinder = p1;
              } else {
                pointOnCylinder = p2;
              }
            }

            vec3 centerToPosVec = vec3(pointOnCylinder.x, 0.0, pointOnCylinder.y) - cylinderCenter;
            vec3 testVector = vec3(0, 0, 1);
            
            vec3 cylinderUp = vec3(0.0, 1.0, 0.0);
            vec3 c = cross(normalize(centerToPosVec), testVector);
            float dir = dot(c, cylinderUp);
    
            float ratio = dot(normalize(centerToPosVec.xz), vec2(0.0, 1.0));
            float rad = acos(ratio);
            float deg = degrees(rad);
    
            if(dir > 0.0) {
                deg = 360.0 - deg;
            }
            
            float u = deg / 360.0;

            float y_part = cylinderTop - vPos.y;
            float y_uv = cylinderHeight - y_part;
        
            vec4 texelColor = texture2D( myTex, vec2(u, y_uv / cylinderHeight));
            gl_FragColor = texelColor;
          } else {
              gl_FragColor = defaultColor;
          }
        }

        if(yAxis) {
          float cylinderTop = cylinderPosition.x + cylinderHeight / 2.0;
          float cylinderBottom = cylinderPosition.x - cylinderHeight / 2.0;

          if(vPos.x > cylinderBottom && vPos.x < cylinderTop ) {
            vec3 cylinderCenter = cylinderPosition;
            vec3 myObjectCenter = vec3(0.0, 0.0, 0.0);

            vec2 rd = normalize(vPos.yz - myObjectCenter.yz);
            vec2 ro = vPos.yz - (rd * 2.0 * cylinderRadius);

            vec2 s = cylinderCenter.yz;
            float r = cylinderRadius;

            float t = dot(s - ro, rd);
            vec2 p = ro + rd * t;

            float y = length(s-p);

            vec2 pointOnCylinder;

            if(y < r) {
              float x = sqrt(r*r - y*y);
              float t1 = t-x;
              float t2 = t+x;

              vec2 p1 = ro + rd * t1;
              vec2 p2 = ro + rd * t2;

              vec2 objToP1 = p1 - myObjectCenter.yz;
              vec2 objToP2 = p2 - myObjectCenter.yz;

              // less than 90 deg apart => ~same direction
              if(dot(objToP1, rd) > 0.0) {
                pointOnCylinder = p1;
              } else {
                pointOnCylinder = p2;
              }
            }

            vec3 centerToPosVec = vec3(0.0, pointOnCylinder.x, pointOnCylinder.y) - cylinderCenter;
            vec3 testVector = vec3(0, 0, 1);
            
            vec3 cylinderUp = vec3(1.0, 0.0, 0.0);
            vec3 c = cross(normalize(centerToPosVec), testVector);
            float dir = dot(c, cylinderUp);
    
            float ratio = dot(normalize(centerToPosVec.yz), vec2(0.0, 1.0));
            float rad = acos(ratio);
            float deg = degrees(rad);
    
            if(dir > 0.0) {
                deg = 360.0 - deg;
            }
            
            float u = deg / 360.0;

            float y_part = cylinderTop - vPos.x;
            float y_uv = cylinderHeight - y_part;
        
            vec4 texelColor = texture2D( myTex, vec2(u, y_uv / cylinderHeight));
            gl_FragColor = texelColor;
          } else {
              gl_FragColor = defaultColor;
          }
        }

        if(zAxis) {
          float cylinderTop = cylinderPosition.z + cylinderHeight / 2.0;
          float cylinderBottom = cylinderPosition.z - cylinderHeight / 2.0;

          if(vPos.z > cylinderBottom && vPos.z < cylinderTop ) {
            vec3 cylinderCenter = cylinderPosition;
            vec3 myObjectCenter = vec3(0.0, 0.0, 0.0);

            vec2 rd = normalize(vPos.xy - myObjectCenter.xy);
            vec2 ro = vPos.xy - (rd * 2.0 * cylinderRadius);

            vec2 s = cylinderCenter.xy;
            float r = cylinderRadius;

            float t = dot(s - ro, rd);
            vec2 p = ro + rd * t;

            float y = length(s-p);

            vec2 pointOnCylinder;

            if(y < r) {
              float x = sqrt(r*r - y*y);
              float t1 = t-x;
              float t2 = t+x;

              vec2 p1 = ro + rd * t1;
              vec2 p2 = ro + rd * t2;

              vec2 objToP1 = p1 - myObjectCenter.xy;
              vec2 objToP2 = p2 - myObjectCenter.xy;

              // less than 90 deg apart => ~same direction
              if(dot(objToP1, rd) > 0.0) {
                pointOnCylinder = p1;
              } else {
                pointOnCylinder = p2;
              }
            }

            vec3 centerToPosVec = vec3(pointOnCylinder.x, pointOnCylinder.y, 0.0) - cylinderCenter;
            vec3 testVector = vec3(0, 1, 0);
            
            vec3 cylinderUp = vec3(0.0, 0.0, 1.0);
            vec3 c = cross(normalize(centerToPosVec), testVector);
            float dir = dot(c, cylinderUp);
    
            float ratio = dot(normalize(centerToPosVec.xy), vec2(0.0, 1.0));
            float rad = acos(ratio);
            float deg = degrees(rad);
    
            if(dir > 0.0) {
                deg = 360.0 - deg;
            }
            
            float u = deg / 360.0;

            float y_part = cylinderTop - vPos.z;
            float y_uv = cylinderHeight - y_part;
        
            vec4 texelColor = texture2D( myTex, vec2(u, y_uv / cylinderHeight));
            gl_FragColor = texelColor;
          } else {
              gl_FragColor = defaultColor;
          }
        }
    }
    `;

// vec3 rayDir = vPos - myObjectCenter;
// vec3 rayOrigin = vPos - (normalize(rayDir) *  cylinderRadius);

// vec3 L = cylinderCenter - rayOrigin;

// float tca = dot(L, rayDir);

// float d2 = dot(L, L) - tca * tca;

// if(d2 > (cylinderRadius * cylinderRadius)) {
//   return;
// }

// float thc = sqrt((cylinderRadius * cylinderRadius) - d2);

// float t0 = tca - thc;
// float t1 = tca + thc;

// vec3 inter1 = rayDir * t0;
// vec3 inter2 = rayDir * t1;

// vec3 cylinderToIntersection1 = inter1 - cylinderPosition;
// vec3 cylinderToIntersection2 = inter2 - cylinderPosition;
// vec3 centerToPosVec = cylinderToIntersection2;
