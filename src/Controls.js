import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'

function Controls() {
  const orbitControls = useRef()

  return (
    <>
      <OrbitControls
        ref={orbitControls}
        minDistance={1}
        maxDistance={4}
        target={[-0.05, 1.35, 0]}
        maxPolarAngle={Math.PI / 1.8}
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
      />
    </>
  )
}

export default Controls
