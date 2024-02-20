import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

interface Props {
  children: React.ReactNode;
}

export const Appear: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const sProps = useSpring({
    opacity: loading ? 0 : 1,
  });
  return <animated.div style={sProps}>{children}</animated.div>;
};
