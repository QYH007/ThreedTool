import { Typography } from '@material-ui/core';
import { Html } from '@react-three/drei';
import React from 'react';

/**
 * A Loading Text
 */
const LoadingSphere: React.FC = () => {
  return (
    <Html>
      <div style={{ color: 'white', transform: 'translate3d(-50%,-50%,0)', textAlign: 'center' }}>
        <Typography variant="h3">Loading...</Typography>
      </div>
    </Html>
  );
};

export default LoadingSphere;
