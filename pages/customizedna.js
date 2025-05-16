import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/router';
import * as THREE from 'three';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(-45deg, #e0f7fa, #fff5e6, #e0f7fa, #fff5e6);
  background-size: 400% 400%;
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
`;

const BackButton = styled.button`
  position: absolute;
  top: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const NameInputContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 2;
`;

const NameInput = styled.input`
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border: 2px solid #3498db;
  border-radius: 25px;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  width: 300px;
  
  &:focus {
    border-color: #2980b9;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Pretendard', sans-serif;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const ShapeButtonContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 2;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s ease;
`;

const ShapeButton = styled.button`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CompletionMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 2rem 4rem;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: 600;
  color: #34495e;
  text-align: center;
  font-family: 'Pretendard', sans-serif;
  z-index: 2;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 0.5s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ResultButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Pretendard', sans-serif;
  white-space: nowrap;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function CustomizeDNA() {
  const router = useRouter();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const dnaRef = useRef(null);
  const shapeRef = useRef(null);
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [showShape, setShowShape] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // DNA structure
    const dna = new THREE.Group();
    dnaRef.current = dna;

    const radius = 1.2;
    const tubeRadius = 0.08;
    const radialSegments = 12;
    const tubularSegments = 128;
    const helixCurve1 = new THREE.CatmullRomCurve3();
    const helixCurve2 = new THREE.CatmullRomCurve3();

    // Create helix points for both strands
    const points1 = [];
    const points2 = [];
    for (let i = 0; i < tubularSegments; i++) {
      const u = i / tubularSegments;
      const theta = u * Math.PI * 4;
      const x1 = Math.cos(theta) * radius;
      const y1 = Math.sin(theta) * radius;
      const x2 = Math.cos(theta + Math.PI) * radius;
      const y2 = Math.sin(theta + Math.PI) * radius;
      const z = u * 4 - 2;
      points1.push(new THREE.Vector3(x1, y1, z));
      points2.push(new THREE.Vector3(x2, y2, z));
    }
    helixCurve1.points = points1;
    helixCurve2.points = points2;

    // Create tube geometries for both strands
    const tubeGeometry1 = new THREE.TubeGeometry(helixCurve1, tubularSegments, tubeRadius, radialSegments, false);
    const tubeGeometry2 = new THREE.TubeGeometry(helixCurve2, tubularSegments, tubeRadius, radialSegments, false);
    
    const tubeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });

    const tube1 = new THREE.Mesh(tubeGeometry1, tubeMaterial);
    const tube2 = new THREE.Mesh(tubeGeometry2, tubeMaterial);
    dna.add(tube1);
    dna.add(tube2);

    // 내부 연결선 추가
    const innerLineMaterial = new THREE.LineBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.6,
      linewidth: 2
    });

    // 각 나선에 대해 내부 연결선 생성
    const innerPoints1 = [];
    const innerPoints2 = [];
    for (let i = 0; i < tubularSegments; i++) {
      const u = i / tubularSegments;
      const theta = u * Math.PI * 4;
      const x1 = Math.cos(theta) * (radius * 0.7); // 반지름을 0.7배로 줄여 안쪽으로
      const y1 = Math.sin(theta) * (radius * 0.7);
      const x2 = Math.cos(theta + Math.PI) * (radius * 0.7);
      const y2 = Math.sin(theta + Math.PI) * (radius * 0.7);
      const z = u * 4 - 2;
      innerPoints1.push(new THREE.Vector3(x1, y1, z));
      innerPoints2.push(new THREE.Vector3(x2, y2, z));
    }

    const innerLineGeometry1 = new THREE.BufferGeometry().setFromPoints(innerPoints1);
    const innerLineGeometry2 = new THREE.BufferGeometry().setFromPoints(innerPoints2);
    
    const innerLine1 = new THREE.Line(innerLineGeometry1, innerLineMaterial);
    const innerLine2 = new THREE.Line(innerLineGeometry2, innerLineMaterial);
    
    dna.add(innerLine1);
    dna.add(innerLine2);

    // Create base pairs
    const basePairMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xd8b5f2,  // 더 옅은 보라색
      transparent: true,
      opacity: 0.6,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.6,
      thickness: 0.5,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    });

    // 구체를 관통하는 연속 선 생성
    const throughLineMaterial = new THREE.LineBasicMaterial({
      color: 0x4fc3f7,
      transparent: true,
      opacity: 0.8,
      linewidth: 2
    });

    // 각 나선을 따라 연속선 생성
    const throughPoints1 = [];
    const throughPoints2 = [];
    
    for (let i = 0; i < tubularSegments; i++) {
      const u = i / tubularSegments;
      const theta = u * Math.PI * 4;
      const x1 = Math.cos(theta) * radius;
      const y1 = Math.sin(theta) * radius;
      const x2 = Math.cos(theta + Math.PI) * radius;
      const y2 = Math.sin(theta + Math.PI) * radius;
      const z = u * 4 - 2;
      throughPoints1.push(new THREE.Vector3(x1, y1, z));
      throughPoints2.push(new THREE.Vector3(x2, y2, z));
    }

    const throughLineGeometry1 = new THREE.BufferGeometry().setFromPoints(throughPoints1);
    const throughLineGeometry2 = new THREE.BufferGeometry().setFromPoints(throughPoints2);
    
    const throughLine1 = new THREE.Line(throughLineGeometry1, throughLineMaterial);
    const throughLine2 = new THREE.Line(throughLineGeometry2, throughLineMaterial);
    
    dna.add(throughLine1);
    dna.add(throughLine2);

    for (let i = 0; i < tubularSegments; i += 2) {
      const basePairGeometry = new THREE.SphereGeometry(tubeRadius * 1.8, 16, 16);
      const basePair1 = new THREE.Mesh(basePairGeometry, basePairMaterial);
      const basePair2 = new THREE.Mesh(basePairGeometry, basePairMaterial);
      
      const point1 = helixCurve1.getPoint(i / tubularSegments);
      const point2 = helixCurve2.getPoint(i / tubularSegments);
      
      basePair1.position.copy(point1);
      basePair2.position.copy(point2);
      
      dna.add(basePair1);
      dna.add(basePair2);

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([point1, point2]);
      const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xb392d9,  // 더 진한 보라색
        transparent: true,
        opacity: 0.8,  // 투명도 감소
        linewidth: 2  // 선 두께 약간 감소
      });
      
      // 선을 더 두껍게 보이게 하기 위해 여러 개의 선을 그립니다
      const line = new THREE.Line(lineGeometry, lineMaterial);
      dna.add(line);
      
      // 추가 선들로 두께감을 더합니다
      const offset = 0.007; // 오프셋 거리 감소
      for (let j = 0; j < 3; j++) { // 추가 선 개수 감소
        const offsetPoint1 = point1.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * offset,
          (Math.random() - 0.5) * offset,
          (Math.random() - 0.5) * offset
        ));
        const offsetPoint2 = point2.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * offset,
          (Math.random() - 0.5) * offset,
          (Math.random() - 0.5) * offset
        ));
        const offsetGeometry = new THREE.BufferGeometry().setFromPoints([offsetPoint1, offsetPoint2]);
        const offsetLine = new THREE.Line(offsetGeometry, lineMaterial);
        dna.add(offsetLine);
      }
    }

    scene.add(dna);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1);
    scene.add(directionalLight2);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      if (dnaRef.current) {
        dnaRef.current.rotation.y += 0.006;  // 0.003 * 2 = 0.006
        dnaRef.current.rotation.x += 0.002;  // 0.001 * 2 = 0.002
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.remove(dna);
      if (shapeRef.current) {
        scene.remove(shapeRef.current);
      }
      renderer.dispose();
    };
  }, []);

  const handleSubmit = () => {
    if (name.trim() === '') return;
    setShowNameInput(false);
    createRandomShape();
  };

  const createRandomShape = () => {
    if (shapeRef.current) {
      sceneRef.current.remove(shapeRef.current);
    }

    const shapes = [
      { 
        create: () => new THREE.ConeGeometry(0.3, 0.6, 3),
        color: 0xff0000 // 빨간색
      },
      { 
        create: () => new THREE.BoxGeometry(0.5, 0.5, 0.5),
        color: 0x00ff00 // 초록색
      },
      { 
        create: () => new THREE.CylinderGeometry(0.3, 0.3, 0.6, 5),
        color: 0x0000ff // 파란색
      },
      { 
        create: () => new THREE.CylinderGeometry(0.3, 0.3, 0.6, 6),
        color: 0xff00ff // 보라색
      }
    ];
    
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    const geometry = randomShape.create();
    const material = new THREE.MeshPhongMaterial({ 
      color: randomShape.color,
      shininess: 100,
      transparent: false,
      opacity: 1
    });
    
    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(0, 1.2, 0); // 화면 상단 가운데로 위치 조정
    shapeRef.current = shape;
    shapeRef.current.userData = { 
      color: randomShape.color,
      isDragging: false // 드래그 상태 추적
    };
    sceneRef.current.add(shape);
    setShowShape(true);
  };

  const handleBackClick = () => {
    router.push('/');
  };

  const handleShapeDrag = (event) => {
    if (!shapeRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    const vector = new THREE.Vector3(x, y, 0.5);
    vector.unproject(cameraRef.current);
    
    const dir = vector.sub(cameraRef.current.position).normalize();
    const distance = -cameraRef.current.position.z / dir.z;
    const pos = cameraRef.current.position.clone().add(dir.multiplyScalar(distance));
    
    shapeRef.current.position.copy(pos);
    shapeRef.current.userData.isDragging = true; // 드래그 중임을 표시
  };

  const handleShapeDrop = () => {
    if (!shapeRef.current || !shapeRef.current.userData) return;
    
    const dnaPosition = new THREE.Vector3(0, 0, 0);
    const distanceToDNA = shapeRef.current.position.distanceTo(dnaPosition);
    
    if (distanceToDNA < 1.5) {
      // DNA 모형의 색상을 도형의 색상으로 변경
      const shapeColor = shapeRef.current.userData.color;
      dnaRef.current.children.forEach(child => {
        if (child.material) {
          child.material.color.set(shapeColor);
        }
      });
      
      setShowCompletion(true);
      setShowResultButton(true); // 버튼을 바로 표시
      sceneRef.current.remove(shapeRef.current);
      shapeRef.current = null;
      return;
    }
    
    shapeRef.current.userData.isDragging = false; // 드래그 종료
  };

  return (
    <Container>
      <BackButton onClick={handleBackClick}>←</BackButton>
      {showNameInput && (
        <NameInputContainer>
          <NameInput
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SubmitButton onClick={handleSubmit}>완료</SubmitButton>
        </NameInputContainer>
      )}
      <CanvasContainer 
        ref={containerRef} 
        onMouseMove={showShape ? handleShapeDrag : undefined}
        onMouseUp={showShape ? handleShapeDrop : undefined}
      />
      <CompletionMessage show={showCompletion}>
        {name}님의 감정 기질 분석이 완료되었습니다. <ResultButton onClick={() => router.push({ pathname: '/customize', query: { name } })}>결과 조회하기</ResultButton>
      </CompletionMessage>
    </Container>
  );
} 