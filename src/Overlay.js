import React, { useEffect, useRef } from 'react'
import AudioMotionAnalyzer from 'audiomotion-analyzer'
import Particle from './Particle'

export default function Overlay() {
  const buttonRef = useRef(null)

  const onDeviceOrientation = (event) => {
    const maxRotation = 23 * (Math.PI / 180)
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

  // const handleAudio = () => {
  //   const audioMotion = new AudioMotionAnalyzer(document.getElementById('basedVisualizer'), {
  //     source: document.getElementById('basedAudio'),
  //     radial: false,
  //     showScaleX: false,
  //     mode: 0,
  //     channelLayout: 'stereo',
  //     frequencyScale: 'bark',
  //     gradient: 'rainbow',
  //     linearAmplitude: true,
  //     linearBoost: 1.5,
  //     maxFreq: 20000,
  //     minFreq: 20,
  //     mirror: 0,
  //     overlay: false,
  //     reflexAlpha: 1,
  //     reflexBright: 1,
  //     reflexFit: true,
  //     reflexRatio: 0.5,
  //     showPeaks: true,
  //     weightingFilter: 'D'
  //   })
  //   window.document.getElementById('basedAudio').play()
  //   buttonRef.current.style.display = 'none'
  //   requestOrientationPermission()
  // }

  // useEffect(() => {
  //   const element = buttonRef.current
  //   if (!element) return
  //   element.addEventListener('click', handleAudio)
  //   return () => {
  //     element.removeEventListener('click', handleAudio)
  //   }
  // }, [])

  return (
    <div className="container">
      {/* <Particle /> */}
      <div className="bg-image"></div>
      {/* <button id="permissionButton" className="ctaButton" ref={buttonRef}>
        $BASEDB
      </button> */}
      <div id="basedVisualizer" className="overlay">
        <audio id="basedAudio" src="./song.mp3" loop />
      </div>
    </div>
  )
}
