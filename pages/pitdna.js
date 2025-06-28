import React, { useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

function AnimatedModel({ onAnimationStart }) {
  const group = useRef();
  const { scene, animations } = useGLTF('/dnakit28.glb');
  const { actions } = useAnimations(animations, scene);
  const [isOpening, setIsOpening] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // ... existing code ...
}

export default AnimatedModel; 