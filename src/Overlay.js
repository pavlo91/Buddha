import React, { useEffect, useRef } from 'react'

export default function Overlay() {
  const onDeviceOrientation = (event) => {
    const maxRotation = 30 * (Math.PI / 180)
    const deadZone = 0.5

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
    }
  }

  const requestOrientationPermission = () => {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', onDeviceOrientation)
          } else {
            alert('Permission not granted')
          }
        })
        .catch(console.error)
    } else {
      // handle regular non iOS 13+ devices
      window.addEventListener('deviceorientation', onDeviceOrientation)
    }
  }
  return (
    <div className="container">
      
    </div>
  )
}
