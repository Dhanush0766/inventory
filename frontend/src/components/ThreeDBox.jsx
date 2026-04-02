import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedBox({ color = "#6366f1", isDistorted = false }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <boxGeometry args={[1, 1, 1]} />
        {isDistorted ? (
          <MeshDistortMaterial
            color={color}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.5}
            roughness={0.2}
            distort={0.4}
            speed={2}
          />
        ) : (
          <meshStandardMaterial 
            color={color} 
            roughness={0.2} 
            metalness={0.8}
            envMapIntensity={2}
          />
        )}
        <Edges />
      </mesh>
    </Float>
  );
}

function Edges() {
  return (
    <lineSegments>
      <edgesGeometry />
      <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
    </lineSegments>
  );
}

export default function ThreeDBox({ 
  color = "#6366f1", 
  isDistorted = false,
  className = "",
  style = {}
}) {
  return (
    <div className={`three-d-container ${className}`} style={{ width: '100%', height: '100%', minHeight: '300px', ...style }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        <AnimatedBox color={color} isDistorted={isDistorted} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
