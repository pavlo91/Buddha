import React, { useState, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CSM from 'three-custom-shader-material'
import Frag from './shaders/Frag'
import Vert from './shaders/Vert'
import { easing } from 'maath'

export default function PredatorCloakMaterial({ originalMaterial, gridWidth, gridHeight, iridescence, color, hover }) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0.0 },
      gridWidth: { value: gridWidth },
      gridHeight: { value: gridHeight }
    }),
    [gridHeight, gridWidth]
  )

  const frag = useMemo(() => `${Frag}`, [])

  const baseMaterialCustom = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: color ? new THREE.Color(color) : null,
      map: originalMaterial ? originalMaterial.map : null,
      roughness: 0.4,
      metalness: 0.4,
      normalMap: originalMaterial ? originalMaterial.normalMap : null,
      normalScale: new THREE.Vector2(0.9, -0.5),
      ior: 1.1,
      thickness: 1.9,
      transmission: 1,
      iridescence: iridescence ? iridescence : null
    })
  }, [])

  useFrame((state, dt) => {
    uniforms.uTime.value += dt
    easing.damp(uniforms.uProgress, 'value', hover ? 1.0 : 0.0, 1.2, dt)
  })

  return <CSM baseMaterial={baseMaterialCustom} uniforms={uniforms} vertexShader={Vert} fragmentShader={frag} silent envMapIntensity={6} />
}
