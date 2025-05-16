import { useEffect, useState, useRef, Suspense, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Text3D, PresentationControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const float = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(3px, -3px) rotate(2deg); }
  50% { transform: translate(0, 0) rotate(0deg); }
  75% { transform: translate(-3px, 3px) rotate(-2deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const drift = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(50px, -50px); }
  100% { transform: translate(0, 0); }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const spread = keyframes`
  0% { 
    transform: translate(0, 0) scale(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% { 
    transform: translate(${props => props.x}px, ${props => props.y}px) scale(1);
    opacity: 0;
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(2); }
`;

const puffAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const baseAnimation = props => css`
  ${float} ${props.duration}s ease-in-out infinite,
  ${twinkle} ${props.duration * 1.5}s ease-in-out infinite,
  ${drift} 15s ease-in-out infinite
`;

const pulseAnimation = css`
  ${pulse} 2s ease-in-out infinite
`;

const Star = styled.div`
  position: absolute;
  width: ${props => props.size || '0.008px'};
  height: ${props => props.size || '0.008px'};
  background: ${props => props.color || '#4fc3f7'};
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${props => props.isPulsing ? css`${baseAnimation(props)}, ${pulseAnimation}` : baseAnimation(props)};
  animation-delay: ${props => props.delay || '0s'};
  z-index: 0;
  will-change: transform, opacity;
  transition: all 0.3s ease;
`;

const Hero = styled.div`
  text-align: center;
  padding: 0;
  background: linear-gradient(-45deg, #e0f7fa, #fff5e6, #e0f7fa, #fff5e6);
  background-size: 400% 400%;
  animation: ${gradient} 15s ease infinite;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FloatingShape = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.left}%;
  bottom: ${props => props.bottom}%;
  transform: translate(-50%, 50%);
  animation: float ${props => props.duration}s ease-in-out infinite;
  z-index: ${props => props.zIndex};

  @keyframes float {
    0%, 100% {
      transform: translate(-50%, 50%) translateY(0) rotate(0deg);
    }
    25% {
      transform: translate(-50%, 50%) translateY(-10px) rotate(5deg);
    }
    50% {
      transform: translate(-50%, 50%) translateY(0) rotate(0deg);
    }
    75% {
      transform: translate(-50%, 50%) translateY(10px) rotate(-5deg);
    }
  }
`;

const bigHorizontalFloat = keyframes`
  0% { transform: translateX(-120px); }
  50% { transform: translateX(120px); }
  100% { transform: translateX(-120px); }
`;

const ImageShape = styled.img`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  /* animation: ${float} ${props => props.duration}s infinite; */
  transition: transform 0.1s ease;
  cursor: pointer;
  bottom: ${props => props.bottom}px;
  left: ${props => props.left}%;
  transform-origin: center;
  object-fit: contain;
  background: transparent;
  border: none;
  z-index: ${props => props.zIndex};
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 100;
  padding: 2rem;
  margin-top: -105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const PageTransition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  
  &.active {
    opacity: 1;
    pointer-events: auto;
  }
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  background: #4fc3f7;
  border-radius: 50%;
  margin: 0 4px;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease;
  
  ${PageTransition}.active & {
    opacity: 1;
    transform: scale(1);
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  opacity: 0;
  transform: translate(0, 0);
  transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;

  &.active {
    opacity: 1;
    transform: translate(
      ${props => props.targetX}px,
      ${props => props.targetY}px
    );
  }
`;

const TextWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const fabricTexture = keyframes`
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
`;

const pastelColors = [
  '#8BB8E1', // 민트
  '#F7A8C9', // 핑크
  '#F7F6A8', // 노랑
  '#C6B8E1', // 보라
  // '#000000', // 검정 (제외)
];

const HeroTitle = styled.h1`
  font-size: 17.81rem;
  font-weight: 800;
  font-family: 'Fredoka One', 'Baloo 2', system-ui;
  margin: -100px 0 -70px 0;
  color: ${({ $furry, $color }) => ($furry ? $color : '#f5e6d3')};
  position: relative;
  cursor: pointer;
  transition: 
    color 0.3s, 
    text-shadow 0.3s, 
    filter 0.3s, 
    background 0.3s;
  overflow: visible;
  text-align: center;
  z-index: 1;
  text-shadow: ${({ $furry, $color }) =>
    $furry
      ? `
        0 2px 8px ${$color},
        0 0px 16px #fff8,
        0 0px 32px ${$color}99
      `
      : `
        1px 1px 1px rgba(0,0,0,0.05),
        2px 2px 1px rgba(0,0,0,0.05),
        3px 3px 1px rgba(0,0,0,0.05),
        4px 4px 2px rgba(0,0,0,0.05),
        5px 5px 2px rgba(0,0,0,0.05),
        6px 6px 2px rgba(0,0,0,0.05),
        7px 7px 2px rgba(0,0,0,0.05),
        8px 8px 3px rgba(0,0,0,0.05),
        9px 9px 3px rgba(0,0,0,0.05),
        10px 10px 20px rgba(0,0,0,0.15)
      `};
  background: ${({ $furry, $color }) =>
    $furry
      ? `radial-gradient(circle at 40% 40%, ${$color} 60%, #fff0 100%)`
      : 'none'};
  filter: ${({ $furry }) => ($furry ? 'blur(0.5px) contrast(1.2)' : 'none')};

  &:hover {
    transform: translateY(-2px) scale(1.01);
    text-shadow: 
      1px 1px 1px rgba(0,0,0,0.05),
      2px 2px 1px rgba(0,0,0,0.05),
      3px 3px 1px rgba(0,0,0,0.05),
      4px 4px 2px rgba(0,0,0,0.05),
      5px 5px 2px rgba(0,0,0,0.05),
      6px 6px 2px rgba(0,0,0,0.05),
      7px 7px 2px rgba(0,0,0,0.05),
      8px 8px 3px rgba(0,0,0,0.05),
      9px 9px 3px rgba(0,0,0,0.05),
      12px 12px 25px rgba(0,0,0,0.2);
  }
`;

const subtitleGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  font-weight: 600;
  margin-top: -20px;
  margin-bottom: 30px;
  
  background: linear-gradient(
    135deg,
    #a0a0a0 0%,
    #a0a0a0 20%,
    #4a148c 35%,
    #a0a0a0 50%,
    #a0a0a0 65%,
    #4a148c 80%,
    #a0a0a0 100%
  );
  background-size: 400% 400%;
  animation: ${subtitleGradient} 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const CTAButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.44rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin: 0;
  
  &:hover {
    background-color: #9c27b0;
    animation: shake 0.5s ease-in-out infinite;
  }
  
  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ThirdPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 2rem;
  overflow: hidden;
`;

const CardBox = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 3rem;
  width: 80%;
  max-width: 1000px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const CardTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  margin-bottom: 2rem;
`;

const HabitButton = styled.button`
  flex: 1;
  padding: 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: ${props => props.color};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 200px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-top: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const NextButton = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background: #3498db;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-3px);
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: #2c3e50;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #34495e;
    transform: translateY(-3px);
  }
