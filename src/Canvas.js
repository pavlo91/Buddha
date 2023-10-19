import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import { Predator } from './Predator'
import Controls from './Controls'
import { cameraPositon, fov } from './Config'

export const App = () => {
  return (
    <>
      <Canvas shadows gl={{ toneMappingExposure: 0.7 }} dpr={1} camera={{ cameraPositon, fov }} eventSource={document.getElementById('root')} eventPrefix="client">
        <ambientLight intensity={0.3} />
        <directionalLight color={0xffffff} position={[5, -4, 20]} intensity={20} />
        <Suspense fallback={null}>
          <Predator rotation={[0, 0, 0]} scale={0.2} position={[0, 0.7, 0]} />
        </Suspense>
        <Controls />
      </Canvas>
    </>
  )
}
