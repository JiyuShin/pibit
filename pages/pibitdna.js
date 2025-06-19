import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations, Center, SoftShadows } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import * as THREE from 'three';
import { useSpring, a } from '@react-spring/three';
import { useRouter } from 'next/router';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const InitialTextsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  animation: ${props => (props.visible ? fadeIn : fadeOut)} 0.5s ease-out forwards;
`;

const TitleText = styled.div`
  position: absolute;
  width: 1461px;
  height: 174px;
  left: 262px;
  top: 29px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 55px;
  line-height: 70px;
  color: #B5B6FF;
`;

const InstructionText = styled.div`
  position: absolute;
  width: 498px;
  height: 60px;
  left: 536px;
  top: 116px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #B5B6FF;
`;

const UIElementsContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;

  & > * {
    pointer-events: auto;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 274px;
  height: 70px;
  left: 619px;
  top: 718px;
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.6);
  }

  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 25px;
  line-height: 30px;
  text-align: center;
  color: #B5AECA;
`;

const PIBITCompany = styled.div`
  position: absolute;
  width: 458px;
  height: 43px;
  left: calc(50% - 458px/2 + 658px);
  top: 952px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  line-height: 20px;
  text-align: center;
  color: #B5AECA;

  .at-symbol {
    position: absolute;
    left: calc(50% - 458px/2 + 733px - (50% - 458px/2 + 658px));
    top: -2px;
  }
`;

const Ellipse = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 18px;
  height: 18px;
  left: 1480px;
  top: 953px;
  border: 2px solid #B5AECA;
`;

const JourneyText = styled.div`
  position: absolute;
  width: 1086px;
  height: 43px;
  left: calc(50% - 1086px/2 - 197px);
  top: 950px;
  font-family: 'Pretendard Variable';
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 20px;
  color: #B5AECA;
`;

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

function AnimatedModel({ onAnimationStart }) {
  const { scene, animations } = useGLTF('/dnakit7.glb');
  const { actions } = useAnimations(animations, scene);
  const [isOpening, setIsOpening] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position animation for the whole group
  const [groupProps, setGroupApi] = useSpring(() => ({
    from: { position: [0, -10, 0] },
    to: { position: [0, 4, 0] },
    config: { mass: 1, tension: 20, friction: 20 },
  }));

  useEffect(() => {
    scene.traverse(child => {
      if (child.isMesh) {
        child.material = child.material.clone();
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

  const handleClick = () => {
    if (hasStarted) return; // Prevent multiple triggers

    const allActions = Object.values(actions);
    if (allActions.length === 0) return;

    allActions.forEach((action) => {
      action.setLoop(THREE.LoopOnce);
      action.clampWhenFinished = true;
      action.timeScale = 1;
      action.reset().play();
    });
    setIsOpening(true);
    setHasStarted(true);
    if (onAnimationStart) {
      onAnimationStart();
    }
  };

  // Scaling Animation (after opening starts)
  const [scaleProps] = useSpring(() => ({
    scale: isOpening ? 0.4873 * 1.2 : (isHovered ? 0.4873 * 1.05 : 0.4873),
    config: { mass: 1, tension: 170, friction: 26 }
  }), [isOpening, isHovered]);

  return (
    <a.group position={groupProps.position}>
      <Center>
        <a.primitive
          object={scene}
          scale={scaleProps.scale}
          onClick={handleClick}
          onPointerOver={() => setIsHovered(true)}
          onPointerOut={() => setIsHovered(false)}
        />
      </Center>
    </a.group>
  );
}

export default function PibitDnaPage() {
  const [stickVisible, setStickVisible] = useState(false);
  const [initialTextsVisible, setInitialTextsVisible] = useState(true);
  const [uiVisible, setUiVisible] = useState(false);
  const router = useRouter();

  const handleAnimationStart = () => {
    setInitialTextsVisible(false);
    setTimeout(() => {
      setStickVisible(true);
      setUiVisible(true);
    }, 1400); // Delay after box opening animation starts
  };

  return (
    <ModelContainer>
      <BackgroundContainer />
      <InitialTextsContainer visible={initialTextsVisible}>
          <TitleText>YOUR PIBIT DNA TESTER HAS ARRIVED!</TitleText>
          <InstructionText>
            감정유형 탐색을 시작하기 전 정확한 검사를 진행하기 위해<br/>
            DNA 검사 키트가 도착했어요! 시작하시려면 키트를 눌러주세요!
          </InstructionText>
        </InitialTextsContainer>
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
            <AnimatedModel onAnimationStart={handleAnimationStart} />
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
      {uiVisible && (
        <UIElementsContainer>
          <Button onClick={() => router.push('/pibitcontext')}>검사결과 전송하기</Button>
          <PIBITCompany>
            PIBITCOMPANY <span className="at-symbol">ⓐ</span>
          </PIBITCompany>
          <Ellipse />
          <JourneyText>Journey to create habit-caretaker companion pibit</JourneyText>
        </UIElementsContainer>
      )}
    </ModelContainer>
  );
} 