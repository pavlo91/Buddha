import React from 'react'
import {
  EffectComposer,
  Vignette,
  Bloom,
  HueSaturation,
  Autofocus
} from '@react-three/postprocessing'
import { Environment } from '@react-three/drei'

export default function Effects() {
  return (
    <>
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          luminanceThreshold={0.67}
          radius={0.7}
          levels={5}
          intensity={0.8}
          mipmapBlur
        />
        <Autofocus target={[0, 0, 0]} bokehScale={5} />
        <Vignette offset={0.7} darkness={0.45} />
        {/* <HueSaturation hue={5} saturation={50} lightness={1}/> */}
      </EffectComposer>
      <directionalLight
        shadow-mapSize={1024}
        shadow-bias={-0.001}
        shadow-normalBias={0.03}
        castShadow
        position={[-15, 1, 30]}
        intensity={15}
      />
      <Environment
        ground={{ height: -5, radius: 790, scale: 50 }}
        files="./hdrs/moonlit_golf_4k.hdr"
      />
    </>
  )
}
