import { sharedUniforms } from './sharedUniforms';

export const gouraud = {
  uniforms: sharedUniforms,
  vertexShader: `
    uniform vec3 objectColor;

    // lighting uniforms for render equation
    uniform float k_a; // ambient reflection constant
    uniform float k_d; // diffuse reflection constant
    uniform float k_s; // specular reflection constant 
    uniform float alpha_s; // shininess

    varying vec3 vResultingColor;

    // function by THREEJS
    float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
      #if defined ( PHYSICALLY_CORRECT_LIGHTS )
          float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
          if( cutoffDistance > 0.0 ) {
              distanceFalloff *= pow2( clamp( 1.0 - pow4( lightDistance / cutoffDistance ), 0.0, 1.0 ) );
          }
          return distanceFalloff;
      #else
          if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
              return pow( clamp( -lightDistance / cutoffDistance + 1.0, 0.0, 1.0 ), decayExponent );
          }
          return 1.0;
      #endif
    }

    /**********************************/
    // DIRECTIONAL LIGHT CONTRIBUTION
    /**********************************/
    #if NUM_DIR_LIGHTS > 0
    struct DirectionalLight {
        vec3 direction;
        vec3 color;
    };
    uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

    vec3 CalcDirLight(DirectionalLight light, vec3 norm, vec3 fragPos, vec3 viewDir) {
      vec3 lightDir = normalize(light.direction);

      /************************/
      // ambient term
      /************************/
      vec3 ambient = k_a * light.color; // k_a * I_a

      /************************/
      // diffuse term
      /************************/
      float diff = max(dot(norm, lightDir), 0.0); // L_m . N
      vec3 diffuse = k_d * diff * light.color; // k_d * (L_m . N) * I_d

      /************************/
      // specular term
      /************************/
      vec3 reflectDir = reflect(-lightDir, norm);
      float spec = pow(max(dot(viewDir, reflectDir), 0.0), alpha_s);
      vec3 specular = k_s * spec * light.color; // k_s * (R . V)^alpha * I_s

      return (ambient + diffuse + specular);
    } 
    #endif 

    /**********************************/
    // SPOTLIGHT CONTRIBUTION
    /**********************************/
    #if NUM_SPOT_LIGHTS > 0
    struct SpotLight {
      vec3 direction;
      vec3 color;
      vec3 position;
      float decay;
      float penumbraCos;
      float coneCos;
      float distance;
    };
    uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

    vec3 CalcSpotLight(const in SpotLight spotLight, vec3 norm, vec3 fragPos, vec3 viewDir) {
        vec3 lVector = spotLight.position - fragPos;
        float lightDistance = length( lVector );
        vec3 lightDir = normalize(spotLight.position - fragPos);
        float angleCos = dot( lightDir, spotLight.direction );
        vec3 color = vec3( 0.0 );

        // check if fragment is hit by the spotlight and for how much
        if ( angleCos > spotLight.coneCos ) {
          float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
          color = spotLight.color;
          color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
        } else {
          color = vec3(0.0);
        }

        /************************/
        // ambient term
        /************************/
        vec3 ambient = k_a * color; // k_a * I_a
  
        /************************/
        // diffuse term
        /************************/
        float diff = max(dot(norm, lightDir), 0.0); // L_m . N
        vec3 diffuse = k_d * diff * color; // k_d * (L_m . N) * I_d
  
        /************************/
        // specular term
        /************************/
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), alpha_s);
        vec3 specular = k_s * spec * color; // k_s * (R . V)^alpha * I_s

        return (ambient + diffuse + specular);
    }
    #endif

    /**********************************/
    // POINTLIGHT CONTRIBUTION
    /**********************************/
    #if NUM_POINT_LIGHTS > 0
    struct PointLight {
        vec3 color;
        vec3 position;
        float decay;
        float distance;
    };
    uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

    vec3 CalcPointLight(PointLight pointLight, vec3 norm, vec3 fragPos, vec3 viewDir) {
        vec3 lVector = pointLight.position - fragPos;
        vec3 lightDir = normalize(lVector);

        float lightDistance = length( lVector );

        vec3 color = pointLight.color;
        color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );

        /************************/
        // ambient term
        /************************/
        vec3 ambient = k_a * color; // k_a * I_a
  
        /************************/
        // diffuse term
        /************************/
        float diff = max(dot(norm, lightDir), 0.0); // L_m . N
        vec3 diffuse = k_d * diff * color; // k_d * (L_m . N) * I_d
  
        /************************/
        // specular term
        /************************/
        vec3 reflectDir = reflect(-lightDir, norm);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), alpha_s);
        vec3 specular = k_s * spec * color; // k_s * (R . V)^alpha * I_s

        return (ambient + diffuse + specular);
    }
    #endif

    /**********************************/
    // MAIN FUNCTION START
    /**********************************/
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

      /**********************************/
      // GOURAUD SHADING
      // - calculate color per vertex
      //   and pass to fragment shader
      /**********************************/
      vec3 viewNormal = normalMatrix * normal;
      vec3 viewPosition = vec3(modelViewMatrix * vec4(position, 1.0));
      vec3 viewCamPos = vec3(viewMatrix * vec4(cameraPosition, 1.0));
      vec3 viewDir = normalize(viewCamPos - viewPosition);

      vec3 result = vec3(0.0, 0.0, 0.0);

      #if NUM_DIR_LIGHTS > 0
        for(int i = 0; i < NUM_DIR_LIGHTS; i++) {
          result += CalcDirLight(directionalLights[i], viewNormal, viewPosition, viewDir);
        }
      #endif

      #if NUM_SPOT_LIGHTS > 0
        for(int i = 0; i < NUM_SPOT_LIGHTS; i++) {
          result += CalcSpotLight(spotLights[i], viewNormal, viewPosition, viewDir);
        }
      #endif

      #if NUM_POINT_LIGHTS > 0
        for(int i = 0; i < NUM_POINT_LIGHTS; i++) {
          result += CalcPointLight(pointLights[i], viewNormal, viewPosition, viewDir);
        }
      #endif
      
      vResultingColor = result * objectColor;
    }
  `,

  fragmentShader: `
    varying vec3 vResultingColor;

    /**********************************/
    // MAIN FUNCTION START
    /**********************************/
    void main() {
      gl_FragColor = vec4(vResultingColor, 1.0);
    }
  `,
};
