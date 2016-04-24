/**
 * Engine
 */

var _ = require('lodash')
var easing = require('./easing')

export class Camera {

  constructor(camera, controls) {
    this.camera = camera
    this.controls = controls
    this.time = 0
    this.animationTime = 2
    this.progress = 1
    this.lookAt = new THREE.Vector3(0, 220, 0)
    this.positions = {
      'M-1': {
        position: new THREE.Vector3(0, 800, -150),
        lookAt: new THREE.Vector3(0, 300, 0)
      },
      'M-2': {
        position: new THREE.Vector3(0, 30, -200),
        lookAt: new THREE.Vector3(0, 600, 0)
      },
      'M-3': {
        position: new THREE.Vector3(0, 250, -500),
        lookAt: new THREE.Vector3(0, 250, 0)
      },
      'M-4': {
        position: new THREE.Vector3(0, 150, -150),
        lookAt: new THREE.Vector3(0, 100, 0)
      },
      'M-5': {
        position: new THREE.Vector3(0, 100, -1000),
        lookAt: new THREE.Vector3(0, 400, 0)
      },
      'M-6': {
        position: new THREE.Vector3(0, 500, -100),
        lookAt: new THREE.Vector3(0, 700, 0)
      },
      'M-7': {
        position: new THREE.Vector3(0, 300, -400),
        lookAt: new THREE.Vector3(0, 150, 0)
      },
      'M-8': {
        position: new THREE.Vector3(70, 800, -10),
        lookAt: new THREE.Vector3(0, 0, 0)
      },
      'M-9': {
        position: new THREE.Vector3(0, 50, -100),
        lookAt: new THREE.Vector3(0, 20, 0)
      },
      'final-1': {
        position: new THREE.Vector3(12, -10, 215),
        lookAt: new THREE.Vector3(-55, 208, -57.6)
      },
      'final-2': {
        position: new THREE.Vector3(430, 350, 90),
        lookAt: new THREE.Vector3(-45, 335, 15)
      },
      'final-3': {
        position: new THREE.Vector3(110, 722, 4),
        lookAt: new THREE.Vector3(-50, 408, 60)
      },
    }
    this.target = 'M-1'
    this.resetMove = false
    this.controlsConnected = false
    this.startPos = {
      position: new THREE.Vector3(1000, 0, 0),
      lookAt: new THREE.Vector3(0, 0, 0)
    }
    DEBUG.controls = controls
  }

  feedEvent(data) {
    let e = data.data.eventName

    if (this.positions[e]) {
      this.target = e
      this.resetMove = true
    }
    if (e == 'enable-deviceorient') {
      this.enableDeviceOrient()
    }
    if (e == 'enable-orbitcontrols') {
      this.enableOrbitControls()
    }
    if (e == 'disable-controls') {
      this.disableControls()
    }
    if (e == 'toggle-controls') {
      if (!this.controlsConnected) {
        this.enableControls()
        this.controlsConnected = true
      }
      else {
        this.disableControls()
        this.controlsConnected = false
      }
    }
  }

  updateCameraPosition() {
    let progress = easing.easeInOutCubic(this.progress)
    let target = this.positions[this.target]
    let camDiff = target.position.clone().sub(this.startPos.position)
    let camDiffMult = camDiff.multiplyScalar(progress)
    let camPosition = this.startPos.position.clone().add(camDiffMult)
    let lookAtDiff = target.lookAt.clone().sub(this.startPos.lookAt)
    let lookAtDiffMult = lookAtDiff.multiplyScalar(progress)
    let lookAtPosition = this.startPos.lookAt.clone().add(lookAtDiffMult)

    this.camera.position.copy(camPosition)
    this.lookAt.copy(lookAtPosition)
    this.camera.lookAt(this.lookAt)
  }

  enableDeviceOrient() {
    if (typeof(this.controls) !== 'undefined') {
      this.controls.orbit.enabled = false
      this.controls.deviceOrient.connect()
    }
  }

  enableOrbitControls() {
    if (typeof(this.controls) !== 'undefined') {
      this.controls.deviceOrient.disconnect()
      this.controls.orbit.target = this.lookAt
      this.controls.orbit.enabled = true
    }
  }

  disableControls() {
    if (typeof(this.controls) !== 'undefined') {
      this.controls.orbit.enabled = false
      this.controls.deviceOrient.disconnect()
    }
  }

  update(delta) {
    this.time += delta
    if (this.resetMove) {
      this.progress = 0
      this.startPos = {
        position: this.camera.position.clone(),
        lookAt: this.lookAt.clone()
      }
      this.resetMove = false
    }
    this.progress += delta / this.animationTime

    if (this.controls.deviceOrient.enabled) {
      this.controls.deviceOrient.update()
    }
    if (this.controls.orbit.enabled) {
      this.controls.orbit.update()
    }
    if (this.progress < 1) {
      this.updateCameraPosition()
    }
  }

}
