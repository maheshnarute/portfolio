import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial } from '@react-three/drei';

function TorusKnotMesh() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  // eslint-disable-next-line no-unused-vars

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      
      // Interpolate position based on mouse position
      const targetX = (state.pointer.x * 0.8);
      const targetY = (state.pointer.y * 0.8);
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.15 : 1.0}
    >
      <torusKnotGeometry args={[1, 0.35, 120, 16]} />
      <MeshDistortMaterial
        color={hovered ? '#ec4899' : '#00d4ff'}
        attach="material"
        distort={hovered ? 0.3 : 0.15}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive={hovered ? '#a855f7' : '#00d4ff'}
        emissiveIntensity={hovered ? 1.5 : 0.8}
      />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="hero__canvas-container" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 4], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-5, 5, 2]} intensity={1.0} />
        <TorusKnotMesh />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
