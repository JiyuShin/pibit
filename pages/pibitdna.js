import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Center } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

const ModelContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f0;
`;

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('/dnakit7.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log('Available animations:', Object.keys(actions));

    // Configure all animations
    Object.values(actions).forEach((action) => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = 1; // back to normal speed
    });

    // Play animations after a 3-second delay
    const timer = setTimeout(() => {
      Object.values(actions).forEach((action) => {
        action.reset().play();
      });
    }, 3000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, [actions]);

  return <primitive object={scene} ref={group} scale={0.443} rotation={[Math.PI / 4, (2 * Math.PI) / 9, 0]} />;
}

export default function PibitDnaPage() {
  return (
    <ModelContainer>
      <Canvas camera={{ position: [0, 0, 35], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <Center position-y={-1.5} position-x={3}>
            <Model />
          </Center>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
} 