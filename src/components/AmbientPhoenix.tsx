
import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { Phoenix } from './Phoenix';
import { Group, CatmullRomCurve3, Vector3 } from 'three';

const AnimationScene = () => {
  const phoenixRef = useRef<Group>(null);

  // 1. Create a more complex, realistic flight path
  const curve = useMemo(() => {
    const points = [
      new Vector3(-15, 10, 0),  // Left, mid-height, mid-distance
      new Vector3(-5, 15, -10), // Up-left, further away
      new Vector3(5, 20, 0),    // Top-center, mid-distance
      new Vector3(15, 15, 10),  // Right, mid-height, closer
      new Vector3(5, 10, 0),    // Down-right, mid-distance
      new Vector3(-5, 5, -10),  // Down-left, further away
    ];
    return new CatmullRomCurve3(points, true, 'catmullrom', 0.7);
  }, []);

  useFrame(({ clock }) => {
    if (phoenixRef.current) {
      // 2. Move the phoenix along the curve based on time
      const time = clock.getElapsedTime();
      const loopTime = 20; // Time in seconds to complete a loop
      const t = (time % loopTime) / loopTime;

      const position = curve.getPointAt(t);
      phoenixRef.current.position.copy(position);

      // 3. Make the phoenix face the direction of flight
      const tangent = curve.getTangentAt(t).normalize();
      const lookAtPosition = new Vector3().copy(position).add(tangent);
      phoenixRef.current.lookAt(lookAtPosition);
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={75} position={[0, 10, 35]} />
      <hemisphereLight intensity={0.7} groundColor="black" />
      <directionalLight intensity={1} position={[5, 10, 5]} />
      <Suspense fallback={null}>
        <Phoenix ref={phoenixRef} scale={0.008} />
      </Suspense>
    </>
  );
};

export const AmbientPhoenix = ({ zIndex = 20 }: { zIndex?: number }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: zIndex, // Use the passed zIndex
      pointerEvents: 'none', // Allow clicks to pass through
    }}>
      <Canvas>
        <AnimationScene />
      </Canvas>
    </div>
  );
};
