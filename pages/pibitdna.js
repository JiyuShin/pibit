import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Center, SoftShadows } from '@react-three/drei';
import styled from 'styled-components';
import * as THREE from 'three';

const BackgroundContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('/introbk.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const ModelContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

function DnaStickModel() {
  const group = useRef();
  const { scene } = useGLTF('/dnastick.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 0;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    let isFading = false;
    scene.traverse(child => {
        if (child.isMesh && child.material.opacity < 1) {
            isFading = true;
            child.material.opacity = Math.min(child.material.opacity + delta * 3, 1);
        }
    });

    if (isFading) return;

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
    const targetScale = 5.789124; // 5.26284 * 1.1
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

function RecModel() {
  const group = useRef();
  const { scene } = useGLTF('/rec.glb');

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 'lightblue',
          transparent: true,
          opacity: 0,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    let isFading = false;
    scene.traverse(child => {
        if (child.isMesh && child.material.opacity < 1) {
            isFading = true;
            child.material.opacity = Math.min(child.material.opacity + delta * 3, 1);
        }
    });

    if (isFading) return;

    // Animate X-axis rotation
    const targetRotationX = -Math.PI / 6; // -30 degrees
    if (group.current.rotation.x > targetRotationX) {
      group.current.rotation.x = Math.max(group.current.rotation.x - delta, targetRotationX);
    }

    // Animate Z-axis rotation for tilting left
    const targetRotationZ = (5 * Math.PI) / 180; // 5 degrees
    if (group.current.rotation.z < targetRotationZ) {
      group.current.rotation.z = Math.min(group.current.rotation.z + delta, targetRotationZ);
    }

    // Animate scale
    const targetScale = 1.7367372; // 1.578852 * 1.1
    if (group.current.scale.x < targetScale) {
      const newScale = group.current.scale.x + targetScale * delta;
      group.current.scale.set(Math.min(newScale, targetScale), Math.min(newScale, targetScale), Math.min(newScale, targetScale));
    }
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
    scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.emissive = new THREE.Color('white');
        child.material.emissiveIntensity = 0.15;

        if (child.material.color) {
          const color = child.material.color;
          const hsl = {};
          color.getHSL(hsl);
          color.setHSL(hsl.h, Math.min(hsl.s * 1.3, 1), hsl.l);
        }
      }
    });
  }, [scene]);

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

    return () => {
      clearTimeout(timer);
    };
  }, [actions, mixer]);

  useFrame((state, delta) => {
    if (isOpening && group.current) {
      const targetScale = 0.4873 * 1.2; // (0.443 * 1.1) * 1.2
      if (group.current.scale.x < targetScale) {
        const newScale = group.current.scale.x + 0.4873 * 0.2 * delta; // Animate over ~1 second
        const finalScale = Math.min(newScale, targetScale);
        group.current.scale.set(finalScale, finalScale, finalScale);
      }
    }
  });

  return <primitive object={scene} ref={group} scale={0.4873} />;
}

export default function PibitDnaPage() {
  const [stickVisible, setStickVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStickVisible(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ModelContainer>
      <BackgroundContainer />
      <Canvas shadows camera={{ position: [0, 0, 35], fov: 50 }}>
        <SoftShadows size={25} samples={10} focus={0} />
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight
            castShadow
            position={[10, 15, 5]}
            intensity={2.5}
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-20}
            shadow-camera-right={20}
            shadow-camera-top={20}
            shadow-camera-bottom={-20}
          />
          <group rotation={[Math.PI / 4, (2 * Math.PI) / 9, 0]} position={[0, 0, 0]} scale={1.00602}>
            <group position={[0, 4, 0]}>
              <Center>
                <Model />
              </Center>
            </group>
            {stickVisible && (
              <>
                <group position={[-4.1, 5.5, -6]}>
                  <DnaStickModel />
                </group>
                <group position={[1.4, 7.5, 5]}>
                  <RecModel />
                </group>
              </>
            )}
          </group>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </ModelContainer>
  );
} 