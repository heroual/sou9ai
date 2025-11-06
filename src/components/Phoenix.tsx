
import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Group } from 'three';

// Define the structure of the GLTF result for type safety
interface GLTFResult {
  nodes: {
    Object_7: THREE.SkinnedMesh;
    Object_8: THREE.SkinnedMesh;
    _rootJoint: THREE.Bone;
  };
  materials: {
    MatI_Ride_FengHuang_01a: THREE.MeshStandardMaterial;
    MatI_Ride_FengHuang_01b: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
}

export const Phoenix = React.forwardRef<Group, JSX.IntrinsicElements['group']>((props, ref) => {
  const { nodes, materials, animations } = useGLTF('/phoenix_bird.glb') as unknown as GLTFResult;
  const { actions } = useAnimations(animations, ref as React.RefObject<Group>);

  useEffect(() => {
    // Play the primary animation. The name 'Take 001' is specific to this model.
    const animationAction = actions['Take 001'];
    if (animationAction) {
      animationAction.play();
    }
  }, [actions]);

  return (
    <group ref={ref} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="b953203b1a6c48e3a1b858c10a56661ffbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.MatI_Ride_FengHuang_01a}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.MatI_Ride_FengHuang_01b}
                    skeleton={nodes.Object_8.skeleton}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload('/phoenix_bird.glb');
