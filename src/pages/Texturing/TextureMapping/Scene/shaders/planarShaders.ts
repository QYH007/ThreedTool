export const planar = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;

    void main() {
        vUv = uv; 
        vPos = vec3(modelMatrix * vec4(position, 1.0));
        

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
    }
    `,

  fragmentShader: `
    uniform vec3 topRight;
    uniform vec3 bottomLeft; 

    uniform bool xAxis;
    uniform bool yAxis;
    uniform bool zAxis;   

    varying vec2 vUv;
    varying vec3 vPos;

    uniform sampler2D myTex;

    void main() {

        vec4 defaultColor = vec4(0.8,0.8,0.8, 1.0);

        if(xAxis) {
            float width = abs(topRight.x - bottomLeft.x);
            float height = abs(topRight.y - bottomLeft.y);
            if(vPos.x > bottomLeft.x && vPos.x < topRight.x && vPos.y > bottomLeft.y && vPos.y < topRight.y ) {
                float x_part = topRight.x - vPos.x;
                float x_uv = width - x_part;
    
                float y_part = topRight.y - vPos.y;
                float y_uv = height - y_part;
    
                vec4 texelColor = texture2D( myTex, vec2(x_uv/width, y_uv/height));
                gl_FragColor = texelColor;
            } else {
                gl_FragColor = defaultColor;
            }
        }

        if(yAxis) {
            float width = abs(topRight.z - bottomLeft.z);
            float height = abs(topRight.y - bottomLeft.y);
    
            if(vPos.z > topRight.z && vPos.z < bottomLeft.z && vPos.y > bottomLeft.y && vPos.y < topRight.y ) {
                float x_part = abs(topRight.z - vPos.z);
                float x_uv = width - x_part;
    
                float y_part = abs(topRight.y - vPos.y);
                float y_uv = height - y_part;
    
                vec4 texelColor = texture2D( myTex, vec2(x_uv/width, y_uv/height));
                gl_FragColor = texelColor;
            } else {
                gl_FragColor = defaultColor;
            }
        } 

        if(zAxis) {
            float width = abs(topRight.z - bottomLeft.z);
            float height = abs(topRight.x - bottomLeft.x);
    
            if(vPos.z > topRight.z && vPos.z < bottomLeft.z && vPos.x > bottomLeft.x && vPos.x < topRight.x ) {
                float x_part = abs(topRight.z - vPos.z);
                float x_uv = width - x_part;
    
                float y_part = abs(topRight.x - vPos.x);
                float y_uv = height - y_part;
    
                vec4 texelColor = texture2D( myTex, vec2(x_uv/width, y_uv/height));
                gl_FragColor = texelColor;
            } else {
                gl_FragColor = defaultColor;
            }
        } 

        
    }
    `,
};