`;

const SelectedHabitsPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e0f7fa;
  padding: 2rem;
  overflow: hidden;
`;

const SelectedHabitsCard = styled.div`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const SelectedHabitsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #006064;
  margin: 0;
  text-align: center;
`;

const HabitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem 2rem;
  background: #e0f7fa;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(10px);
    background: #b2ebf2;
  }
`;

const HabitText = styled.p`
  font-size: 1.3rem;
  color: #006064;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &::after {
    content: '고민이시군요!';
    color: #00838f;
    font-weight: 500;
  }
`;

const RecommendationBox = styled.div`
  background: #4dd0e1;
  border-radius: 15px;
  padding: 1.5rem 2rem;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`;

const RecommendationText = styled.p`
  font-size: 1.2rem;
  color: white;
  margin: 0;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const BottomImage = styled.img`
  width: 180px;
  height: auto;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const Logo = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3rem;
  font-weight: 600;
  color: #34495e;
  font-family: 'Pretendard', sans-serif;
  text-transform: uppercase;
  background: linear-gradient(45deg, #8e44ad, #1a237e);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradient} 3s ease infinite;
`;

const Canvas3D = styled.div`
  width: 100%;
  height: 650px;
  position: relative;
  margin: -130px 0 -140px 0;
  overflow: visible;
  background: transparent;

  canvas {
    background: transparent !important;
    width: 100% !important;
    max-width: 1400px !important;
    margin: 0 auto !important;
  }
`;

const HeroTitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function getRandomFurColor() {
  const palette = [
    '#8BB8E1', // 민트
    '#F7A8C9', // 핑크
    '#F7F6A8', // 노랑
    '#C6B8E1', // 보라
    '#000000', // 검정
    '#FFFFFF'  // 흰색
  ];
  return palette[Math.floor(Math.random() * palette.length)];
}

function generateNoiseTexture(size = 128) {
  const size2 = size * size;
  const data = new Uint8Array(size2 * 3);
  for (let i = 0; i < size2; i++) {
    const shade = Math.floor(Math.random() * 256);
    data[i * 3] = shade;
    data[i * 3 + 1] = shade;
    data[i * 3 + 2] = shade;
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBFormat);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function generateDisplacementTexture(size = 128) {
  const size2 = size * size;
  const data = new Uint8Array(size2);
  for (let i = 0; i < size2; i++) {
    data[i] = Math.floor(Math.random() * 256);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.LuminanceFormat);
  texture.needsUpdate = true;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function CushionText({ isFur, furColor, onPointerOver, onPointerOut, currentColor, setCurrentColor }) {
  const textRef = useRef();
  const materialRef = useRef();
  const noiseTexture = useMemo(() => generateNoiseTexture(128), []);
  const displacementTexture = useMemo(() => generateDisplacementTexture(128), []);

  // 컬러 그라데이션(lerp)
  useFrame(() => {
    if (materialRef.current) {
      const mat = materialRef.current;
      // lerp currentColor -> furColor
      mat.color.lerp(new THREE.Color(furColor), 0.08);
      setCurrentColor(`#${mat.color.getHexString()}`);
    }
  });

  useEffect(() => {
    if (textRef.current && textRef.current.geometry) {
      textRef.current.geometry.computeBoundingBox();
      const boundingBox = textRef.current.geometry.boundingBox;
      if (boundingBox) {
        const center = boundingBox.getCenter(new THREE.Vector3());
        textRef.current.position.x = -center.x;
        textRef.current.position.y = -2;
      }
    }
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      if (isFur) {
        materialRef.current.bumpScale = 0.7;
        materialRef.current.roughness = 0.95;
        materialRef.current.sheen = 2.5;
        materialRef.current.sheenRoughness = 0.7;
        materialRef.current.clearcoat = 0.1;
        materialRef.current.clearcoatRoughness = 0.7;
        materialRef.current.displacementScale = 1.2;
      } else {
        materialRef.current.bumpScale = 0.1;
        materialRef.current.roughness = 0.2;
        materialRef.current.sheen = 0.5;
        materialRef.current.sheenRoughness = 0.2;
        materialRef.current.clearcoat = 0.8;
        materialRef.current.clearcoatRoughness = 0.1;
        materialRef.current.displacementScale = 0.0;
      }
    }
  }, [isFur]);

  return (
    <group onPointerOver={onPointerOver} onPointerOut={onPointerOut}>
      <Text3D
        ref={textRef}
        font="/fonts/Fredoka_Regular.json"
        size={8.78}
        height={4}
        curveSegments={64}
        bevelEnabled
        bevelThickness={1.2}
        bevelSize={0.6}
        bevelOffset={0}
        bevelSegments={48}
      >
        PIBIT
        <meshPhysicalMaterial
          ref={materialRef}
          attach="material"
          color={currentColor}
          roughness={isFur ? 0.95 : 0.2}
          metalness={0.1}
          bumpMap={noiseTexture}
          bumpScale={isFur ? 0.7 : 0.1}
          displacementMap={displacementTexture}
          displacementScale={isFur ? 1.2 : 0.0}
          sheen={isFur ? 2.5 : 0.5}
          sheenRoughness={isFur ? 0.7 : 0.2}
          clearcoat={isFur ? 0.1 : 0.8}
          clearcoatRoughness={isFur ? 0.7 : 0.1}
        />
      </Text3D>
      <pointLight position={[-5, 5, 5]} intensity={0.6} />
      <pointLight position={[5, -5, 5]} intensity={0.5} />
      <spotLight
        position={[0, 10, 0]}
        intensity={1}
        angle={0.5}
        penumbra={1}
        decay={2}
      />
      <ambientLight intensity={0.6} />
    </group>
  );
}

function Scene() {
  const [isFur, setIsFur] = useState(false);
  const [furColor, setFurColor] = useState('#8BB8E1');
  const [currentColor, setCurrentColor] = useState('#8BB8E1');
  const pastelColors = [
    '#8BB8E1', // 민트
    '#F7A8C9', // 핑크
    '#F7F6A8', // 노랑
    '#C6B8E1', // 보라
    // '#000000', // 검정 (제외)
  ];
  const handlePointerOver = () => {
    setIsFur(true);
    setFurColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
  };
  const handlePointerOut = () => setIsFur(false);
  return (
    <Canvas
      camera={{ 
        position: [0, 0, 33.6],
        fov: 35,
        near: 0.1,
        far: 1000
      }}
      style={{ 
        background: 'transparent'
      }}
      performance={{ min: 0.5 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <PresentationControls
          global
          rotation={[0.13, 0, 0]}
          polar={[-0.15, 0.15]}
          azimuth={[-0.15, 0.15]}
          config={{ mass: 1.5, tension: 300 }}
          snap={{ mass: 3, tension: 300 }}
        >
          <CushionText isFur={isFur} furColor={furColor} onPointerOver={handlePointerOver} onPointerOut={handlePointerOut} currentColor={currentColor} setCurrentColor={setCurrentColor} />
        </PresentationControls>
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2}
          castShadow
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.6}
        />
        <spotLight 
          position={[0, 10, 0]} 
          intensity={1}
          penumbra={0.8}
        />
        <pointLight 
          position={[0, 0, 10]} 
          intensity={0.6}
          color="#8BB8E1"
        />
        <pointLight 
          position={[0, 0, -10]} 
          intensity={0.6}
          color="#ffffff"
        />
      </Suspense>
    </Canvas>
  );
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function useFollowMouse(initial = { x: 0, y: 0 }) {
  const [target, setTarget] = useState(initial);
  const [current, setCurrent] = useState(initial);
  const animRef = useRef();

  useEffect(() => {
    function animate() {
      setCurrent(prev => ({
        x: lerp(prev.x, target.x, 0.18),
        y: lerp(prev.y, target.y, 0.18)
      }));
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [target.x, target.y]);

  return [current, setTarget];
}

// Home 컴포넌트 내
// float 효과를 x축 왕복으로만 변경
function getFloatOffset(duration, idx) {
  const t = Date.now() / 1000;
  // idx별로 phase 다르게, x축만 부드럽게 왕복, y축은 고정
  const x = Math.sin(t * 0.5 + idx) * 40; // 부드럽고 적당한 크기
  const y = 0;
  return { x, y };
}

export default function Home() {
  const [shapes, setShapes] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [pulsingStars, setPulsingStars] = useState(new Set());
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFurry, setIsFurry] = useState(false);
  const [furryColor, setFurryColor] = useState('#8BB8E1');
  const [followStates, setFollowStates] = useState({});
  const [followAnim, setFollowAnim] = useState({});
  const [draggedId, setDraggedId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({});
  const [pipitRed, setPipitRed] = useState(false);
  const heroTitleRef = useRef();

  useEffect(() => {
    const newImages = [
      // module 001 이미지들
      {
        id: 'module1_1',
        type: 'image',
        src: '/module/module001.png',
        size: 528,
        left: -5,
        bottom: -135,
        duration: 5,
        rotation: -15,
        zIndex: 3
      },
      {
        id: 'module1_2',
        type: 'image',
        src: '/module/module001.png',
        size: 528,
        left: 15,
        bottom: -138,
        duration: 6,
        rotation: 120,
        zIndex: 1
      },
      {
        id: 'module1_3',
        type: 'image',
        src: '/module/module001.png',
        size: 528,
        left: 35,
        bottom: -136,
        duration: 7,
        rotation: -75,
        zIndex: 4
      },
      {
        id: 'module1_4',
        type: 'image',
        src: '/module/module001.png',
        size: 528,
        left: 55,
        bottom: -137,
        duration: 8,
        rotation: 45,
        zIndex: 2
      },
      // module 003 이미지들
      {
        id: 'module3_1',
        type: 'image',
        src: '/module/module003.png',
        size: 396,
        left: 0,
        bottom: -135,
        duration: 6,
        rotation: 60,
        zIndex: 2
      },
      {
        id: 'module3_2',
        type: 'image',
        src: '/module/module003.png',
        size: 396,
        left: 20,
        bottom: -138,
        duration: 7,
        rotation: -120,
        zIndex: 4
      },
      {
        id: 'module3_3',
        type: 'image',
        src: '/module/module003.png',
        size: 396,
        left: 40,
        bottom: -136,
        duration: 8,
        rotation: 150,
        zIndex: 1
      },
      {
        id: 'module3_4',
        type: 'image',
        src: '/module/module003.png',
        size: 396,
        left: 60,
        bottom: -137,
        duration: 5,
        rotation: -30,
        zIndex: 3
      },
      // module 004 이미지들
      {
        id: 'module4_1',
        type: 'image',
        src: '/module/module004.png',
        size: 462,
        left: 5,
        bottom: -135,
        duration: 7,
        rotation: 90,
        zIndex: 4
      },
      {
        id: 'module4_2',
        type: 'image',
        src: '/module/module004.png',
        size: 462,
        left: 25,
        bottom: -138,
        duration: 6,
        rotation: -150,
        zIndex: 2
      },
      {
        id: 'module4_3',
        type: 'image',
        src: '/module/module004.png',
        size: 462,
        left: 45,
        bottom: -136,
        duration: 8,
        rotation: 30,
        zIndex: 3
      },
      {
        id: 'module4_4',
        type: 'image',
        src: '/module/module004.png',
        size: 462,
        left: 65,
        bottom: -137,
        duration: 7,
        rotation: -60,
        zIndex: 1
      },
      // module 005 이미지들
      {
        id: 'module5_1',
        type: 'image',
        src: '/module/module005.png',
        size: 502,
        left: 10,
        bottom: -135,
        duration: 8,
        rotation: 180,
        zIndex: 1
      },
      {
        id: 'module5_2',
        type: 'image',
        src: '/module/module005.png',
        size: 502,
        left: 30,
        bottom: -138,
        duration: 5,
        rotation: -90,
        zIndex: 3
      },
      {
        id: 'module5_3',
        type: 'image',
        src: '/module/module005.png',
        size: 502,
        left: 50,
        bottom: -136,
        duration: 6,
        rotation: 45,
        zIndex: 2
      },
      {
        id: 'module5_4',
        type: 'image',
        src: '/module/module005.png',
        size: 502,
        left: 70,
        bottom: -137,
        duration: 7,
        rotation: -135,
        zIndex: 4
      }
    ];
    
    setShapes(newImages);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js 설정
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    
    renderer.setSize(window.innerWidth, 300);
    canvasRef.current.appendChild(renderer.domElement);

    // 조명 설정
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 2);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(-1, 1, 1);
    scene.add(pointLight);

    // 폰트 로더
    const fontLoader = new THREE.FontLoader();
    fontLoader.load('/fonts/Fredoka_Regular.json', (font) => {
      const textGeometry = new THREE.TextGeometry('PIBIT', {
        font: font,
        size: 5,
        height: 2,
        curveSegments: 32,
        bevelEnabled: true,
        bevelThickness: 0.3,
        bevelSize: 0.2,
        bevelOffset: 0,
        bevelSegments: 16
      });

      // 텍스처 생성
      const textureLoader = new THREE.TextureLoader();
      const fabricTexture = textureLoader.load('/textures/fabric_normal.jpg');
      
      // 머티리얼 설정
      const material = new THREE.MeshStandardMaterial({
        color: 0xf5e6d3,
        metalness: 0.1,
        roughness: 0.8,
        normalMap: fabricTexture,
        normalScale: new THREE.Vector2(0.5, 0.5),
        envMapIntensity: 1
      });

      const textMesh = new THREE.Mesh(textGeometry, material);
      
      // 텍스트 중앙 정렬
      textGeometry.computeBoundingBox();
      const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
      textMesh.position.x = centerOffset;
      textMesh.position.y = -1;
      textMesh.position.z = -10;

      scene.add(textMesh);

      // 애니메이션
      const animate = () => {
        requestAnimationFrame(animate);
        textMesh.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
        renderer.render(scene, camera);
      };

      animate();
      setIsLoaded(true);
    });

    // 반응형 처리
    const handleResize = () => {
      camera.aspect = window.innerWidth / 300;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, 300);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleShapeHover = (shapeId) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === shapeId
          ? { ...shape, isFollowing: true }
          : shape
      )
    );
  };

  const handleShapeLeave = (shapeId) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === shapeId
          ? { ...shape, isFollowing: false }
          : shape
      )
    );
  };

  const handleTitleMouseEnter = () => {
    setIsHovered(true);
    const starCount = Math.floor(Math.random() * 2) + 4; // 4-5개 랜덤
    const selectedStars = new Set();
    while(selectedStars.size < starCount) {
      selectedStars.add(Math.floor(Math.random() * 60));
    }
    setPulsingStars(selectedStars);
  };

  const handleTitleMouseLeave = () => {
    setIsHovered(false);
    setPulsingStars(new Set());
  };

  const handleButtonMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleButtonMouseLeave = () => {
    setIsButtonHovered(false);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/customizedna');
    }, 500);
  };

  const handleFurryEnter = () => {
    setIsFurry(true);
    setFurryColor(pastelColors[Math.floor(Math.random() * pastelColors.length)]);
  };

  const handleFurryLeave = () => setIsFurry(false);

  const generateStars = () => {
    const stars = [];
    const colors = ['#bbdefb', '#ffe082', '#ffffff'];
    
    // 화면 전체에 별을 균일하게 배치
    for (let i = 0; i < 70; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: `${Math.random() * 9 + 12}px`,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 4 + Math.random() * 2,
        delay: `${Math.random() * 2}s`
      });
    }
    
    return stars;
  };

  const [stars] = useState(generateStars());

  const handleImageMouseEnter = (id) => {
    setFollowStates(prev => ({ ...prev, [id]: { following: true, x: 0, y: 0 } }));
  };
  const handleImageMouseMove = (id, e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = (e.clientY - rect.top - rect.height / 2) * 1.5;
    setFollowStates(prev => ({ ...prev, [id]: { ...prev[id], x, y } }));
  };
  const handleImageMouseLeave = (id) => {
    setFollowStates(prev => ({ ...prev, [id]: { following: false, x: 0, y: 0 } }));
  };

  // 부드러운 이동 애니메이션 useEffect
  useEffect(() => {
    const anim = () => {
      setFollowAnim(prev => {
        const next = { ...prev };
        Object.keys(followStates).forEach(id => {
          const target = followStates[id] || { x: 0, y: 0 };
          const current = prev[id] || { x: 0, y: 0 };
          next[id] = {
            x: current.x + (target.x - current.x) * 0.08,
            y: current.y + (target.y - current.y) * 0.08
          };
        });
        return next;
      });
      requestAnimationFrame(anim);
    };
    anim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followStates]);

  const handleImageMouseDown = (id, e) => {
    if (!id.startsWith('module1_')) return;
    setDraggedId(id);
    const rect = e.target.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDragPos(prev => ({ ...prev, [id]: { x: rect.left, y: rect.top } }));
    e.preventDefault();
  };

  useEffect(() => {
    if (!draggedId) return;
    const handleMove = (e) => {
      setDragPos(prev => ({
        ...prev,
        [draggedId]: {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        }
      }));
      // HeroTitle 영역과 충돌 체크
      if (heroTitleRef.current) {
        const heroRect = heroTitleRef.current.getBoundingClientRect();
        // 드래그 이미지의 중심 좌표 계산
        const imgRect = document.querySelector(`img[key='${draggedId}']`)?.getBoundingClientRect();
        const dragX = e.clientX;
        const dragY = e.clientY;
        if (
          dragX > heroRect.left &&
          dragX < heroRect.right &&
          dragY > heroRect.top &&
          dragY < heroRect.bottom
        ) {
          setPipitRed(true);
        } else {
          setPipitRed(false);
        }
      }
    };
    const handleUp = () => {
      setDraggedId(null);
      setPipitRed(false);
      // 원래 자리로 복귀
      setTimeout(() => {
        setDragPos(prev => ({ ...prev, [draggedId]: { x: 0, y: 0 } }));
      }, 10);
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [draggedId, dragOffset]);

  return (
    <Hero onMouseMove={handleMouseMove}>
      {stars.map((star, i) => (
        <Star
          key={i}
          {...star}
          isPulsing={pulsingStars.has(i)}
        />
      ))}
      {shapes.map((shape, idx) => {
        if (shape.type !== 'image') return null;
        const follow = followStates[shape.id] || { following: false, x: 0, y: 0 };
        const anim = followAnim[shape.id] || { x: 0, y: 0 };
        const floatOffset = getFloatOffset(shape.duration, idx);
        const isDragged = draggedId === shape.id;
        const drag = dragPos[shape.id] || { x: 0, y: 0 };
        const isModule001 = shape.id.startsWith('module1_');
        return (
          <ImageShape
            key={shape.id}
            src={shape.src}
            size={shape.size}
            left={shape.left}
            bottom={shape.bottom}
            duration={shape.duration}
            rotation={shape.rotation}
            zIndex={shape.zIndex}
            style={{
              transform: isModule001 && isDragged
                ? `translate(${drag.x - shape.left}px, ${drag.y - shape.bottom}px) rotate(${shape.rotation * 10}deg)`
                : `translate(${anim.x + floatOffset.x}px, ${anim.y + floatOffset.y}px) rotate(${shape.rotation * 10}deg)`,
              transition: isModule001 && isDragged ? 'none' : 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            onMouseDown={e => handleImageMouseDown(shape.id, e)}
            onMouseEnter={() => handleImageMouseEnter(shape.id)}
            onMouseMove={e => handleImageMouseMove(shape.id, e)}
            onMouseLeave={() => handleImageMouseLeave(shape.id)}
            alt="fidget toy"
          />
        );
      })}
      <HeroContent>
        <Canvas3D>
          <Scene />
        </Canvas3D>
        <HeroSubtitle>
          습관과 감정을 돌보며 함께 성장하는 동반자 피빗을 만나보세요
        </HeroSubtitle>
        <Link href="/customize" passHref>
          <CTAButton 
            onMouseEnter={handleButtonMouseEnter}
            onMouseLeave={handleButtonMouseLeave}
            onClick={handleButtonClick}
          >
            새로운 동반자 찾기
          </CTAButton>
        </Link>
      </HeroContent>
      <PageTransition className={isTransitioning ? 'active' : ''}>
        <Dot />
        <Dot />
        <Dot />
      </PageTransition>
    </Hero>
  );
}
