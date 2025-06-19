import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Center } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: -1;
`;

const EllipseBase = styled.div`
  position: absolute;
  border-radius: 50%;
`;

const Ellipse26 = styled(EllipseBase)`
  width: 669px;
  height: 669px;
  left: -167px;
  top: -159px;
  background: linear-gradient(180deg, #CBDFFA 0%, #FFFFFF 100%);
  filter: blur(65px);
`;

const Ellipse29 = styled(EllipseBase)`
  width: 263px;
  height: 263px;
  left: 1163px;
  top: 443px;
  background: #DFDEF1;
  filter: blur(60px);
`;

const Ellipse32 = styled(EllipseBase)`
  width: 530px;
  height: 530px;
  left: 765px;
  top: 717px;
  background: #EDF2FC;
  filter: blur(60px);
`;

const Ellipse31 = styled(EllipseBase)`
  width: 384px;
  height: 384px;
  left: 48px;
  top: 683px;
  background: #E2D5E9;
  filter: blur(65px);
`;

const Ellipse33 = styled(EllipseBase)`
  width: 469px;
  height: 469px;
  left: -209px;
  top: 598px;
  background: #E2D5E9;
  filter: blur(65px);
`;

const Ellipse28 = styled(EllipseBase)`
  width: 480px;
  height: 480px;
  left: 1102px;
  top: 587px;
  background: linear-gradient(132.87deg, #F5B4E0 0%, #CBDFFA 104%);
  filter: blur(100px);
`;

const Ellipse30 = styled(EllipseBase)`
  width: 369px;
  height: 369px;
  left: 756px;
  top: -206px;
  background: #F6F7FC;
  filter: blur(65px);
`;

const ModelContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function DnaStickModel() {
  const group = useRef();
  const { scene } = useGLTF('/dnastick.glb');

  // No longer setting transparency on mount
  useEffect(() => {
    // Optional: Log material names if needed for future debugging.
    scene.traverse((child) => {
      if (child.isMesh) {
        console.log(`DnaStickModel material found: '${child.material.name}'`);
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Animate X-axis rotation
    const targetRotationX = -Math.PI / 6; // -30 degrees
    if (group.current.rotation.x > targetRotationX) {
      group.current.rotation.x = Math.max(group.current.rotation.x - delta, targetRotationX);
    }

    // Animate Z-axis rotation for tilting left
    const targetRotationZ = (12 * Math.PI) / 180; // 12 degrees
    if (group.current.rotation.z < targetRotationZ) {
      group.current.rotation.z = Math.min(group.current.rotation.z + delta, targetRotationZ);
    }

    // Animate scale
    const targetScale = 5.26284; // 3.50856 * 1.5
    if (group.current.scale.x < targetScale) {
      const newScale = group.current.scale.x + targetScale * delta;
      group.current.scale.set(Math.min(newScale, targetScale), Math.min(newScale, targetScale), Math.min(newScale, targetScale));
    }
    // Opacity animation is removed.
  });

  return (
    <group ref={group} scale={0.001}>
      <primitive object={scene} />
    </group>
  );
}

function Model() {
  const group = useRef();
  const { scene, animations } = useGLTF('/dnakit7.glb');
  const { actions, mixer } = useAnimations(animations, group);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const allActions = Object.values(actions);
    if (allActions.length === 0) return;
    allActions.forEach((action) => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = 1;
    });
    const timer = setTimeout(() => {
      allActions.forEach((action) => action.reset().play());
      setIsOpening(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, [actions, mixer]);

  useFrame((state, delta) => {
    if (isOpening && group.current) {
      const targetScale = 0.443 * 1.2; // 20% larger
      if (group.current.scale.x < targetScale) {
        const newScale = group.current.scale.x + 0.443 * 0.2 * delta; // Animate over ~1 second
        const finalScale = Math.min(newScale, targetScale);
        group.current.scale.set(finalScale, finalScale, finalScale);
      }
    }
  });

  return <primitive object={scene} ref={group} scale={0.443} />;
}

export default function PibitDnaPage() {
  const [stickVisible, setStickVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStickVisible(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModelContainer>
      <BackgroundContainer>
        <Ellipse26 />
        <Ellipse29 />
        <Ellipse32 />
        <Ellipse31 />
        <Ellipse33 />
        <Ellipse28 />
        <Ellipse30 />
      </BackgroundContainer>
      <Canvas camera={{ position: [0, 0, 35], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={2.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <group rotation={[Math.PI / 4, (2 * Math.PI) / 9, 0]} position={[4, 2, 0]} scale={0.729}>
            <Center>
              <Model />
            </Center>
            {stickVisible && (
              <group position={[-5.6, 5.5, -4]}>
                <DnaStickModel />
              </group>
            )}
          </group>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
} 