import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import { Predator } from './Predator'
import Controls from './Controls'
import { cameraPositon, fov } from './Config'
import Effects from './Effects'

export const App = () => {
  return (
    <>
      <Canvas shadows gl={{ toneMappingExposure: 0.7 }} dpr={1} camera={{ cameraPositon, fov }} eventSource={document.getElementById('root')} eventPrefix="client">
        <Suspense fallback={null}>
          <Predator rotation={[0, 0, 0]} scale={0.2} position={[0, 0.7, 0]} />
          <Effects />
        </Suspense>
        <Controls />
      </Canvas>
    </>
  )
}
