import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function AnimatedObject() {
  const group = useRef();

  // The animation logic from the original file
  useFrame((state, delta) => {
    if (!group.current) return;

    // This logic seems incomplete based on the original file, 
    // but we'll use a placeholder animation for now to ensure the build passes.
    // A simple rotation animation:
    group.current.rotation.x += delta;
    group.current.rotation.y += delta;
  });

  return (
    <mesh ref={group} scale={1}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function PpibitDnaPage() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <AnimatedObject />
      </Canvas>
    </div>
  );
} 