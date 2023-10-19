import React, { useState, useEffect } from 'react'
import PredatorCloakMaterial from './PredatorMaterial/PredatorMaterial'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

export function Predator(props) {
  const ethModel = useLoader(GLTFLoader, './scene.glb')
  const buddhaModel = useLoader(OBJLoader, './buddha_head.obj')
  const buddhaChildren = buddhaModel.children
  const [hover, sethover] = useState(false)
  const myGroup = React.useRef()

  const damping = 1
  const maxRotation = 30 * (Math.PI / 180)
  const deadZone = 0.5

  useFrame((event) => {
    if (myGroup.current) {
      const targetRotationX = Number(window.localStorage.getItem('targetRotationX'))
      const targetRotationY = Number(window.localStorage.getItem('targetRotationY'))

      let rotationVelocityX = window.localStorage.getItem('rotationVelocityX')
      let rotationVelocityY = window.localStorage.getItem('rotationVelocityY')

      rotationVelocityX = rotationVelocityX === 'NaN' ? 0 : Number(rotationVelocityX)
      rotationVelocityY = rotationVelocityY === 'NaN' ? 0 : Number(rotationVelocityY)

      rotationVelocityX += (targetRotationX - myGroup.current.rotation.x) * damping
      rotationVelocityY += (targetRotationY - myGroup.current.rotation.y) * damping

      myGroup.current.rotation.x = lerp(myGroup.current.rotation.x, myGroup.current.rotation.x + rotationVelocityX, 0.1)
      myGroup.current.rotation.y = lerp(myGroup.current.rotation.y, myGroup.current.rotation.y + rotationVelocityY, 0.05)

      rotationVelocityX *= 1 - damping
      rotationVelocityY *= 1 - damping

      window.localStorage.setItem('rotationVelocityX', rotationVelocityX)
      window.localStorage.setItem('rotationVelocityY', rotationVelocityY)
    }
  })

  const clamp = (val, min, max) => {
    let temp = 0
    temp = val > min ? val : min
    if (temp > max) {
      return max
    } else {
      return temp
    }
  }

  const lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end
  }

  const onMouseMove = (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1

    const targetRotationX = clamp(mouseY * maxRotation, -maxRotation, maxRotation)
    const targetRotationY = clamp(mouseX * maxRotation, -maxRotation, maxRotation)

    window.localStorage.setItem('targetRotationX', targetRotationX)
    window.localStorage.setItem('targetRotationY', targetRotationY)
  }

  const onDeviceOrientation = (event) => {
    if (event.beta !== null && event.gamma !== null) {
      const lastBeta = Number(window.localStorage.getItem('lastBeta'))
      const lastGamma = Number(window.localStorage.getItem('lastGamma'))

      const changeInBeta = Math.abs(event.beta - lastBeta)
      const changeInGamma = Math.abs(event.gamma - lastGamma)

      if (changeInBeta > deadZone) {
        const beta = event.beta / 180
        targetRotationX = Math.clamp(beta * maxRotation, -maxRotation, maxRotation)
        window.localStorage.setItem('lastBeta', event.beta)
      }

      if (changeInGamma > deadZone) {
        const gamma = event.gamma / 90
        targetRotationY = Math.clamp(gamma * maxRotation, -maxRotation, maxRotation)
        window.localStorage.setItem('lastGamma', event.gamma)
      }

      updateObjectRotation()
    }
  }

  useEffect(() => {
    window.localStorage.clear()
    window.localStorage.setItem('rotationVelocityX', 0)
    window.localStorage.setItem('rotationVelocityY', 0)
    window.localStorage.setItem('targetRotationX', 0)
    window.localStorage.setItem('targetRotationY', 0)
    window.localStorage.setItem('lastBeta', 0)
    window.localStorage.setItem('lastGamma', 0)

    document.addEventListener('mousemove', onMouseMove, false)
    window.addEventListener('deviceorientation', onDeviceOrientation)

    return () => {
      document.removeEventListener('mousemove', onMouseMove, false)
      window.removeEventListener('deviceorientation', onDeviceOrientation)
    }
  }, [])

  const hairMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color( 0xa1a1a1 ),
    roughness: 0.1,
    metalness: 0.1,
    emissive: new THREE.Color( 0xafafaf ),
    emissiveIntensity: 0.8,
  })

  const faceMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color( 0xf1f1f1 ),
    roughness: 0.5,
    metalness: 0.9,
  })

  return (
    <group
      onPointerEnter={() => {
        sethover(true)
      }}
      onPointerLeave={() => {
        sethover(false)
      }}
      {...props}
      dispose={null}
      ref={myGroup}>
      <group scale={0.15}>
        <mesh geometry={buddhaChildren[0].geometry}>
          <PredatorCloakMaterial gridWidth={60} gridHeight={50} hover={hover} originalMaterial={faceMaterial} color={0x0a0a0a} />
        </mesh>
        <mesh geometry={buddhaChildren[1].geometry}>
          <PredatorCloakMaterial gridWidth={60} gridHeight={50} hover={hover} originalMaterial={hairMaterial} color={0x090909}  />
        </mesh>
        <mesh position={[0, 28, 15.6]}>
          <primitive object={ethModel.scene}  hover={hover} />
        </mesh>
      </group>
    </group>
  )
}
