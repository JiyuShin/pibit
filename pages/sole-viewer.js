import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function Model(props) {
  const { nodes, materials } = useGLTF('/sole.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['Material.063']}
        position={[14.921, 0.53, 1.099]}
        rotation={[2.786, 1.158, 1.727]}
        scale={[-0.348, -0.187, -0.348]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roundcube.geometry}
        material={materials['Material.075']}
        position={[15.544, 0.689, 2.494]}
        rotation={[-0.184, 0.407, -0.055]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={materials['Material.021']}
        position={[15.576, 1.762, 2.31]}
        rotation={[-0.184, 0.407, -0.055]}
        scale={[0.146, 0.494, 0.146]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={materials['Material.020']}
        position={[15.608, 2.094, 2.219]}
        rotation={[-0.184, 0.407, -0.055]}
        scale={[0.647, 0.241, 0.647]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube025.geometry}
        material={materials['Material.065']}
        position={[15.124, 0.536, 1.581]}
        rotation={[2.786, 1.158, 1.727]}
        scale={[0.651, 0.156, 0.266]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube023.geometry}
        material={materials['Material.064']}
        position={[15.064, 0.589, 1.415]}
        rotation={[2.786, 1.158, 1.727]}
        scale={[0.124, 0.446, 0.124]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube022.geometry}
        material={materials['Material.018']}
        position={[14.337, 0.228, 2.834]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube021.geometry}
        material={materials['Material.017']}
        position={[14.434, 0.269, 3.056]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube020.geometry}
        material={materials['Material.004']}
        position={[14.536, 0.313, 3.289]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube019.geometry}
        material={materials['Material.014']}
        position={[14.551, 0.606, 3.227]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube018.geometry}
        material={materials['Material.015']}
        position={[14.449, 0.563, 2.994]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube017.geometry}
        material={materials['Material.016']}
        position={[14.352, 0.522, 2.772]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={materials['Material.011']}
        position={[14.565, 0.88, 3.17]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials['Material.012']}
        position={[14.463, 0.837, 2.937]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={materials['Material.013']}
        position={[14.366, 0.795, 2.715]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={materials['Material.010']}
        position={[14.578, 1.139, 3.116]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={materials['Material.009']}
        position={[14.476, 1.096, 2.883]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={materials['Material.008']}
        position={[14.379, 1.054, 2.661]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={materials['Material.005']}
        position={[14.393, 1.324, 2.605]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={materials['Material.006']}
        position={[14.49, 1.365, 2.827]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={materials['Material.019']}
        position={[14.631, 0.813, 2.878]}
        rotation={[2.957, -0.407, 1.625]}
        scale={[-0.754, -0.041, -0.435]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials['Material.007']}
        position={[14.592, 1.408, 3.059]}
        rotation={[-0.184, 0.407, -1.625]}
        scale={[-0.101, -0.214, -0.092]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube006.geometry}
        material={materials['Material.003']}
        position={[16.245, 0.724, 3.152]}
        rotation={[1.38, -0.057, -0.407]}
        scale={0.591}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={materials['Material.002']}
        position={[15.531, 0.815, 3.448]}
        rotation={[1.38, -0.057, -0.407]}
        scale={0.591}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={materials['Material.001']}
        position={[15.883, 0.774, 3.301]}
        rotation={[1.38, -0.057, -0.407]}
        scale={0.591}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Material.061']}
        position={[16.561, 0.598, 2.094]}
        rotation={[-0.167, 0.407, -1.769]}
        scale={[0.539, 0.126, 0.275]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.062']}
        position={[16.481, 0.545, 2.114]}
        rotation={[-0.167, 0.407, -1.626]}
        scale={[0.68, 0.162, 0.43]}
      />
    </group>
  );
}

useGLTF.preload('/sole.glb');

export default function SoleViewerPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas camera={{ position: [0, 0, 35], fov: 75 }}> {/* 카메라 위치와 시야각 조정 */}
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} /> {/* 전체적인 주변광 */}
          <directionalLight position={[10, 10, 5]} intensity={1} /> {/* 태양광과 같은 방향성 조명 */}
          <Environment preset="sunset" /> {/* 다양한 환경 프리셋 사용 가능 */}
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
} 